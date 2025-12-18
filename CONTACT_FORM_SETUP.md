# Contact Form Setup Guide

Your contact form is now fully operational! Here's everything you need to know to get it working.

## What's Been Done

### 1. PHP Mailer (`mailer.php`)
- Fixed file upload handling with proper validation
- Added support for attachments (up to 5MB)
- Improved email formatting with all form fields
- Added proper error handling and validation
- Email recipient set to: `noumanahmad056@gmail.com`

### 2. JavaScript Form Handler (`assets/js/ajax-form.js`)
- Real-time form validation
- Email format validation
- AJAX form submission (no page reload)
- File upload support via FormData
- Visual feedback for invalid fields
- Success/error message display
- Button state management (prevents double submissions)

### 3. CSS Styling (`assets/css/style.css`)
- Red border for invalid input fields
- Success message styling (green)
- Error message styling (red)
- Disabled button state styling

## How to Use

### Server Requirements

The contact form requires a **PHP-enabled server** to work. You have two options:

#### Option 1: Local Testing with PHP Built-in Server

1. Open Terminal in your project directory
2. Run this command:
   ```bash
   php -S localhost:8000
   ```
3. Open your browser and go to: `http://localhost:8000`
4. Navigate to the contact section and test the form

#### Option 2: Deploy to a Web Host

Deploy your site to any PHP-enabled hosting service such as:
- **Shared Hosting**: Hostinger, Bluehost, SiteGround, etc.
- **Cloud Hosting**: AWS, DigitalOcean, Linode
- **Free Options**: InfinityFree, 000webhost (for testing)

### Email Configuration

**Important:** The PHP `mail()` function requires your server to have a mail server configured.

#### For Production Use:

If emails aren't being sent, you may need to:

1. **Use SMTP instead** (recommended for reliability)
2. Configure your server's mail settings
3. Use a third-party email service (SendGrid, Mailgun, AWS SES)

#### Quick SMTP Alternative:

If you want to use SMTP instead of PHP's `mail()` function, I can help you set up PHPMailer library which is more reliable. Just ask!

### Configuration

1. **Change Email Recipient** (if needed):
   - Open `mailer.php`
   - Line 6: Change `$mail_to = "noumanahmad056@gmail.com";` to your email

2. **Customize File Upload Settings**:
   - Allowed types: jpg, jpeg, png, gif, pdf, doc, docx, txt
   - Max file size: 5MB
   - Files are saved to `uploads/` folder

3. **Adjust Validation** (optional):
   - Edit `assets/js/ajax-form.js` to modify validation rules

## Form Fields

### Required Fields (marked with *)
- Full Name
- Email
- Subject

### Optional Fields
- Phone Number
- Budget
- Message
- File Attachment

## Testing the Form

1. Fill in the required fields (Full Name, Email, Subject)
2. Optionally add a message and attachment
3. Click "Send Message"
4. Watch for:
   - Button changes to "Sending..."
   - Success message appears (green box)
   - Form clears automatically

## Troubleshooting

### Problem: Emails not being received

**Solutions:**
1. Check spam/junk folder
2. Verify server has mail service installed
3. Check server error logs
4. Consider using SMTP instead of `mail()`

### Problem: Form shows error immediately

**Cause:** Server isn't running PHP or `mailer.php` not found

**Solution:**
- Make sure you're accessing via PHP server (not just opening HTML file)
- Check file paths are correct

### Problem: File uploads not working

**Solutions:**
1. Ensure `uploads/` folder has write permissions (755 or 777)
2. Check file size (max 5MB)
3. Verify file type is allowed
4. Check PHP upload settings in `php.ini`

### Problem: Validation not working

**Solution:**
- Make sure `assets/js/ajax-form.js` is loaded
- Check browser console for JavaScript errors
- Verify jQuery is loaded before ajax-form.js

## File Structure

```
DEV_PORTFOLIO/
├── index.html              # Contact form HTML
├── mailer.php             # PHP email handler
├── assets/
│   ├── js/
│   │   └── ajax-form.js   # Form validation & AJAX
│   └── css/
│       └── style.css      # Form styling
└── uploads/               # Created automatically for attachments
```

## Next Steps

### For Better Email Delivery:

If you want reliable email delivery, I recommend setting up SMTP. Let me know if you'd like help implementing:
- PHPMailer with SMTP
- Integration with Gmail/Outlook
- Third-party email services (SendGrid, Mailgun)

### Additional Features I Can Add:

- Email notifications to form submitters (auto-reply)
- Form data storage in database
- Google reCAPTCHA spam protection
- Email templates with HTML formatting
- Admin dashboard to view submissions

## Security Notes

✅ **Already Implemented:**
- Input sanitization
- File upload validation
- File type restrictions
- File size limits
- Email validation
- XSS protection

⚠️ **Recommended Additions:**
- CAPTCHA for spam prevention
- Rate limiting
- CSRF token protection

---

## Quick Start Command

To test locally right now:

```bash
cd /Users/alibaig/Desktop/Projects/DEV_PORTFOLIO
php -S localhost:8000
```

Then open: http://localhost:8000

---

Need help with anything? Just ask!
