import nodemailer from 'nodemailer';
import formidable from 'formidable';
import fs from 'fs';

// Helper function to parse form data
const parseForm = (req) => {
  return new Promise((resolve, reject) => {
    const form = formidable({
      maxFileSize: 5 * 1024 * 1024, // 5MB max
      allowEmptyFiles: false,
      multiples: false,
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({ fields, files });
    });
  });
};

// Main handler function
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request for CORS
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    res.status(403).json({ error: 'There was a problem with your submission, please try again.' });
    return;
  }

  try {
    // Log environment variables (without showing passwords)
    console.log('Environment check:', {
      SMTP_HOST: process.env.SMTP_HOST,
      SMTP_PORT: process.env.SMTP_PORT,
      SMTP_USER: process.env.SMTP_USER,
      SMTP_PASS: process.env.SMTP_PASS ? '***SET***' : 'NOT SET',
      MAIL_TO: process.env.MAIL_TO
    });

    // Parse the form data
    const { fields, files } = await parseForm(req);

    // Extract fields (formidable returns arrays for fields)
    const name = fields['full-name'] ? fields['full-name'][0].trim() : '';
    const email = fields.email ? fields.email[0].trim() : '';
    const phone = fields['phone-number'] ? fields['phone-number'][0].trim() : '';
    const subject = fields.subject ? fields.subject[0].trim() : '';
    const budget = fields.budget ? fields.budget[0].trim() : '';
    const message = fields.message ? fields.message[0].trim() : '';

    // Validate required fields
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name || !emailRegex.test(email) || !subject) {
      res.status(400).json({ error: 'Please complete all required fields and try again.' });
      return;
    }

    // Handle file attachment
    let attachments = [];
    if (files.file && files.file[0]) {
      const file = files.file[0];
      const allowedTypes = ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'doc', 'docx', 'txt'];
      const fileExt = file.originalFilename.split('.').pop().toLowerCase();

      if (allowedTypes.includes(fileExt) && file.size <= 5242880) {
        attachments.push({
          filename: file.originalFilename,
          path: file.filepath,
        });
      }
    }

    // Create email content
    let emailContent = `New Contact Form Submission\n\n`;
    emailContent += `Name: ${name}\n`;
    emailContent += `Email: ${email}\n`;
    emailContent += `Phone: ${phone}\n`;
    emailContent += `Subject: ${subject}\n`;
    emailContent += `Budget: ${budget}\n\n`;
    emailContent += `Message:\n${message}\n`;

    // Configure nodemailer transporter
    // IMPORTANT: You need to set up environment variables in Vercel
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Use Gmail service directly
      auth: {
        user: process.env.SMTP_USER, // Your email
        pass: process.env.SMTP_PASS, // Your email password or app password
      },
    });

    // Email options
    const mailOptions = {
      from: `"${name}" <${process.env.SMTP_USER}>`,
      to: process.env.MAIL_TO || 'noumanahmad056@gmail.com',
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      text: emailContent,
      attachments: attachments,
    };
    // Send email
    await transporter.sendMail(mailOptions);

    // Clean up uploaded file after sending
    if (attachments.length > 0) {
      fs.unlinkSync(attachments[0].path);
    }

    res.status(200).json({ message: 'Thank You! Your message has been sent successfully.' });

  } catch (error) {
    console.error('Full error:', error);
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    res.status(500).json({
      error: 'Oops! Something went wrong, we couldn\'t send your message.',
      debug: error.message // Remove this after debugging
    });
  }
}
