
# S3 Integration Setup Guide

## 1. Install AWS SDK

Run one of these commands in your project directory:

```bash
npm install @aws-sdk/client-s3
# or
yarn add @aws-sdk/client-s3
# or
pnpm add @aws-sdk/client-s3
```

## 2. Configure Environment Variables

Add these to your `.env.local` file (already added):

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080

# AWS S3 Configuration
NEXT_PUBLIC_AWS_ACCESS_KEY_ID=AKIAX6OZOOJTI3KJMQOW
NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY=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
NEXT_PUBLIC_AWS_REGION=ap-south-1
NEXT_PUBLIC_S3_BUCKET_NAME=prod-image-bucket-2
```

**⚠️ IMPORTANT SECURITY NOTE:**
- These credentials are exposed in the frontend (NEXT_PUBLIC_ prefix)
- For production, use AWS Cognito or temporary credentials
- Or implement a backend endpoint that generates pre-signed URLs
- Never commit `.env.local` to git

## 3. Configure S3 Bucket CORS

Go to AWS S3 Console → Your Bucket → Permissions → CORS configuration:

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
    "AllowedOrigins": [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://your-production-domain.com"
    ],
    "ExposeHeaders": ["ETag"]
  }
]
```

## 4. Configure S3 Bucket Permissions

### Option A: Public Read Access (Simpler)
Set bucket policy to allow public read:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::prod-image-bucket-2/*"
    }
  ]
}
```

### Option B: Private with Signed URLs (More Secure)
Keep bucket private and generate signed URLs when needed.

## 5. Test the Integration

### Simple Upload Test

```typescript
import { uploadProfileImage } from "@/lib/s3Client";

// In your component
const handleFileUpload = async (file: File) => {
  try {
    const url = await uploadProfileImage(file, "user-123");
    console.log("Uploaded to:", url);
  } catch (error) {
    console.error("Upload failed:", error);
  }
};
```

### Using the Hook

```typescript
import { useAuth } from "@/hooks/useAuth";

function MyComponent() {
  const { handleUploadProfileImage, loading, error } = useAuth();

  const onFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = await handleUploadProfileImage(file, "user-id");
      if (url) {
        console.log("Image uploaded:", url);
      }
    }
  };

  return (
    <input type="file" onChange={onFileSelect} disabled={loading} />
  );
}
```

## 6. Usage Examples

### Complete Profile Update Flow

```typescript
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

function ProfileEditor() {
  const { 
    getProfile, 
    handleUploadProfileImage, 
    handleUpdateProfile,
    loading 
  } = useAuth();
  
  const [profile, setProfile] = useState(null);

  // Load profile
  useEffect(() => {
    async function load() {
      const data = await getProfile();
      setProfile(data);
    }
    load();
  }, []);

  // Handle image upload and profile update
  const handleSubmit = async (file: File, name: string) => {
    // 1. Upload image to S3
    const imageUrl = await handleUploadProfileImage(file, profile?.id);
    
    if (!imageUrl) {
      alert("Failed to upload image");
      return;
    }

    // 2. Update profile with new image URL
    const updated = await handleUpdateProfile({
      name: name,
      image_url: imageUrl
    });

    if (updated) {
      setProfile(updated);
      alert("Profile updated!");
    }
  };

  return (
    <div>
      {profile && (
        <>
          <img src={profile.image_url} alt={profile.name} />
          <p>{profile.name}</p>
        </>
      )}
    </div>
  );
}
```

### Direct API Usage (Without Hook)

```typescript
import { uploadProfileImage } from "@/lib/s3Client";
import { updateProfile } from "@/lib/authApi";

async function updateUserProfile(file: File, userId: string) {
  // Upload to S3
  const imageUrl = await uploadProfileImage(file, userId);
  
  // Update backend
  const updated = await updateProfile({
    image_url: imageUrl
  });
  
  return updated;
}
```

## 7. API Endpoints

### GET `/v1/auth/user/profile`
Returns user profile with image_url

```bash
curl --location 'localhost:8080/v1/auth/user/profile' \
--header 'Cookie: jwt=your-jwt-token'
```

Response:
```json
{
  "id": "6930b317efd96d07f7bfb531",
  "name": "Sachin kumarr",
  "email": "iamsk82100@gmail.com",
  "image_url": "https://prod-image-bucket-2.s3.ap-south-1.amazonaws.com/profile-images/user-id/image.jpg"
}
```

### PUT `/v1/auth/user/profile`
Update profile with S3 image URL

```bash
curl --location --request PUT 'localhost:8080/v1/auth/user/profile' \
--header 'Content-Type: application/json' \
--header 'Cookie: jwt=your-jwt-token' \
--data '{
    "name": "Sachin kumarr",
    "image_url": "https://prod-image-bucket-2.s3.ap-south-1.amazonaws.com/profile-images/user-id/image.jpg"
}'
```

### POST `/v1/auth/user/logout`
Clear authentication cookie

```bash
curl --location --request POST 'localhost:8080/v1/auth/user/logout' \
--header 'Cookie: jwt=your-jwt-token'
```

## 8. Folder Structure in S3

Images are organized by user:
```
prod-image-bucket-2/
└── profile-images/
    ├── user-id-1/
    │   ├── 1234567890-abc123.jpg
    │   └── 1234567891-def456.png
    └── user-id-2/
        └── 1234567892-ghi789.jpg
```

## 9. Troubleshooting

### CORS Errors
- Check S3 bucket CORS configuration
- Ensure origins match exactly (http vs https, port numbers)
- Clear browser cache

### 403 Forbidden
- Check IAM user has `s3:PutObject` permission
- Verify bucket policy allows uploads
- Check bucket is not blocking public access if needed

### Image Not Loading
- Check bucket policy allows `s3:GetObject`
- Verify image URL is correct
- Check browser console for errors

### Upload Fails
- Check file size (S3 has limits)
- Verify AWS credentials are correct
- Check network tab for detailed error

## 10. Production Recommendations

### Security Best Practices

1. **Use Backend Pre-signed URLs** (Recommended)
   - Don't expose AWS credentials in frontend
   - Generate pre-signed URLs from backend
   - Set expiration time

2. **Use AWS Cognito**
   - Temporary credentials
   - Better security
   - User-specific permissions

3. **Implement File Validation**
   - Check file type
   - Limit file size
   - Scan for malware

### Example: Pre-signed URL Approach

Backend endpoint:
```java
@PostMapping("/profile/upload-url")
public ResponseEntity<Map<String, String>> getUploadUrl(
        @AuthPayload(UserAuthPayload.class) UserAuthPayload userAuthPayload) {
    String presignedUrl = s3Service.generatePresignedUploadUrl(userAuthPayload.getUserId());
    return ResponseEntity.ok(Map.of("upload_url", presignedUrl));
}
```

Frontend:
```typescript
// Get presigned URL from backend
const { upload_url } = await fetch('/v1/auth/user/profile/upload-url').then(r => r.json());

// Upload directly to S3 using presigned URL
await fetch(upload_url, {
  method: 'PUT',
  body: file,
  headers: { 'Content-Type': file.type }
});
```

## 11. Component Usage

Use the pre-built `ProfileManager` component:

```typescript
import { ProfileManager } from "@/components/profile/ProfileManager";

function ProfilePage() {
  return <ProfileManager />;
}
```

This component includes:
- Profile image upload with preview
- Name and email editing
- OTP validation for email changes
- Logout functionality
- Error handling
- Loading states
