# OAuth2 Google Login/Signup Integration

## Overview
This document describes the OAuth2 integration for Google authentication in the IITian Squad platform.

---

## Architecture

### Flow Diagram
```
User clicks "Continue with Google"
    ↓
Frontend calls /v0/oauth2/authorize
    ↓
Backend returns authorization_url
    ↓
Frontend redirects to Google OAuth
    ↓
User authenticates with Google
    ↓
Google redirects to /auth/callback?code=xxx
    ↓
Frontend calls /v0/oauth2/callback with code
    ↓
Backend exchanges code for tokens
    ↓
Backend creates/updates user and sets session cookie
    ↓
Frontend redirects to /dashboard
```

---

## API Endpoints

### 1. Initiate OAuth Flow
```
GET /v0/oauth2/authorize
```

**Request:**
- No body required
- Credentials: include (for session management)

**Response:**
```json
{
  "authorization_url": "https://accounts.google.com/o/oauth2/v2/auth?client_id=...&redirect_uri=...&response_type=code&scope=..."
}
```

**Frontend Usage:**
```typescript
const response = await initiateGoogleOAuth();
window.location.href = response.authorization_url;
```

---

### 2. Handle OAuth Callback
```
POST /v0/oauth2/callback
```

**Request:**
```json
{
  "code": "4/0AY0e-g7...",
  "state": "optional-state-value"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Authentication successful",
  "user": {
    "id": "user-uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "image_url": "https://lh3.googleusercontent.com/..."
  }
}
```

**Frontend Usage:**
```typescript
const response = await handleOAuthCallback({
  code: urlParams.get('code'),
  state: urlParams.get('state')
});
```

---

## Frontend Implementation

### Files Modified/Created

#### 1. `/lib/authApi.ts`
Added OAuth functions:
- `initiateGoogleOAuth()` - Starts OAuth flow
- `handleOAuthCallback()` - Processes callback

#### 2. `/app/login/page.tsx`
Updated Google login button:
```typescript
const handleGoogleLogin = async () => {
  const response = await initiateGoogleOAuth();
  window.location.href = response.authorization_url;
};
```

#### 3. `/app/signup/page.tsx`
Updated Google signup button:
```typescript
const handleGoogleSignUp = async () => {
  const response = await initiateGoogleOAuth();
  window.location.href = response.authorization_url;
};
```

#### 4. `/app/auth/callback/page.tsx` (NEW)
Handles OAuth redirect from Google:
- Extracts `code` and `state` from URL
- Calls backend callback endpoint
- Redirects to dashboard on success
- Shows error and redirects to login on failure

---

## Backend Requirements

### 1. OAuth Configuration
Your backend needs to configure:
- Google OAuth Client ID
- Google OAuth Client Secret
- Redirect URI: `http://localhost:3000/auth/callback` (dev)
- Redirect URI: `https://yourdomain.com/auth/callback` (prod)

### 2. Scopes Required
```
- openid
- email
- profile
```

### 3. Session Management
After successful OAuth:
- Create/update user in database
- Set session cookie (httpOnly, secure in production)
- Return user information

---

## Environment Variables

### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

### Backend
```bash
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
OAUTH_REDIRECT_URI=http://localhost:3000/auth/callback
```

---

## User Experience

### Login Flow
1. User clicks "Continue with Google" on `/login`
2. Redirected to Google OAuth consent screen
3. User authorizes the application
4. Redirected back to `/auth/callback`
5. Shows loading spinner while processing
6. Redirected to `/dashboard` on success

### Signup Flow
1. User clicks "Continue with Google" on `/signup`
2. Same flow as login
3. Backend creates new user if email doesn't exist
4. Backend logs in existing user if email exists

### Error Handling
- **User denies access**: Shows error, redirects to login
- **Invalid code**: Shows error, redirects to login
- **Network error**: Shows error message
- **Backend error**: Shows error, redirects to login

---

## Security Considerations

### 1. State Parameter
- Backend should generate and validate state parameter
- Prevents CSRF attacks
- Frontend passes state back in callback

### 2. HTTPS in Production
- OAuth redirect URI must use HTTPS in production
- Session cookies must have `secure` flag

### 3. Cookie Settings
```
httpOnly: true    // Prevents XSS
secure: true      // HTTPS only (production)
sameSite: 'lax'   // CSRF protection
```

