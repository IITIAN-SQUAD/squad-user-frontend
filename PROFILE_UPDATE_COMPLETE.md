# ✅ Profile Update System - Complete Integration

## What's Been Implemented

### 1. ✅ Profile Image Upload to S3
**Location:** `components/profile/ProfileUpdate.tsx`

**Features:**
- Upload image to S3 in folder: `profile-images/{userId}/`
- Validates file type (images only)
- Validates file size (max 2MB)
- Shows preview before upload
- Returns S3 URL after upload
- Saves S3 URL to database via API

**Flow:**
```
1. User selects image → Preview shown
2. Click "Upload Photo" → Uploads to S3
3. Gets S3 URL → Calls updateProfile API
4. Saves image_url in database
5. Updates UI everywhere
```

### 2. ✅ Name Update
**Features:**
- Update name field
- Calls `PUT /v1/auth/user/profile` with `{name: "New Name"}`
- Updates database
- Refreshes all UI components (sidebar, header, profile page)

### 3. ✅ Email Update with OTP
**Features:**
- Change email field
- Shows warning: "Changing email will require OTP verification"
- Click "Send OTP" → Calls `POST /v1/auth/user/request-otp/{email}`
- OTP sent to new email
- Opens dialog to enter OTP
- Click "Verify & Update" → Calls `PUT /v1/auth/user/profile` with `{email, otp}`
- Updates database
- Refreshes all UI components

**Flow:**
```
1. User changes email → Warning shown
2. Click "Send OTP" → OTP sent to new email
3. Dialog opens → Enter 6-digit OTP
4. Click "Verify & Update" → Validates OTP
5. Updates email in database
6. Refreshes UI everywhere
```

### 4. ✅ Auto-Refresh After Update
**When profile is updated:**
- Sidebar (bottom left) - Shows new name/email/image
- Header (top right) - Shows new name/email/image
- Profile page - Shows updated data
- All components reload automatically

---

## API Endpoints Used

### 1. Upload Profile Image
```typescript
// Upload to S3 (frontend only)
const s3Url = await uploadProfileImage(file, userId);
// Returns: https://prod-image-bucket-2.s3.ap-south-1.amazonaws.com/profile-images/{userId}/{filename}

// Save to database
PUT /v1/auth/user/profile
Body: { image_url: "https://..." }
```

### 2. Update Name
```typescript
PUT /v1/auth/user/profile
Body: { name: "New Name" }
```

### 3. Update Email (with OTP)
```typescript
// Step 1: Send OTP
POST /v1/auth/user/request-otp/{newEmail}

// Step 2: Update with OTP
PUT /v1/auth/user/profile
Body: { 
  email: "newemail@example.com",
  otp: "123456"
}
```

### 4. Update Multiple Fields
```typescript
PUT /v1/auth/user/profile
Body: {
  name: "New Name",
  email: "newemail@example.com",
  otp: "123456",
  image_url: "https://..."
}
```

---

## Component Structure

### ProfileUpdate Component
**File:** `components/profile/ProfileUpdate.tsx`

**Features:**
- ✅ Profile image upload with preview
- ✅ Name field with validation
- ✅ Email field with OTP verification
- ✅ Loading states for all actions
- ✅ Error and success messages
- ✅ OTP dialog for email changes
- ✅ Auto-refresh after updates

**Props:**
```typescript
interface ProfileUpdateProps {
  onProfileUpdated?: () => void; // Callback after successful update
}
```

**Usage:**
```tsx
<ProfileUpdate onProfileUpdated={() => window.location.reload()} />
```

---

## S3 Configuration Required

### 1. Install AWS SDK
```bash
npm install @aws-sdk/client-s3
```

### 2. Environment Variables
Add to `.env.local`:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080

