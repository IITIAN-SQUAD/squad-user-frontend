# Integration Checklist

## ✅ Completed

### Backend (blog.nexus)
- ✅ Snake_case JSON serialization for DTOs (`image_url`)
- ✅ Profile API endpoints (GET, PUT)
- ✅ Logout endpoint
- ✅ OTP validation for email changes

### Frontend (squad-user-frontend)
- ✅ Login page integrated with backend API
- ✅ Signup page integrated with backend API
- ✅ Login redirects to `/dashboard` after success
- ✅ Profile API functions in `lib/authApi.ts`
- ✅ S3 upload service in `lib/s3Client.ts`
- ✅ React hooks in `hooks/useAuth.ts`
- ✅ Profile management component
- ✅ Error handling and loading states

---

## 🔧 Required Setup Steps

### 1. Install AWS SDK
```bash
npm install @aws-sdk/client-s3
```

### 2. Update .env.local
Make sure these variables have the `NEXT_PUBLIC_` prefix:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080

NEXT_PUBLIC_AWS_ACCESS_KEY_ID=AKIAX6OZOOJTI3KJMQOW
NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY=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
NEXT_PUBLIC_AWS_REGION=ap-south-1
NEXT_PUBLIC_S3_BUCKET_NAME=prod-image-bucket-2
```

### 3. Configure S3 Bucket

#### A. CORS Configuration
Go to AWS S3 Console → `prod-image-bucket-2` → Permissions → CORS:

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

#### B. Bucket Policy (Public Read)
Go to AWS S3 Console → `prod-image-bucket-2` → Permissions → Bucket Policy:

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

### 4. Start Backend Server
```bash
cd /Users/sachinkumar/Desktop/blog.nexus
# Start the Spring Boot application on port 8080
```

### 5. Start Frontend Server
```bash
cd /Users/sachinkumar/Desktop/squad-user-frontend
npm run dev
# or yarn dev
```

---

## 🧪 Testing Flow

### Test Login
1. Go to `http://localhost:3000/login`
2. Enter credentials:
   - Email: `iamsk82100@gmail.com`
   - Password: your password
3. Click "Sign In"
4. Should redirect to `/dashboard` (practice section)

### Test Profile
1. After login, go to profile section
2. Should see your profile with:
   - Name: "Sachin kumarr"
   - Email: "iamsk82100@gmail.com"
   - Image: null (initially)

### Test Image Upload
1. Use the ProfileManager component
2. Select an image file
3. Image uploads directly to S3
4. Profile updates with S3 URL

### Test Logout
1. Click logout button
2. Cookie clears
3. Redirects to login page

---

## 📝 API Endpoints Summary

### Authentication
- `POST /v1/auth/user/login` - Login with email/password
- `POST /v1/auth/user/logout` - Clear auth cookie
- `POST /v1/auth/user/signup` - Create new account
- `POST /v1/auth/user/request-otp/{email}` - Request OTP for email

### Profile
- `GET /v1/auth/user/profile` - Get user profile
- `PUT /v1/auth/user/profile` - Update profile

### Example Requests

#### Login
```bash
curl --location 'http://localhost:8080/v1/auth/user/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "iamsk82100@gmail.com",
    "password": "your-password"
}'
```

#### Get Profile
```bash
curl --location 'http://localhost:8080/v1/auth/user/profile' \
--header 'Cookie: jwt=your-jwt-token'
```

#### Update Profile
```bash
curl --location --request PUT 'http://localhost:8080/v1/auth/user/profile' \
--header 'Content-Type: application/json' \
--header 'Cookie: jwt=your-jwt-token' \
--data '{
    "name": "New Name",
    "image_url": "https://prod-image-bucket-2.s3.ap-south-1.amazonaws.com/profile-images/user-id/image.jpg"
}'
```

#### Logout
```bash
curl --location --request POST 'http://localhost:8080/v1/auth/user/logout' \
--header 'Cookie: jwt=your-jwt-token'
```

---

## 🐛 Common Issues & Solutions

### Issue: Login keeps redirecting to login page
**Solution:** 
- Check if backend is running on port 8080
- Verify CORS is enabled on backend
- Check browser console for errors
- Verify JWT cookie is being set

### Issue: CORS errors
**Solution:**
- Verify backend WebConfig has correct origins
- Check S3 bucket CORS configuration
- Clear browser cache

### Issue: Image upload fails
**Solution:**
- Verify AWS credentials are correct
- Check S3 bucket permissions
- Verify CORS configuration
- Check browser console for detailed error

### Issue: Profile image not loading
**Solution:**
- Verify bucket policy allows public read
- Check image URL format
- Verify image was uploaded successfully

---

## 🔒 Security Notes

### Current Setup (Development)
- AWS credentials exposed in frontend (NEXT_PUBLIC_ prefix)
- Suitable for development only
- S3 bucket has public read access

### Production Recommendations
1. **Use Backend Pre-signed URLs**
   - Generate temporary upload URLs from backend
   - Don't expose AWS credentials in frontend

2. **Use AWS Cognito**
   - Temporary credentials
   - Better security model
   - User-specific permissions

3. **Implement File Validation**
   - Check file type and size
   - Scan for malware
   - Limit upload frequency

---

## 📚 Documentation Files

- `S3_SETUP_GUIDE.md` - Detailed S3 setup and usage
- `PROFILE_API_USAGE.md` - Backend profile API documentation
- `components/profile/ProfileManager.tsx` - Full profile UI component
- `components/profile/ProfileTest.tsx` - Simple test component

---

## ✨ Next Steps

1. Install AWS SDK: `npm install @aws-sdk/client-s3`
2. Update `.env.local` with NEXT_PUBLIC_ prefix
3. Configure S3 bucket CORS and permissions
4. Start backend server
5. Start frontend server
6. Test login flow
7. Test profile management
8. Test image upload

---

## 🎯 Quick Test Command

After setup, test the complete flow:

```bash
# Terminal 1 - Backend
cd /Users/sachinkumar/Desktop/blog.nexus
# Start Spring Boot app

# Terminal 2 - Frontend
cd /Users/sachinkumar/Desktop/squad-user-frontend
npm install @aws-sdk/client-s3
npm run dev

# Browser
# 1. Go to http://localhost:3000/login
# 2. Login with your credentials
# 3. Should redirect to /dashboard
# 4. Test profile features
```