### 4. Token Storage
- Never store access tokens in localStorage
- Use httpOnly cookies for session management
- Backend handles token refresh

---

## Testing

### Local Development
1. Start backend: `http://localhost:8080`
2. Start frontend: `http://localhost:3000`
3. Configure Google OAuth redirect: `http://localhost:3000/auth/callback`

### Test Cases

#### Happy Path
```
1. Click "Continue with Google"
   ✓ Redirects to Google OAuth
2. Authorize with Google account
   ✓ Redirects to /auth/callback
3. Callback processes successfully
   ✓ Redirects to /dashboard
4. User is authenticated
   ✓ Can access protected routes
```

#### Error Cases
```
1. User denies access
   ✓ Shows error message
   ✓ Redirects to /login
   
2. Invalid authorization code
   ✓ Shows error message
   ✓ Redirects to /login
   
3. Backend is down
   ✓ Shows network error
   ✓ User can retry
```

---

## Backend Implementation Example

### Spring Boot Example
```java
@RestController
@RequestMapping("/v0/oauth2")
public class OAuth2Controller {
    
    @GetMapping("/authorize")
    public ResponseEntity<Map<String, String>> authorize() {
        String authUrl = googleOAuthService.getAuthorizationUrl();
        return ResponseEntity.ok(Map.of("authorization_url", authUrl));
    }
    
    @PostMapping("/callback")
    public ResponseEntity<OAuth2CallbackResponse> callback(
        @RequestBody OAuth2CallbackRequest request,
        HttpServletResponse response
    ) {
        // Exchange code for tokens
        GoogleTokens tokens = googleOAuthService.exchangeCode(request.getCode());
        
        // Get user info from Google
        GoogleUserInfo userInfo = googleOAuthService.getUserInfo(tokens.getAccessToken());
        
        // Create or update user
        User user = userService.createOrUpdateFromGoogle(userInfo);
        
        // Create session
        String sessionId = sessionService.createSession(user.getId());
        
        // Set cookie
        Cookie cookie = new Cookie("session_id", sessionId);
        cookie.setHttpOnly(true);
        cookie.setSecure(true); // Production only
        cookie.setPath("/");
        cookie.setMaxAge(7 * 24 * 60 * 60); // 7 days
        response.addCookie(cookie);
        
        return ResponseEntity.ok(new OAuth2CallbackResponse(
            true,
            "Authentication successful",
            user
        ));
    }
}
```

---

## Troubleshooting

### Issue: Redirect URI Mismatch
**Error:** `redirect_uri_mismatch`
**Solution:** 
- Check Google Cloud Console OAuth settings
- Ensure redirect URI matches exactly: `http://localhost:3000/auth/callback`

### Issue: Invalid Client
**Error:** `invalid_client`
**Solution:**
- Verify GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET
- Check if credentials are correct in Google Cloud Console

### Issue: CORS Error
**Error:** `CORS policy: No 'Access-Control-Allow-Origin' header`
**Solution:**
- Backend must allow `http://localhost:3000` origin
- Set `credentials: 'include'` in frontend fetch calls

### Issue: Cookie Not Set
**Error:** User authenticated but not logged in
**Solution:**
- Check cookie settings (httpOnly, secure, sameSite)
- Verify backend sets cookie in response
- Check browser dev tools → Application → Cookies

---

## Next Steps

### 1. Backend Implementation
- Implement `/v0/oauth2/authorize` endpoint
- Implement `/v0/oauth2/callback` endpoint
- Set up Google OAuth credentials
- Configure session management

### 2. Production Deployment
- Update redirect URI to production domain
- Enable HTTPS
- Set secure cookie flags
- Configure CORS for production domain

### 3. Additional Features
- Add Facebook OAuth (optional)
- Add Apple Sign In (optional)
- Implement token refresh
- Add OAuth account linking

---

## Summary

✅ **Frontend Ready**
- Login page with Google OAuth
- Signup page with Google OAuth
- Callback page for OAuth redirect
- Error handling and loading states

⏳ **Backend Required**
- Implement OAuth endpoints
- Configure Google OAuth credentials
- Set up session management
- Handle user creation/login

🔒 **Security**
- State parameter validation
- HTTPS in production
- httpOnly cookies
- CSRF protection

The OAuth integration is now ready on the frontend. Once the backend implements the required endpoints, users will be able to sign up and log in with their Google accounts seamlessly!
