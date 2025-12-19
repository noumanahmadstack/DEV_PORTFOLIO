# Quick Deployment Guide

## The Problem

Your Vercel deployment is showing 404 because:
1. Vercel might be connected to the old repository (taha020/DEV_PORTFOLIO)
2. The deployment needs to be from your repository (noumanahmadstack/DEV_PORTFOLIO)

## Solution: Deploy Using Vercel CLI

### Step 1: Login to Vercel

```bash
vercel login
```

This will open your browser. Log in with your account.

### Step 2: Deploy the Project

```bash
cd /Users/alibaig/Desktop/Projects/DEV_PORTFOLIO
vercel
```

**When prompted:**
- "Set up and deploy?" → **Y** (Yes)
- "Which scope?" → Select your account (noumanahmadstack)
- "Link to existing project?" → **N** (No) - Create a new one
- "What's your project's name?" → `dev-portfolio` (or any name you want)
- "In which directory is your code located?" → Press Enter (current directory)
- "Want to modify settings?" → **N** (No)

### Step 3: Add Environment Variables

After deployment, you'll get a URL. Now add environment variables:

```bash
vercel env add SMTP_HOST
# Enter: smtp.gmail.com
# Select all environments: Production, Preview, Development

vercel env add SMTP_PORT
# Enter: 587

vercel env add SMTP_USER
# Enter: noumanahmad056@gmail.com

vercel env add SMTP_PASS
# Enter: jrxg rocz xpzm paqi

vercel env add MAIL_TO
# Enter: noumanahmad056@gmail.com
```

### Step 4: Deploy to Production

```bash
vercel --prod
```

Done! Your site will be live with a working contact form.

## Alternative: Fix via Vercel Dashboard

If you prefer using the dashboard:

1. **Delete the old project:**
   - Go to https://vercel.com/noumanahmadstack/mobileportfolio
   - Settings → Advanced → Delete Project

2. **Create a new project:**
   - Go to https://vercel.com/new
   - Import `noumanahmadstack/DEV_PORTFOLIO` from GitHub
   - Add the 5 environment variables before deploying:
     - `SMTP_HOST` = `smtp.gmail.com`
     - `SMTP_PORT` = `587`
     - `SMTP_USER` = `noumanahmad056@gmail.com`
     - `SMTP_PASS` = `jrxg rocz xpzm paqi`
     - `MAIL_TO` = `noumanahmad056@gmail.com`
   - Click Deploy

## Verify Everything Works

After deployment:

1. Visit your new Vercel URL
2. Go to the Contact section
3. Fill out and submit the form
4. Check your email (noumanahmad056@gmail.com) for the test message

## Troubleshooting

### Still getting 404 on /api/contact?
- Check Vercel dashboard → Functions tab
- You should see `api/contact` listed
- If not, the deployment might have failed

### Contact form doesn't send emails?
- Check environment variables are set correctly
- Check Vercel logs: Deployments → [Latest] → Functions
- Look for SMTP authentication errors

### Need to see logs?
```bash
vercel logs
```
