# Guest vs Authenticated User Features

## Quick Reference Guide

### ✅ Guest Users CAN:
| Feature | Access | Notes |
|---------|--------|-------|
| View Dashboard | ✅ Full | Browse all sections |
| View Questions | ✅ Full | See all practice questions |
| View Comments | ✅ Read-Only | Can't add comments |
| View Solutions | ✅ Full | See community solutions |
| **Submit Solutions** | ⚠️ **Limited** | **Warning shown, but allowed** |
| Browse Content | ✅ Full | Explore freely |

### ⚠️ Guest Users - Limited Features:
| Feature | Limitation | Prompt |
|---------|-----------|--------|
| **Submit Solutions** | No history saved | "Login to track your progress" |
| | No analytics | Shows warning with Login/Signup buttons |
| | No progress tracking | Can continue as guest |

### ❌ Guest Users CANNOT:
| Feature | Block | Action |
|---------|-------|--------|
| Add Comments | 🚫 Blocked | Must login |
| Bookmark Questions | 🚫 Blocked | Must login |
| View Attempt History | 🚫 Blocked | Must login |
| View Personal Analytics | 🚫 Blocked | Must login |
| Access Profile | 🚫 Blocked | Must login |

---

## UI Components

### 1. For Blocking Actions (Comments, Bookmarks)
Use: `LoginPrompt` component
```tsx
import LoginPrompt from "@/components/auth/LoginPrompt";

<LoginPrompt 
  title="Login Required"
  description="Please login to add comments"
  action="add comments"
/>
```

### 2. For Warning Actions (Submit Solutions)
Use: `GuestSubmitWarning` component
```tsx
import GuestSubmitWarning from "@/components/auth/GuestSubmitWarning";

<GuestSubmitWarning 
  onContinueAsGuest={() => {
    // Allow submission
    submitSolution();
  }}
  onClose={() => {
    // Close warning
    setShowWarning(false);
  }}
/>
```

---

## Implementation Examples

### Example 1: Add Comment (BLOCKED)
```tsx
const handleAddComment = () => {
  if (!isAuthenticated) {
    // Block and show login prompt
    return <LoginPrompt 
      title="Login to Comment"
      description="Join the discussion by logging in"
      action="add comments"
    />;
  }
  // Proceed with adding comment
  addComment();
};
```

### Example 2: Submit Solution (WARNING)
```tsx
const [showGuestWarning, setShowGuestWarning] = useState(false);

const handleSubmit = () => {
  if (!isAuthenticated) {
    // Show warning but allow to continue
    setShowGuestWarning(true);
    return;
  }
  // Authenticated user - submit directly
  submitSolution();
};

// In render:
{showGuestWarning && (
  <GuestSubmitWarning 
    onContinueAsGuest={() => {
      setShowGuestWarning(false);
      submitSolution(); // Allow guest submission
    }}
    onClose={() => setShowGuestWarning(false)}
  />
)}
```

### Example 3: Bookmark (BLOCKED)
```tsx
const handleBookmark = () => {
  if (!isAuthenticated) {
    // Block and show login prompt
    return <LoginPrompt 
      title="Login to Bookmark"
      description="Save questions to your personal collection"
      action="bookmark questions"
    />;
  }
  // Proceed with bookmark
  toggleBookmark();
};
```

---

## User Journey

### Guest User Journey:
```
1. Visit dashboard (no login)
   ↓
2. Browse questions freely
   ↓
3. Try to submit solution
   ↓
4. ⚠️ Warning appears:
   - "No history/analytics without login"
   - [Login] [Sign Up] buttons
   - [Continue as Guest] option
   ↓
5a. Click "Login" → Login page
5b. Click "Sign Up" → Signup page
5c. Click "Continue as Guest" → Submit (no tracking)
```

### Authenticated User Journey:
```
1. Login/Signup
   ↓
2. Access dashboard
   ↓
3. Submit solutions → ✅ Tracked
4. Add comments → ✅ Saved
5. Bookmark questions → ✅ Saved
6. View analytics → ✅ Personalized
7. View history → ✅ Full access
```

---

## Summary

| Action | Guest | Authenticated |
|--------|-------|---------------|
| View Content | ✅ | ✅ |
| Submit Solutions | ⚠️ Warning | ✅ Tracked |
| Add Comments | ❌ Blocked | ✅ |
| Bookmark | ❌ Blocked | ✅ |
| Analytics | ❌ Blocked | ✅ |
| History | ❌ Blocked | ✅ |

**Key Difference:**
- **Blocked (❌)** = Must login, cannot proceed
- **Warning (⚠️)** = Can proceed, but with limitations
- **Full Access (✅)** = No restrictions
