# Nouman Ahmad - Developer Portfolio

A modern, responsive portfolio website built with HTML, CSS, and JavaScript, deployed on Vercel.

## Features

- Responsive design
- Contact form with email notifications
- Portfolio showcase
- Skills & experience sections
- Testimonials

## Deployment Instructions

### 1. Install Vercel CLI (if not already installed)

```bash
npm install -g vercel
```

### 2. Set up environment variables

Before deploying, you need to configure email settings in Vercel:

#### For Gmail:
1. Go to your Google Account settings
2. Enable 2-factor authentication
3. Generate an App Password: https://myaccount.google.com/apppasswords
4. Use this app password (not your regular password)

#### Add environment variables to Vercel:

```bash
vercel env add SMTP_HOST
# Enter: smtp.gmail.com

vercel env add SMTP_PORT
# Enter: 587

vercel env add SMTP_USER
# Enter: your-email@gmail.com

vercel env add SMTP_PASS
# Enter: your-app-password

vercel env add MAIL_TO
# Enter: noumanahmad056@gmail.com
```

Make sure to add these for **production**, **preview**, and **development** environments.

### 3. Deploy to Vercel

```bash
# Deploy to production
vercel --prod

# Or just run vercel and follow the prompts
vercel
```

### 4. Alternative: Deploy via Vercel Dashboard

1. Go to https://vercel.com
2. Click "Add New Project"
3. Import your GitHub repository
4. Add the environment variables in the project settings:
   - `SMTP_HOST` = `smtp.gmail.com`
   - `SMTP_PORT` = `587`
   - `SMTP_USER` = your Gmail address
   - `SMTP_PASS` = your Gmail app password
   - `MAIL_TO` = `noumanahmad056@gmail.com`
5. Deploy

## Local Development

```bash
# Install dependencies
npm install

# Run locally with Vercel dev server
npm run dev
```

Then open http://localhost:3000

**Note:** For local development, create a `.env` file based on `.env.example` and add your credentials.

## Testing the Contact Form

After deployment:
1. Visit your deployed site
2. Navigate to the Contact section
3. Fill out the form and submit
4. You should receive an email at the configured `MAIL_TO` address

## Tech Stack

- HTML5, CSS3, JavaScript
- jQuery
- Bootstrap
- Vercel Serverless Functions (Node.js)
- Nodemailer for email sending

## Project Structure

```
.
├── api/
│   └── contact.js          # Serverless function for contact form
├── assets/
│   ├── css/
│   ├── js/
│   │   └── ajax-form.js   # Contact form frontend logic
│   └── images/
├── index.html              # Main HTML file
├── package.json            # Dependencies
├── vercel.json            # Vercel configuration
└── .env.example           # Environment variables template
```

## Support

For issues or questions, contact: noumanahmad056@gmail.com