NEXT_PUBLIC_AWS_ACCESS_KEY_ID=AKIAX6OZOOJTI3KJMQOW
NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY=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
NEXT_PUBLIC_AWS_REGION=ap-south-1
NEXT_PUBLIC_S3_BUCKET_NAME=prod-image-bucket-2
```

### 3. S3 Bucket CORS
```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
    "AllowedOrigins": [
      "http://localhost:3000",
      "http://localhost:3001"
    ],
    "ExposeHeaders": ["ETag"]
  }
]
```

### 4. S3 Bucket Policy (Public Read)
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

---

## Testing Guide

### Test 1: Update Name
1. Go to Profile page → Personal Info tab
2. Change name field
3. Click "Update Profile"
4. ✅ Success message shown
5. ✅ Name updated in sidebar (bottom left)
6. ✅ Name updated in header (top right)
7. ✅ Name updated in profile page

### Test 2: Upload Profile Image
1. Go to Profile page → Personal Info tab
2. Click "Choose Photo" → Select image
3. Preview shown
4. Click "Upload Photo"
5. ✅ Image uploads to S3
6. ✅ Success message shown
7. ✅ Image shown in sidebar (bottom left)
8. ✅ Image shown in header (top right)
9. ✅ Image shown in profile page

### Test 3: Update Email with OTP
1. Go to Profile page → Personal Info tab
2. Change email field
3. ⚠️ Warning shown: "Changing email will require OTP verification"
4. Click "Send OTP"
5. ✅ OTP sent to new email
6. ✅ Success message shown
7. Click "Update Profile"
8. ✅ Dialog opens asking for OTP
9. Enter 6-digit OTP
10. Click "Verify & Update"
11. ✅ Email updated in database
12. ✅ Email updated in sidebar
13. ✅ Email updated in header
14. ✅ Email updated in profile page

### Test 4: Update Name + Email Together
1. Change both name and email
2. Click "Send OTP" first
3. Then click "Update Profile"
4. Enter OTP in dialog
5. ✅ Both name and email updated
6. ✅ All UI components refreshed

---

## Files Modified/Created

### Created:
1. ✅ `components/profile/ProfileUpdate.tsx` - Complete profile update component

### Modified:
1. ✅ `app/dashboard/profile/page.tsx` - Uses ProfileUpdate component
2. ✅ `lib/apiClient.ts` - Fixed undefined response issue
3. ✅ `components/dashboard/DashboardSidebar.tsx` - Better error handling, shows profile data
4. ✅ `components/dashboard/DashboardHeader.tsx` - Better error handling, shows profile data

### Existing (Already Created):
1. ✅ `lib/s3Client.ts` - S3 upload functions
2. ✅ `lib/authApi.ts` - API functions (getUserProfile, updateProfile, requestOtp)

---

## Console Logs You'll See

### Successful Image Upload:
```
📤 Uploading image to S3...
✅ File uploaded successfully: https://prod-image-bucket-2.s3.ap-south-1.amazonaws.com/profile-images/user-id/123456-abc.jpg
📝 Updating profile: {image_url: "https://..."}
📦 Parsed JSON data: {id: "...", name: "...", email: "...", image_url: "https://..."}
✅ Profile updated successfully!
```

### Successful Name Update:
```
📝 Updating profile: {name: "New Name"}
📦 Parsed JSON data: {id: "...", name: "New Name", email: "...", image_url: "..."}
✅ Profile updated successfully!
```

### Successful Email Update:
```
📧 Sending OTP to: newemail@example.com
✅ OTP sent to your new email address
📝 Updating profile: {email: "newemail@example.com", otp: "123456"}
📦 Parsed JSON data: {id: "...", name: "...", email: "newemail@example.com", image_url: "..."}
✅ Profile updated successfully!
```

---

## Error Handling

### Image Upload Errors:
- ❌ File not an image → "Please select an image file"
- ❌ File > 2MB → "Image size must be less than 2MB"
- ❌ S3 upload fails → "Failed to upload file: {error}"

### OTP Errors:
- ❌ Email same as current → "Email is the same as current email"
- ❌ OTP not 6 digits → "Please enter the 6-digit OTP sent to your new email"
- ❌ Invalid OTP → API returns error message

### Update Errors:
- ❌ No changes → "No changes to update"
- ❌ API error → Shows error message from backend

---

## Next Steps

1. **Install AWS SDK:**
   ```bash
   npm install @aws-sdk/client-s3
   ```

2. **Configure S3:**
   - Set CORS configuration
   - Set bucket policy for public read
   - Verify AWS credentials in .env.local

3. **Test the Flow:**
   - Update name
   - Upload image
   - Update email with OTP

4. **Verify Auto-Refresh:**
   - Check sidebar updates
   - Check header updates
   - Check profile page updates

---

## Security Notes

### Current Setup (Development):
- ✅ AWS credentials in frontend (NEXT_PUBLIC_ prefix)
- ✅ Direct S3 upload from browser
- ✅ Public read access for images
- ⚠️ **Only for development!**

### Production Recommendations:
1. **Use Backend Pre-signed URLs:**
   - Generate temporary upload URLs from backend
   - Don't expose AWS credentials in frontend

2. **Use AWS Cognito:**
   - Temporary credentials
   - User-specific permissions
   - Better security model

3. **Implement Rate Limiting:**
   - Limit OTP requests per email
   - Limit profile updates per user
   - Prevent abuse

---

## Summary

✅ **Profile Image:** Upload to S3 → Save URL to DB → Show everywhere
✅ **Name Update:** Update field → Save to DB → Refresh UI
✅ **Email Update:** Send OTP → Verify → Update DB → Refresh UI
✅ **Auto-Refresh:** All components update after any change

Everything is integrated and ready to test!
