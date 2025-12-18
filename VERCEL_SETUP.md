# Vercel Deployment Setup Guide

## Current Issue: 404 Error on Contact Form

The contact form is returning a 404 error because environment variables are not set in Vercel.

## Step-by-Step Fix

### 1. Go to Your Vercel Project Settings

Visit: https://vercel.com/noumanahmadstack/mobileportfolio (or your project dashboard)

### 2. Add Environment Variables

1. Click on your project
2. Go to **Settings** → **Environment Variables**
3. Add the following variables (use the values from your `.env.example` file):

| Variable Name | Value |
|--------------|-------|
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_PORT` | `587` |
| `SMTP_USER` | `noumanahmad056@gmail.com` |
| `SMTP_PASS` | `jrxg rocz xpzm paqi` |
| `MAIL_TO` | `noumanahmad056@gmail.com` |

**IMPORTANT:** For each variable:
- Select all environments: **Production**, **Preview**, and **Development**
- Click "Save"

### 3. Redeploy Your Project

After adding all environment variables:

**Option A: Via Dashboard**
1. Go to **Deployments** tab
2. Click the three dots (...) on the latest deployment
3. Click **Redeploy**
4. Select "Use existing Build Cache"

**Option B: Via Git Push**
Just push a new commit and Vercel will automatically redeploy:

```bash
git add .
git commit -m "Update vercel.json configuration"
git push
```

### 4. Test the Contact Form

1. Go to https://mobileportfolio-gamma.vercel.app/
2. Scroll to the Contact section
3. Fill out the form and submit
4. You should receive an email at noumanahmad056@gmail.com

## Verification Checklist

- [ ] All 5 environment variables are added in Vercel
- [ ] Environment variables are set for Production, Preview, and Development
- [ ] Project has been redeployed after adding variables
- [ ] Contact form endpoint returns 200 (not 404)
- [ ] Test email is received successfully

## Troubleshooting

### Still getting 404?
1. Check that the `/api/contact` endpoint exists in your deployment
2. Go to your Vercel deployment → Functions tab
3. You should see `api/contact.js` listed

### Contact form submits but no email?
1. Check Vercel logs: Project → Deployments → [Latest] → Function Logs
2. Look for errors related to SMTP authentication
3. Verify your Gmail App Password is correct

### Gmail authentication errors?
1. Make sure you're using an App Password, not your regular password
2. Generate a new App Password: https://myaccount.google.com/apppasswords
3. Update the `SMTP_PASS` environment variable in Vercel
4. Redeploy

## Quick Commands Reference

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Add environment variables via CLI
vercel env add SMTP_HOST production
vercel env add SMTP_PORT production
vercel env add SMTP_USER production
vercel env add SMTP_PASS production
vercel env add MAIL_TO production

# Deploy
vercel --prod

# Check deployment status
vercel ls

# View logs
vercel logs
```
