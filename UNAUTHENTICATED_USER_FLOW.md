# Unauthenticated User Flow Documentation

## Overview
Unauthenticated users can now access the dashboard and view content without logging in. They will be prompted to login only when trying to perform actions that require authentication.

---

## What Unauthenticated Users CAN Do

### ✅ Full Access (No Login Required)
- **View Dashboard** - Browse all sections
- **View Questions** - See practice questions and details
- **View Comments** - Read existing comments and discussions
- **View Solutions** - See community solutions
- **Submit Solutions** - Can submit answers (with limitations prompt)
- **Browse Content** - Explore all public content

### ⚠️ Limited Features (Prompt Shown)
- **Submit Solutions** - Can submit, but:
  - ⚠️ No attempt history saved
  - ⚠️ No personalized analytics
  - ⚠️ No progress tracking
  - 💡 Prompt: "Login to track your progress and view analytics"

### ❌ Actions Requiring Login (Blocked)
- **Add Comments** - Must login to comment
- **Bookmark Questions** - Must login to save bookmarks
- **Access Profile** - Must login to view/edit profile
- **View Attempt History** - Must login to see personal history
- **View Personalized Analytics** - Must login for your stats

---

## UI Changes

### 1. Dashboard Header (Top Right)

**For Authenticated Users:**
- Profile avatar with dropdown
- Notification bell
- User name and email in dropdown
- Profile and Settings links
- Logout button

**For Unauthenticated Users:**
- **Login** button (ghost variant)
- **Sign Up** button (brand yellow)

### 2. Dashboard Sidebar (Bottom Left)

**For Authenticated Users:**
- Profile avatar
- User name and email
- Sign out button

**For Unauthenticated Users:**
- **Login** button (brand yellow, full width)
- **Sign Up** button (outline, full width)

### 3. Login Prompts

When unauthenticated users try to perform restricted actions, they see:
- Modal/Card with login prompt
- Clear message explaining why login is needed
- **Login** button
- **Create Account** button

---

## Implementation Details

### New Components Created

#### 1. `hooks/useAuthStatus.ts`
```typescript
export function useAuthStatus() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  // ...
}
```

**Usage:**
```typescript
const { isAuthenticated, user, loading } = useAuthStatus();

if (!isAuthenticated) {
  // Show login prompt
}
```

#### 2. `components/auth/LoginPrompt.tsx`
Reusable component to prompt users to login.

**Usage:**
```typescript
<LoginPrompt 
  title="Login Required"
  description="Please login to add comments"
  action="add comments"
/>
```

### Modified Components

#### 1. `components/dashboard/DashboardHeader.tsx`
- Added `isAuthenticated` state
- Shows Login/Signup buttons for unauthenticated users
- Shows profile dropdown for authenticated users
- No hardcoded user data

#### 2. `components/dashboard/DashboardSidebar.tsx`
- Added `isAuthenticated` state
- Shows Login/Signup buttons for unauthenticated users
- Shows profile info for authenticated users
- No hardcoded user data
- Doesn't redirect unauthenticated users

---

## Authentication Flow

### For New Users:
```
1. Visit dashboard (no login required)
2. Browse questions and content
3. Try to add comment → Login prompt appears
4. Click "Sign Up" → Registration page
5. Complete registration → Redirected to dashboard
6. Now can add comments, submit answers, etc.
```

### For Returning Users:
```
1. Visit dashboard (no login required)
2. Click "Login" button (header or sidebar)
3. Enter credentials → Login
4. Redirected to dashboard
5. Full access to all features
```

---

## Where to Add Login Prompts

### In Practice Question Component:
```typescript
const { isAuthenticated } = useAuthStatus();

const handleAddComment = () => {
  if (!isAuthenticated) {
    // Show login prompt
    setShowLoginPrompt(true);
    return;
  }
  // Proceed with adding comment
};
```

### In Bookmark Component:
```typescript
const handleBookmark = () => {
  if (!isAuthenticated) {
    // Show login prompt
    return <LoginPrompt 
      title="Login to Bookmark"
      description="Save questions to your personal collection"
      action="bookmark questions"
    />;
  }
  // Proceed with bookmark
};
```

