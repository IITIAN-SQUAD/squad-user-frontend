# Profile API Usage Guide

## Backend Setup Required

### 1. Add S3 Dependencies to `pom.xml`
```xml
<dependency>
    <groupId>com.amazonaws</groupId>
    <artifactId>aws-java-sdk-s3</artifactId>
    <version>1.12.529</version>
</dependency>
```

### 2. Add S3 Configuration to `application.properties`
```properties
aws.s3.bucket=your-bucket-name
aws.s3.region=us-east-1
aws.access.key=your-access-key
aws.secret.key=your-secret-key
```

### 3. Create S3 Configuration Bean
```java
// File: auth/src/main/java/com/squad/prod/config/S3Config.java
package com.squad.prod.config;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class S3Config {
    
    @Value("${aws.access.key}")
    private String accessKey;
    
    @Value("${aws.secret.key}")
    private String secretKey;
    
    @Value("${aws.s3.region}")
    private String region;
    
    @Bean
    public AmazonS3 amazonS3() {
        BasicAWSCredentials credentials = new BasicAWSCredentials(accessKey, secretKey);
        return AmazonS3ClientBuilder
                .standard()
                .withRegion(region)
                .withCredentials(new AWSStaticCredentialsProvider(credentials))
                .build();
    }
}
```

### 4. Create S3 Service
```java
// File: auth/src/main/java/com/squad/prod/common/services/S3Service.java
package com.squad.prod.common.services;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class S3Service {
    
    private final AmazonS3 amazonS3;
    
    @Value("${aws.s3.bucket}")
    private String bucketName;
    
    @Value("${aws.s3.region}")
    private String region;
    
    public String uploadProfileImage(MultipartFile file, String userId) throws IOException {
        String fileName = "profile-images/" + userId + "/" + UUID.randomUUID() + "-" + file.getOriginalFilename();
        
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType(file.getContentType());
        metadata.setContentLength(file.getSize());
        
        amazonS3.putObject(new PutObjectRequest(bucketName, fileName, file.getInputStream(), metadata));
        
        String s3Url = String.format("https://%s.s3.%s.amazonaws.com/%s", bucketName, region, fileName);
        log.info("[S3 Service] Uploaded profile image for user: {} to {}", userId, s3Url);
        
        return s3Url;
    }
}
```

### 5. Add Profile Image Upload Endpoint to Controller
```java
// Add to UserAuthController.java
@PostMapping("/profile/image")
@ResponseStatus(HttpStatus.OK)
public ResponseEntity<Map<String, String>> uploadProfileImage(
        @AuthPayload(UserAuthPayload.class) UserAuthPayload userAuthPayload,
        @RequestParam("file") MultipartFile file) {
    try {
        String imageUrl = userAuthenticationService.uploadProfileImage(userAuthPayload, file);
        return ResponseEntity.ok(Map.of("image_url", imageUrl));
    } catch (IOException e) {
        log.error("[User Auth Controller] Failed to upload profile image", e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Failed to upload image"));
    }
}
```

### 6. Add Service Method to UserAuthenticationService
```java
// Add to UserAuthenticationService.java
private final S3Service s3Service;

public String uploadProfileImage(UserAuthPayload userAuthPayload, MultipartFile file) throws IOException {
    log.info("[User Auth Service] Uploading profile image for user: {}", userAuthPayload.getUserId());
    return s3Service.uploadProfileImage(file, userAuthPayload.getUserId());
}
```

---

## Frontend Usage

### 1. Get User Profile
```typescript
import { getUserProfile } from "@/lib/authApi";

const profile = await getUserProfile();
console.log(profile);
// Output: { id: "...", name: "...", email: "...", image_url: "https://..." }
```

### 2. Logout
```typescript
import { logout } from "@/lib/authApi";

await logout();
// Cookie will be cleared
window.location.href = "/login";
```

### 3. Update Profile (Name Only)
```typescript
import { updateProfile } from "@/lib/authApi";

const updated = await updateProfile({
  name: "New Name"
});
```

### 4. Update Profile with Image
```typescript
import { uploadProfileImage, updateProfile } from "@/lib/authApi";

// First upload the image
const file = document.querySelector('input[type="file"]').files[0];
const { image_url } = await uploadProfileImage(file);

// Then update profile with the S3 URL
const updated = await updateProfile({
  name: "New Name",
  image_url: image_url
});
```

### 5. Update Email (Requires OTP)
```typescript
import { requestOtp, updateProfile } from "@/lib/authApi";

// Step 1: Request OTP for new email
await requestOtp("newemail@example.com");

// Step 2: User enters OTP, then update
const updated = await updateProfile({
  email: "newemail@example.com",
  otp: "123456"
});
```

### 6. Using React Hook
```typescript
import { useAuth } from "@/hooks/useAuth";

function MyComponent() {
  const { 
    loading, 
    error, 
    getProfile, 
    handleLogout, 
    handleUpdateProfile,
    handleUploadProfileImage,
    requestEmailOtp 
  } = useAuth();

  const handleUpdate = async () => {
    const updated = await handleUpdateProfile({ name: "New Name" });
    if (updated) {
      console.log("Profile updated!", updated);
    }
  };

  const handleLogoutClick = async () => {
    const success = await handleLogout();
    if (success) {
      window.location.href = "/login";
    }
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <button onClick={handleUpdate}>Update Profile</button>
      <button onClick={handleLogoutClick}>Logout</button>
    </div>
  );
}
```

---

## API Endpoints Summary

### GET `/v1/auth/user/profile`
**Response:**
```json
{
  "id": "6930b317efd96d07f7bfb531",
  "name": "Sachin kumarr",
  "email": "iamsk82100@gmail.com",
  "image_url": "https://bucket.s3.region.amazonaws.com/profile-images/user-id/image.jpg"
}
```

### PUT `/v1/auth/user/profile`
**Request Body:**
```json
{
  "name": "New Name",           // optional
  "image_url": "s3://...",      // optional
  "email": "new@email.com",     // optional
  "otp": "123456"               // required only if email is changed
}
```

**Response:** Same as GET profile

### POST `/v1/auth/user/profile/image`
**Request:** `multipart/form-data` with `file` field

**Response:**
```json
{
  "image_url": "https://bucket.s3.region.amazonaws.com/profile-images/user-id/uuid-filename.jpg"
}
```

### POST `/v1/auth/user/logout`
**Response:** `200 OK` with cleared cookie

---

## Complete Example Component

See `components/profile/ProfileManager.tsx` for a full example with:
- Profile image upload with preview
- Name update
- Email update with OTP validation
- Logout functionality
- Error handling
- Loading states
