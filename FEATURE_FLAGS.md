# Feature Flags System

This document explains how to use the feature flags system to control which features are visible in the IITian Squad platform.

## Overview

The feature flag system allows you to enable/disable features dynamically using environment variables. This is useful for:
- **Gradual rollout**: Launch features one at a time
- **Production control**: Show only completed features to users
- **Development**: Test features in isolation

## Available Features

The following features can be controlled:

| Feature Key | Feature Name | Description | Default Path |
|------------|--------------|-------------|--------------|
| `blog` | Blog | Articles, tips, and success stories | `/blog` |
| `practice` | Practice | Question practice platform | `/dashboard` |
| `analytics` | Analytics | Performance tracking and analytics | `/dashboard/analytics` |
| `revision` | Revision | Revision tools and materials | `/dashboard/revision` |
| `challenge` | Challenge | Live challenges and competitions | `/dashboard/challenge` |
| `pyq` | PYQ Papers | Previous year question papers | `/dashboard/pyq` |
| `coaching` | AI Coaching | AI-powered personalized coaching | `/dashboard/coaching` |
| `doubts` | Doubts | Doubt resolution platform | `/dashboard/doubts` |

## Setup

### 1. Create Environment File

Create a `.env.local` file in the project root (copy from `env.example`):

```bash
cp env.example .env.local
```

### 2. Configure Feature Flags

Add the `NEXT_PUBLIC_ENABLED_FEATURES` variable to your `.env.local` file:

```bash
# Enable only blog
NEXT_PUBLIC_ENABLED_FEATURES=blog

# Enable blog and practice
NEXT_PUBLIC_ENABLED_FEATURES=blog,practice

# Enable multiple features
NEXT_PUBLIC_ENABLED_FEATURES=blog,practice,analytics,revision

# Enable all features
NEXT_PUBLIC_ENABLED_FEATURES=blog,practice,analytics,revision,challenge,pyq,coaching,doubts

# Enable all features (alternative: leave empty or comment out)
# NEXT_PUBLIC_ENABLED_FEATURES=
```

## How It Works

### 1. Navbar Links

The navigation bar (both desktop and mobile) automatically shows/hides links based on enabled features.

**When only blog is enabled:**
- Navbar shows: Blog
- Other links are hidden

**When blog and practice are enabled:**
- Navbar shows: Blog, Practice
- Other links are hidden

### 2. Landing Page Feature Cards

Feature cards on the landing page show different states:

**Enabled Feature:**
- Shows clickable link (e.g., "Start Practicing →")
- Link navigates to the feature

**Disabled Feature:**
- Shows "Coming Soon - Development in Progress" message
- No navigation link
- Clock icon indicates feature is under development

### 3. Code Usage

You can check if a feature is enabled in your components:

```typescript
import { isFeatureEnabled } from '@/lib/features';

// Check if a feature is enabled
if (isFeatureEnabled('practice')) {
  // Show practice-related content
}

// Conditional rendering
{isFeatureEnabled('blog') && (
  <Link href="/blog">Blog</Link>
)}

// Show coming soon message
{!isFeatureEnabled('analytics') && (
  <span>Coming Soon - Development in Progress</span>
)}
```

## Components

### Feature Configuration (`lib/features.ts`)

Core utility that:
- Reads `NEXT_PUBLIC_ENABLED_FEATURES` from environment
- Provides `isFeatureEnabled()` function
- Manages feature metadata

### ComingSoon Component (`components/ui/ComingSoon.tsx`)

Reusable component for showing "coming soon" messages:

```typescript
import ComingSoon from '@/components/ui/ComingSoon';

// Card variant (default)
<ComingSoon 
  title="Feature Name"
  message="Custom message"
/>

// Inline variant
<ComingSoon variant="inline" />

// Full page variant
<ComingSoon variant="page" />
```

## Deployment Scenarios

### Scenario 1: Initial Launch (Blog Only)

```bash
NEXT_PUBLIC_ENABLED_FEATURES=blog
```

**Result:**
- Navbar: Only "Blog" link visible
- Landing page: All other features show "Coming Soon"
- Users can only access blog content

### Scenario 2: Add Practice Platform

```bash
NEXT_PUBLIC_ENABLED_FEATURES=blog,practice
```

**Result:**
- Navbar: "Blog" and "Practice" links visible
- Landing page: Blog and Practice cards are clickable
- Other features still show "Coming Soon"

### Scenario 3: Full Platform Launch

```bash
NEXT_PUBLIC_ENABLED_FEATURES=blog,practice,analytics,revision,challenge,pyq,coaching,doubts
```

**Result:**
- All navbar links visible
- All landing page feature cards clickable
- No "Coming Soon" messages

## Important Notes

1. **Environment Variable Prefix**: Must use `NEXT_PUBLIC_` prefix for client-side access
2. **Rebuild Required**: Changes to `.env.local` require restarting the dev server
3. **Production**: Set appropriate features in your production environment variables
4. **Case Sensitive**: Feature names are case-insensitive (converted to lowercase)
5. **Default Behavior**: If no features specified, all features are enabled by default

## Testing

### Test Blog Only Mode

```bash
# In .env.local
NEXT_PUBLIC_ENABLED_FEATURES=blog

# Restart dev server
npm run dev
```

Visit the site and verify:
- ✅ Only "Blog" appears in navbar
- ✅ Practice card shows "Coming Soon"
- ✅ Analytics card shows "Coming Soon"
- ✅ All other cards show "Coming Soon"

### Test Blog + Practice Mode

```bash
# In .env.local
NEXT_PUBLIC_ENABLED_FEATURES=blog,practice

# Restart dev server
npm run dev
```

Visit the site and verify:
- ✅ "Blog" and "Practice" appear in navbar
- ✅ Blog and Practice cards are clickable
- ✅ Other cards show "Coming Soon"

## Troubleshooting

### Features not showing/hiding correctly

1. Check `.env.local` file exists in project root
2. Verify `NEXT_PUBLIC_ENABLED_FEATURES` is spelled correctly
3. Restart the development server
4. Clear browser cache

### All features showing even when disabled

- Ensure you're using `NEXT_PUBLIC_` prefix
- Check for typos in feature names
- Verify environment variable is being read (check browser console)

### Coming Soon message not appearing

- Ensure `Clock` icon is imported from `lucide-react`
- Check that feature check is inverted correctly (`!isFeatureEnabled()`)

## Future Enhancements

Potential improvements to the feature flag system:

- [ ] Admin dashboard for toggling features
- [ ] Feature-specific permissions
- [ ] A/B testing support
- [ ] Feature analytics tracking
- [ ] Scheduled feature releases
