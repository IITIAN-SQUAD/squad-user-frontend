# Login Debug Guide

## Current Issue
After login, dashboard redirects back to login screen.

## Root Cause
The dashboard components (DashboardSidebar and DashboardHeader) fetch user profile on mount. If this fails, it redirects to login.

## What I Fixed

### 1. DashboardSidebar.tsx
- ✅ Changed to only redirect on actual auth errors (401/403)
- ✅ Won't redirect on network errors or other issues
- ✅ Fetches profile from API and displays in bottom left

### 2. DashboardHeader.tsx  
- ✅ Changed from localStorage to API fetch
- ✅ Displays user name and email in top right dropdown
- ✅ Won't redirect (lets sidebar handle it)

### 3. Login Page
- ✅ Calls real backend API
- ✅ Redirects to `/dashboard` on success
- ✅ Shows error messages
- ✅ Loading states

## How to Test

### Step 1: Check Backend is Running
```bash
# Backend should be running on port 8080
curl http://localhost:8080/v1/auth/user/profile
# Should return 401 or authentication error
```

### Step 2: Check Environment Variables
Make sure `.env.local` has:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

### Step 3: Test Login Flow

1. **Open Browser DevTools** (F12)
2. **Go to Network Tab**
3. **Navigate to** `http://localhost:3000/login`
4. **Enter credentials:**
   - Email: `iamsk82100@gmail.com`
   - Password: your password
5. **Click Sign In**

### Step 4: Check Network Requests

You should see these requests in order:

#### Request 1: Login
```
POST http://localhost:8080/v1/auth/user/login
Request Body: {"email":"...","password":"..."}
Response: 200 OK with "Login successful" message
Response Headers: Set-Cookie: jwt=...
```

#### Request 2: Get Profile (from DashboardSidebar)
```
GET http://localhost:8080/v1/auth/user/profile
Request Headers: Cookie: jwt=...
Response: 200 OK
Response Body: {"id":"...","name":"...","email":"...","image_url":null}
```

#### Request 3: Get Profile (from DashboardHeader)
```
GET http://localhost:8080/v1/auth/user/profile
Request Headers: Cookie: jwt=...
Response: 200 OK
Response Body: {"id":"...","name":"...","email":"...","image_url":null}
```

## Common Issues

### Issue 1: Cookie Not Being Set

**Symptoms:**
- Login returns 200 OK
- But profile request returns 401
- Cookie not visible in DevTools → Application → Cookies

**Solutions:**
1. Check backend WebConfig CORS settings:
```java
.allowedOrigins("http://localhost:3000", "http://localhost:3001")
.allowCredentials(true)
```

2. Check cookie settings in backend:
```java
cookie.setHttpOnly(true);
cookie.setSecure(false); // Should be false for localhost
cookie.setPath("/");
```

3. Frontend must send credentials:
```typescript
credentials: "include" // Already set in apiClient.ts
```

### Issue 2: CORS Error

**Symptoms:**
- Console shows CORS error
- Network tab shows request failed

**Solutions:**
1. Add CORS configuration to backend (already done in WebConfig.java)
2. Make sure backend is running
3. Check origins match exactly (http vs https, port numbers)

### Issue 3: 401 Unauthorized on Profile Request

**Symptoms:**
- Login succeeds
- Profile request returns 401
- Cookie exists but not being sent

**Solutions:**
1. Check cookie domain and path
2. Verify SameSite attribute
3. Check if cookie is HttpOnly (should be visible in Network tab, not in document.cookie)

### Issue 4: Backend Not Running

**Symptoms:**
- "Cannot connect to backend" error
- Network tab shows "Failed to fetch"

**Solutions:**
1. Start backend server on port 8080
2. Verify with: `curl http://localhost:8080/v1/auth/user/profile`

## Debug Console Commands

Open browser console and run these:

### Check if API_BASE_URL is set
```javascript
console.log(process.env.NEXT_PUBLIC_API_BASE_URL);
// Should show: http://localhost:8080
```

### Check cookies
```javascript
document.cookie
// Note: HttpOnly cookies won't show here, check Network tab instead
```

### Manual API test
```javascript
fetch('http://localhost:8080/v1/auth/user/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
  body: JSON.stringify({
    email: 'iamsk82100@gmail.com',
    password: 'your-password'
  })
})
.then(r => r.text())
.then(console.log)
.catch(console.error);
```

### Test profile fetch
```javascript
fetch('http://localhost:8080/v1/auth/user/profile', {
  credentials: 'include'
})
.then(r => r.json())
.then(console.log)
.catch(console.error);
```

## Expected Behavior

### Successful Login Flow:
1. User enters credentials
2. Frontend calls `/v1/auth/user/login`
3. Backend validates and returns 200 OK
4. Backend sets `jwt` cookie in response
5. Frontend redirects to `/dashboard`
6. DashboardSidebar fetches profile (cookie sent automatically)
7. DashboardHeader fetches profile (cookie sent automatically)
8. User sees their name and email in UI
9. User stays on dashboard

### Failed Login Flow:
1. User enters wrong credentials
2. Frontend calls `/v1/auth/user/login`
3. Backend returns 401 Unauthorized
4. Frontend shows error message
5. User stays on login page

## Quick Fix Checklist

- [ ] Backend running on port 8080
- [ ] `.env.local` has `NEXT_PUBLIC_API_BASE_URL=http://localhost:8080`
- [ ] Backend CORS allows `http://localhost:3000`
- [ ] Backend sets cookie with `allowCredentials(true)`
- [ ] Cookie has correct path and domain
- [ ] Frontend sends `credentials: 'include'`
- [ ] No CORS errors in console
- [ ] Login returns 200 OK
- [ ] Cookie visible in Network tab
- [ ] Profile request includes cookie
- [ ] Profile request returns 200 OK

## Still Not Working?

Share these details:

1. **Network Tab Screenshot** showing:
   - Login request/response
   - Profile request/response
   - Cookie headers

2. **Console Errors** (if any)

3. **Backend Logs** showing:
   - Login request received
   - Cookie being set
   - Profile request received
   - Cookie being validated

4. **Environment**:
   - Backend port: 8080
   - Frontend port: 3000
   - Browser: Chrome/Firefox/Safari
   - OS: Mac/Windows/Linux
