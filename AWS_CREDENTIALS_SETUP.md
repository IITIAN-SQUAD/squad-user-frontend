# AWS Credentials Setup Guide

## Error: "The authorization header is malformed"

This error means your AWS credentials are not being loaded from the `.env.local` file.

## Quick Fix

### 1. Check if `.env.local` exists
```bash
ls -la .env.local
```

If it doesn't exist, create it:
```bash
touch .env.local
```

### 2. Add AWS Credentials to `.env.local`

Open `.env.local` and add these lines:

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080

# AWS S3 Configuration
NEXT_PUBLIC_AWS_ACCESS_KEY_ID=AKIAX6OZOOJTI3KJMQOW
NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY=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
NEXT_PUBLIC_AWS_REGION=ap-south-1
NEXT_PUBLIC_S3_BUCKET_NAME=prod-image-bucket-2
```

### 3. Restart the Development Server

**IMPORTANT:** After adding/changing `.env.local`, you MUST restart the dev server:

```bash
# Stop the server (Ctrl+C)
# Then restart:
npm run dev
```

Environment variables are only loaded when the server starts!

### 4. Verify Credentials are Loaded

Open the browser console and look for these logs when the page loads:

**If credentials are missing:**
```
❌ AWS Credentials Missing!
AWS_ACCESS_KEY_ID: ❌ Missing
AWS_SECRET_ACCESS_KEY: ❌ Missing
```

**If credentials are loaded:**
```
AWS_ACCESS_KEY_ID: ✅ Set
AWS_SECRET_ACCESS_KEY: ✅ Set
```

---

## Common Issues

### Issue 1: Credentials not loading after adding to .env.local
**Solution:** Restart the dev server (npm run dev)

### Issue 2: File exists but credentials still missing
**Solution:** 
1. Check file name is exactly `.env.local` (not `.env` or `env.local`)
2. Check there are no spaces around the `=` sign
3. Check the variables start with `NEXT_PUBLIC_`

### Issue 3: Still getting authorization error
**Solution:**
1. Verify the AWS Access Key ID is correct
2. Verify the AWS Secret Access Key is correct
3. Check the IAM user has S3 permissions

---

## Your Current Credentials

Based on previous messages, your credentials are:

```env
NEXT_PUBLIC_AWS_ACCESS_KEY_ID=AKIAX6OZOOJTI3KJMQOW
NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY=x/T5xfCKr9ilnTSTkOa1foUdVWYak0DqE8EBWrd6
NEXT_PUBLIC_AWS_REGION=ap-south-1
NEXT_PUBLIC_S3_BUCKET_NAME=prod-image-bucket-2
```

---

## Testing Steps

1. **Create/Update `.env.local`** with the credentials above
2. **Restart dev server:** Stop (Ctrl+C) and run `npm run dev`
3. **Open browser console** (F12)
4. **Go to Profile page**
5. **Try uploading an image**
6. **Check console logs:**
   - Should see: `📤 Converting file to buffer...`
   - Should see: `📤 Uploading to S3: profile-images/...`
   - Should see: `✅ File uploaded successfully: https://...`

---

## Why NEXT_PUBLIC_ prefix?

Next.js only exposes environment variables to the browser if they start with `NEXT_PUBLIC_`.

Without this prefix, the variables are only available on the server-side, not in client-side code.

Since we're uploading directly from the browser to S3, we need the credentials in the browser.

⚠️ **Security Note:** In production, use pre-signed URLs or AWS Cognito instead of exposing credentials.

---

## Need Help?

If you're still having issues:

1. Share the console logs (especially the AWS credential check logs)
2. Confirm you restarted the dev server
3. Check if `.env.local` is in the root directory (same level as `package.json`)
