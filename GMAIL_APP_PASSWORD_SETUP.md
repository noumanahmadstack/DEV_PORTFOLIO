# Gmail App Password Setup Guide

## The Problem
Gmail is rejecting the current App Password with error:
```
Invalid login: 535-5.7.8 Username and Password not accepted
```

## Solution: Generate a NEW App Password

### Step 1: Enable 2-Factor Authentication (if not already enabled)

1. Go to https://myaccount.google.com/security
2. Sign in with `noumanahmad056@gmail.com`
3. Under "Signing in to Google", click **2-Step Verification**
4. Follow the prompts to enable it (if not already enabled)

### Step 2: Generate App Password

1. **Go to App Passwords page:**
   - Visit: https://myaccount.google.com/apppasswords
   - Or: Google Account → Security → 2-Step Verification → App passwords

2. **Create a new App Password:**
   - You might be asked to sign in again
   - Select app: **Mail**
   - Select device: **Other (Custom name)**
   - Type: `Portfolio Contact Form`
   - Click **Generate**

3. **Copy the password:**
   - Google will show a 16-character password like: `abcd efgh ijkl mnop`
   - **IMPORTANT:** Copy it EXACTLY as shown
   - Click **Done**

### Step 3: Update Vercel Environment Variable

1. **Remove ALL spaces from the password:**
   - Original: `abcd efgh ijkl mnop`
   - Cleaned: `abcdefghijklmnop`

2. **Update in Vercel:**
   - Go to https://vercel.com
   - Click on your portfolio project
   - Go to **Settings** → **Environment Variables**
   - Find `SMTP_PASS`
   - Click **Edit** or **Delete** and add new one
   - Enter the password **WITHOUT SPACES**: `abcdefghijklmnop`
   - Select: ✓ Production ✓ Preview ✓ Development
   - Click **Save**

3. **Redeploy:**
   - Go to **Deployments** tab
   - Click **...** (three dots) on the latest deployment
   - Click **Redeploy**
   - Wait for deployment to complete

### Step 4: Test

1. Visit your deployed site
2. Go to Contact section
3. Fill out the form with test data
4. Submit
5. Check your email inbox at `noumanahmad056@gmail.com`

## Troubleshooting

### Still getting "Invalid login"?

**Check these:**
1. ✓ 2-Factor Authentication is enabled on your Google account
2. ✓ App Password was generated AFTER enabling 2FA
3. ✓ Password has NO spaces (16 characters only)
4. ✓ You're using the correct email: `noumanahmad056@gmail.com`
5. ✓ Environment variables are set for Production environment
6. ✓ You redeployed AFTER updating the environment variable

### Alternative: Check if "Less secure app access" is needed

For some Google Workspace accounts:
1. Go to https://myaccount.google.com/lesssecureapps
2. Turn ON "Allow less secure apps"
3. **Note:** This is NOT recommended for security reasons. App Passwords are better.

### Still not working?

The issue might be:
1. **Old App Password:** Delete old app passwords and create a fresh one
2. **Google Workspace account:** May have different security settings
3. **Recently enabled 2FA:** Wait 10-15 minutes for Google to propagate changes

## Quick Reference

**Environment Variables needed in Vercel:**
```
SMTP_USER = noumanahmad056@gmail.com
SMTP_PASS = [your-16-char-password-no-spaces]
MAIL_TO = noumanahmad056@gmail.com
```

**Current values (DO NOT COMMIT THIS FILE WITH REAL PASSWORDS):**
- SMTP_USER: `noumanahmad056@gmail.com` ✓
- SMTP_PASS: `[REGENERATE THIS]` ❌
- MAIL_TO: `noumanahmad056@gmail.com` ✓
