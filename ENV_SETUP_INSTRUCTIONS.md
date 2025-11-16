# Environment Setup Instructions

## Your .env.local file should look EXACTLY like this:

```
NEXT_PUBLIC_ENABLED_FEATURES=blog
```

## Common Issues:

### ❌ WRONG - Extra blank lines at the end:
```
NEXT_PUBLIC_ENABLED_FEATURES=blog


```

### ❌ WRONG - Space after blog:
```
NEXT_PUBLIC_ENABLED_FEATURES=blog 
```

### ❌ WRONG - Spaces around equals:
```
NEXT_PUBLIC_ENABLED_FEATURES = blog
```

### ✅ CORRECT:
```
NEXT_PUBLIC_ENABLED_FEATURES=blog
```

## Steps to Fix:

1. **Delete your current .env.local file completely**
2. **Create a NEW .env.local file**
3. **Copy ONLY this line into it:**
   ```
   NEXT_PUBLIC_ENABLED_FEATURES=blog
   ```
4. **Save the file**
5. **Make sure there are NO blank lines after it**
6. **Run these commands:**
   ```bash
   rm -rf .next
   npm run dev
   ```

## To Test Multiple Features:

```bash
# Blog + Practice
NEXT_PUBLIC_ENABLED_FEATURES=blog,practice

# Blog + Practice + Analytics
NEXT_PUBLIC_ENABLED_FEATURES=blog,practice,analytics

# All features
NEXT_PUBLIC_ENABLED_FEATURES=blog,practice,analytics,revision,challenge,pyq,coaching,doubts
```

## Debug:

After restarting, you should see in terminal:
```
🔍 Feature Flags Debug:
  Raw env value: "blog"
  Trimmed: "blog"
  Is empty?: false
  ✅ Enabled features: ['blog']
```

If you still see empty "", then:
1. Check file is named `.env.local` (with the dot at the start)
2. Check file is in the project root (same folder as package.json)
3. Try without Turbopack: `npm run dev -- --no-turbopack`
