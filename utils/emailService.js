import nodemailer from 'nodemailer';

/**
 * Escape HTML to prevent injection
 */
const escapeHtml = (text) => {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
};

/**
 * Create email transporter based on provider
 * Supports Gmail, SendGrid, and other SMTP services
 */
const createTransporter = () => {
  const provider = process.env.EMAIL_PROVIDER || 'gmail';

  if (provider === 'gmail') {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD, // Use App Password, not regular password
      },
    });
  }

  if (provider === 'sendgrid') {
    return nodemailer.createTransport({
      host: 'smtp.sendgrid.net',
      port: 587,
      auth: {
        user: 'apikey',
        pass: process.env.SENDGRID_API_KEY,
      },
    });
  }

  // Generic SMTP
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

/**
 * Send contact form email
 */
export const sendContactEmail = async (data) => {
  const { name, email, subject, message } = data;

  const transporter = createTransporter();

  const mailOptions = {
    from: process.env.EMAIL_FROM || process.env.GMAIL_USER,
    to: process.env.EMAIL_TO || 'edreanochieng@gmail.com',
    replyTo: email,
    subject: `New Portfolio Inquiry: ${subject}`,
    html: `
      <div style="font-family: 'DM Sans', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #fafaf8; border-radius: 12px;">
        <h2 style="color: #0a0a0a; margin-bottom: 20px; font-size: 24px;">New Message from Your Portfolio</h2>
        
        <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <p style="margin: 0 0 15px 0;"><strong style="color: #0a0a0a;">From:</strong> ${name}</p>
          <p style="margin: 0 0 15px 0;"><strong style="color: #0a0a0a;">Email:</strong> <a href="mailto:${email}" style="color: #d65c42; text-decoration: none;">${email}</a></p>
          <p style="margin: 0 0 15px 0;"><strong style="color: #0a0a0a;">Subject:</strong> ${subject}</p>
        </div>

        <div style="background: #f5f2f0; padding: 20px; border-radius: 8px; border-left: 3px solid #d65c42; margin-bottom: 20px;">
          <p style="color: #0a0a0a; margin: 0; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(message)}</p>
        </div>

        <p style="color: #6b6b6b; font-size: 12px; margin: 0; text-align: center;">
          This email was sent from your portfolio contact form. Reply directly to this email to respond.
        </p>
      </div>
    `,
    text: `
New Message from Your Portfolio

From: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email send error:', error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

/**
 * Send confirmation email to user
 */
export const sendConfirmationEmail = async (userEmail, userName) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: process.env.EMAIL_FROM || process.env.GMAIL_USER,
    to: userEmail,
    subject: 'Message Received - Edrean Ochieng',
    html: `
      <div style="font-family: 'DM Sans', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #fafaf8; border-radius: 12px;">
        <h2 style="color: #0a0a0a; margin-bottom: 20px; font-size: 24px;">Thanks for reaching out, ${userName}!</h2>
        
        <p style="color: #6b6b6b; line-height: 1.7; margin-bottom: 15px;">
          I've received your message and will get back to you as soon as possible. I typically respond within 24-48 hours.
        </p>

        <p style="color: #6b6b6b; line-height: 1.7; margin-bottom: 20px;">
          In the meantime, feel free to reach out on any of my social platforms or check out my latest projects on GitHub.
        </p>

        <div style="background: linear-gradient(135deg, #d65c42 0%, #3b5bdb 100%); padding: 2px; border-radius: 8px;">
          <div style="background: white; padding: 15px; border-radius: 6px; text-align: center;">
            <p style="color: #0a0a0a; margin: 0; font-weight: 600;">Let's build something amazing together</p>
          </div>
        </div>

        <p style="color: #6b6b6b; font-size: 12px; margin-top: 20px; text-align: center;">
          Edrean Ochieng • Full-Stack Engineer • Nairobi, Kenya
        </p>
      </div>
    `,
    text: `
Thanks for reaching out, ${userName}!

I've received your message and will get back to you as soon as possible. I typically respond within 24-48 hours.

In the meantime, feel free to reach out on any of my social platforms or check out my latest projects on GitHub.

Let's build something amazing together.

Edrean Ochieng
Full-Stack Engineer
Nairobi, Kenya
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Confirmation email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Confirmation email error:', error);
    // Don't throw - this shouldn't block the main submission
    return { success: false, error: error.message };
  }
};
