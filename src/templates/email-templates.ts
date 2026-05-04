// ----------------------------------------------------------------------
// Email Template Generator
// ----------------------------------------------------------------------

const BRAND_COLOR = '#078DEE';
const BRAND_COLOR_DARK = '#0351AB';
const TEXT_COLOR = '#1C252E';
const LIGHT_BG = '#F9FAFB';

interface EmailTemplateProps {
  logoUrl?: string;
  appUrl: string;
}

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

function getEmailTemplate({ logoUrl, appUrl }: EmailTemplateProps, content: string): string {
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
      ${
        logoUrl
          ? `<img src="${logoUrl}" alt="Logo" class="logo">`
          : '<div class="logo" style="width: 60px; height: 60px; background: white; border-radius: 12px; margin: 0 auto;"></div>'
      }
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

// ----------------------------------------------------------------------
// Contact Form - Company Email
// ----------------------------------------------------------------------

export function getContactCompanyEmail(
  data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  },
  config: EmailTemplateProps
): string {
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

  return getEmailTemplate(config, content);
}

// ----------------------------------------------------------------------
// Contact Form - Client Confirmation Email
// ----------------------------------------------------------------------

export function getContactClientEmail(
  data: {
    name: string;
  },
  config: EmailTemplateProps
): string {
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

  return getEmailTemplate(config, content);
}

// ----------------------------------------------------------------------
// Quote Form - Company Email
// ----------------------------------------------------------------------

export function getQuoteCompanyEmail(
  data: {
    projectType: string;
    technologies: string[];
    timeline: string;
    budget: string;
    description: string;
    name: string;
    email: string;
    phone: string;
    company?: string;
    requirements?: string;
  },
  config: EmailTemplateProps
): string {
  const content = `
    <h2>💼 New Quote Request</h2>
    <p>A new client has requested a project quote through your website.</p>
    
    <div class="info-box">
      <h3 style="margin-top: 0; color: ${BRAND_COLOR};">📋 Project Details</h3>
      <div class="info-row">
        <div class="info-label">Project Type</div>
        <div class="info-value">${data.projectType === 'complex' ? 'Complex System' : 'Simple Website'}</div>
      </div>
      <div class="info-row">
        <div class="info-label">Technologies</div>
        <div class="info-value">${data.technologies.join(', ')}</div>
      </div>
      <div class="info-row">
        <div class="info-label">Timeline</div>
        <div class="info-value">${data.timeline} months</div>
      </div>
      <div class="info-row">
        <div class="info-label">Budget Range</div>
        <div class="info-value">$${data.budget}k USD</div>
      </div>
      <div class="info-row">
        <div class="info-label">Description</div>
        <div class="info-value" style="white-space: pre-wrap;">${data.description}</div>
      </div>
      ${
        data.requirements
          ? `
      <div class="info-row">
        <div class="info-label">Additional Requirements</div>
        <div class="info-value" style="white-space: pre-wrap;">${data.requirements}</div>
      </div>
      `
          : ''
      }
    </div>
    
    <div class="info-box">
      <h3 style="margin-top: 0; color: ${BRAND_COLOR};">👤 Contact Information</h3>
      <div class="info-row">
        <div class="info-label">Name</div>
        <div class="info-value">${data.name}</div>
      </div>
      <div class="info-row">
        <div class="info-label">Email</div>
        <div class="info-value"><a href="mailto:${data.email}" style="color: ${BRAND_COLOR};">${data.email}</a></div>
      </div>
      <div class="info-row">
        <div class="info-label">Phone</div>
        <div class="info-value"><a href="tel:${data.phone}" style="color: ${BRAND_COLOR};">${data.phone}</a></div>
      </div>
      ${
        data.company
          ? `
      <div class="info-row">
        <div class="info-label">Company</div>
        <div class="info-value">${data.company}</div>
      </div>
      `
          : ''
      }
    </div>
    
    <a href="mailto:${data.email}" class="button">Respond to Quote Request</a>
  `;

  return getEmailTemplate(config, content);
}

// ----------------------------------------------------------------------
// Quote Form - Client Confirmation Email
// ----------------------------------------------------------------------

export function getQuoteClientEmail(
  data: {
    name: string;
    projectType: string;
  },
  config: EmailTemplateProps
): string {
  const content = `
    <h2>🎉 Quote Request Received!</h2>
    <p>Hi <strong>${data.name}</strong>,</p>
    <p>Thank you for your interest in working with us! We have received your quote request for a <strong>${data.projectType === 'complex' ? 'Complex System' : 'Simple Website'}</strong>.</p>
    
    <div class="info-box">
      <p style="margin: 0;">
        <strong>📌 What's Next?</strong><br>
        Our team will carefully review your project requirements and prepare a detailed quote for you.
      </p>
    </div>
    
    <p><strong>Timeline:</strong></p>
    <ul style="line-height: 1.8;">
      <li>Initial review: <strong>24 hours</strong></li>
      <li>Detailed quote: <strong>2-3 business days</strong></li>
      <li>Project kickoff: After agreement</li>
    </ul>
    
    <p>We're excited about the possibility of working together on your project!</p>
    
    <a href="${config.appUrl}/projects" class="button">View Similar Projects</a>
    
    <p>Best regards,<br><strong>FreakJazz Development Team</strong></p>
  `;

  return getEmailTemplate(config, content);
}