### In Submit Answer Component:
```typescript
import GuestSubmitWarning from "@/components/auth/GuestSubmitWarning";

const [showGuestWarning, setShowGuestWarning] = useState(false);

const handleSubmit = () => {
  if (!isAuthenticated) {
    // Show warning about limitations
    setShowGuestWarning(true);
    return;
  }
  // Proceed with submission (authenticated user)
  submitAnswer();
};

// In render:
{showGuestWarning && (
  <GuestSubmitWarning 
    onContinueAsGuest={() => {
      setShowGuestWarning(false);
      submitAnswer(); // Allow guest submission
    }}
    onClose={() => setShowGuestWarning(false)}
  />
)}
```

---

## Removed Hardcoded Data

### Before:
```typescript
const [userName, setUserName] = useState("User");
const [userEmail, setUserEmail] = useState("user@example.com");
```

### After:
```typescript
const [isAuthenticated, setIsAuthenticated] = useState(false);
const [userName, setUserName] = useState("");
const [userEmail, setUserEmail] = useState("");

// Only set if user is authenticated
if (profile && profile.name && profile.email) {
  setIsAuthenticated(true);
  setUserName(profile.name);
  setUserEmail(profile.email);
}
```

---

## Testing Checklist

### As Unauthenticated User:
- [ ] Can access dashboard without login
- [ ] Can view questions
- [ ] Can view comments (read-only)
- [ ] Can view solutions
- [ ] See "Login" and "Sign Up" buttons in header
- [ ] See "Login" and "Sign Up" buttons in sidebar
- [ ] No hardcoded user data visible
- [ ] Warning prompt appears when submitting solution:
  - [ ] Shows limitations (no history, no analytics)
  - [ ] Shows "Login" and "Sign Up" buttons
  - [ ] Shows "Continue as Guest" option
  - [ ] Can submit after clicking "Continue as Guest"
- [ ] Login prompt (blocking) appears when trying to:
  - [ ] Add comment
  - [ ] Bookmark question
  - [ ] Access profile

### As Authenticated User:
- [ ] See profile avatar in header
- [ ] See profile info in sidebar
- [ ] See real name and email (not hardcoded)
- [ ] Can add comments
- [ ] Can add solutions
- [ ] Can bookmark questions
- [ ] Can submit answers
- [ ] Can access profile
- [ ] Can logout

---

## Benefits

### For Users:
- ✅ Try before signup - explore content freely
- ✅ No forced registration
- ✅ Clear understanding of what requires login
- ✅ Smooth onboarding experience

### For Platform:
- ✅ Higher engagement - users can explore first
- ✅ Better conversion - users see value before signup
- ✅ Reduced friction - no login wall
- ✅ Freemium model - free browsing, paid features

---

## Security Considerations

### API Protection:
- All write operations (POST, PUT, DELETE) require authentication
- Backend validates JWT token for protected routes
- Frontend only shows login prompts, backend enforces security

### Data Privacy:
- Unauthenticated users can't see:
  - Other users' personal data
  - Private analytics
  - Attempt history
  - Bookmarks
  - Profile information

### Rate Limiting:
- Consider rate limiting for unauthenticated users
- Prevent abuse of read-only endpoints
- Implement CAPTCHA for repeated actions

---

## Future Enhancements

### 1. Social Login
- Add "Continue with Google" option
- Faster signup process

### 2. Guest Mode Indicator
- Show banner: "You're browsing as guest"
- Highlight benefits of creating account

### 3. Progress Tracking
- Save guest progress in localStorage
- Offer to transfer progress after signup

### 4. Feature Comparison
- Show "Free vs Premium" comparison
- Highlight what's unlocked after login

---

## Summary

✅ **Dashboard accessible without login**
✅ **Read-only access for unauthenticated users**
✅ **Login prompts for write operations**
✅ **No hardcoded user data**
✅ **Clean Login/Signup buttons in header and sidebar**
✅ **Smooth authentication flow**

The platform now offers a freemium-like experience where users can explore before committing to registration!
