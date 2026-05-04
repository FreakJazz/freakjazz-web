import type { VercelRequest, VercelResponse } from '@vercel/node';
import Mailjet from 'node-mailjet';

// ----------------------------------------------------------------------
// Contact Form API Handler
// ----------------------------------------------------------------------

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, subject, message }: ContactFormData = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Initialize Mailjet
    const mailjet = new Mailjet({
      apiKey: process.env.MAILJET_API_KEY || process.env.VITE_MAILJET_API_KEY,
      apiSecret: process.env.MAILJET_API_SECRET || process.env.VITE_MAILJET_API_SECRET,
    });

    const senderEmail =
      process.env.MAILJET_SENDER_EMAIL ||
      process.env.VITE_MAILJET_SENDER_EMAIL ||
      'noreply@freakjazz.com';
    const senderName =
      process.env.MAILJET_SENDER_NAME ||
      process.env.VITE_MAILJET_SENDER_NAME ||
      'FreakJazz Development';
    const companyEmail =
      process.env.COMPANY_EMAIL || process.env.VITE_COMPANY_EMAIL || 'contact@freakjazz.com';
    const appUrl = process.env.APP_URL || process.env.VITE_APP_URL || 'https://freakjazz.com';

    // Email template for company
    const companyEmailHtml = getContactCompanyEmailTemplate(
      { name, email, subject, message },
      { appUrl }
    );

    // Email template for client
    const clientEmailHtml = getContactClientEmailTemplate({ name }, { appUrl });

    // Send both emails
    await mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: senderEmail,
            Name: senderName,
          },
          To: [
            {
              Email: companyEmail,
              Name: 'FreakJazz Team',
            },
          ],
          Subject: `New Contact: ${subject}`,
          HTMLPart: companyEmailHtml,
        },
        {
          From: {
            Email: senderEmail,
            Name: senderName,
          },
          To: [
            {
              Email: email,
              Name: name,
            },
          ],
          Subject: 'Thank you for contacting us!',
          HTMLPart: clientEmailHtml,
        },
      ],
    });

    return res.status(200).json({ success: true, message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}

// ----------------------------------------------------------------------
// Email Templates
// ----------------------------------------------------------------------

const BRAND_COLOR = '#078DEE';
const BRAND_COLOR_DARK = '#0351AB';
const TEXT_COLOR = '#1C252E';
const LIGHT_BG = '#F9FAFB';

const baseStyle = `
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    background-color: #f4f6f8;
  }
  .email-container {
    max-width: 600px;
    margin: 0 auto;
    background-color: #ffffff;
  }
  .header {
    background: linear-gradient(135deg, ${BRAND_COLOR} 0%, ${BRAND_COLOR_DARK} 100%);
    padding: 40px 30px;
    text-align: center;
  }
  .logo {
    width: 60px;
    height: 60px;
    margin: 0 auto;
    background: white;
    border-radius: 12px;
  }
  .content {
    padding: 40px 30px;
    color: ${TEXT_COLOR};
  }
  .footer {
    background-color: ${LIGHT_BG};
    padding: 30px;
    text-align: center;
    font-size: 14px;
    color: #637381;
  }
  .button {
    display: inline-block;
    padding: 12px 24px;
    background-color: ${BRAND_COLOR};
    color: #ffffff;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 600;
    margin: 20px 0;
  }
  .info-box {
    background-color: ${LIGHT_BG};
    padding: 20px;
    border-radius: 8px;
    margin: 20px 0;
    border-left: 4px solid ${BRAND_COLOR};
  }
  .info-row {
    margin: 10px 0;
    padding: 8px 0;
    border-bottom: 1px solid #e0e0e0;
  }
  .info-label {
    font-weight: 600;
    color: #637381;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .info-value {
    color: ${TEXT_COLOR};
    margin-top: 4px;
    font-size: 16px;
  }
  h1 {
    color: #ffffff;
    margin: 15px 0 0 0;
    font-size: 28px;
  }
  h2 {
    color: ${TEXT_COLOR};
    margin: 0 0 20px 0;
    font-size: 24px;
  }
  p {
    line-height: 1.6;
    margin: 15px 0;
    font-size: 16px;
  }
`;

function getBaseTemplate(content: string, appUrl: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>${baseStyle}</style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <div class="logo"></div>
      <h1>FreakJazz Development</h1>
    </div>
    <div class="content">
      ${content}
    </div>
    <div class="footer">
      <p>© ${new Date().getFullYear()} FreakJazz Development. All rights reserved.</p>
      <p>
        <a href="${appUrl}" style="color: ${BRAND_COLOR}; text-decoration: none;">Visit our website</a>
      </p>
    </div>
  </div>
</body>
</html>
  `;
}

function getContactCompanyEmailTemplate(data: ContactFormData, config: { appUrl: string }): string {
  const content = `
    <h2>🔔 New Contact Form Submission</h2>
    <p>You have received a new message through your contact form.</p>
    
    <div class="info-box">
      <div class="info-row">
        <div class="info-label">From</div>
        <div class="info-value">${data.name}</div>
      </div>
      <div class="info-row">
        <div class="info-label">Email</div>
        <div class="info-value"><a href="mailto:${data.email}" style="color: ${BRAND_COLOR};">${data.email}</a></div>
      </div>
      <div class="info-row">
        <div class="info-label">Subject</div>
        <div class="info-value">${data.subject}</div>
      </div>
      <div class="info-row">
        <div class="info-label">Message</div>
        <div class="info-value" style="white-space: pre-wrap;">${data.message}</div>
      </div>
    </div>
    
    <a href="mailto:${data.email}" class="button">Reply to ${data.name}</a>
  `;

  return getBaseTemplate(content, config.appUrl);
}

function getContactClientEmailTemplate(data: { name: string }, config: { appUrl: string }): string {
  const content = `
    <h2>✅ Thank You for Contacting Us!</h2>
    <p>Hi <strong>${data.name}</strong>,</p>
    <p>Thank you for reaching out! We have received your message and will get back to you as soon as possible.</p>
    <p>Our team typically responds within <strong>24-48 hours</strong> during business days.</p>
    
    <div class="info-box">
      <p style="margin: 0;">
        <strong>💡 In the meantime:</strong><br>
        Feel free to explore our portfolio and learn more about our services.
      </p>
    </div>
    
    <a href="${config.appUrl}/projects" class="button">View Our Projects</a>
    
    <p>Best regards,<br><strong>FreakJazz Development Team</strong></p>
  `;

  return getBaseTemplate(content, config.appUrl);
}
