import type { VercelRequest, VercelResponse } from '@vercel/node';
import Mailjet from 'node-mailjet';

// ----------------------------------------------------------------------
// Quote Form API Handler
// ----------------------------------------------------------------------

interface QuoteFormDetailedData {
  // BLOQUE 1: Datos del cliente
  companyName: string;
  ruc?: string;
  contactName: string;
  email: string;
  phone: string;
  location: string;

  // BLOQUE 2: Objetivo del proyecto
  projectGoals: string[];
  otherGoal?: string;

  // BLOQUE 3: Tipo de solución
  solutionType: string;

  // BLOQUE 4: Detalle de la solución
  webAppType?: string;
  mobileplatforms?: string[];
  systemType?: string;

  // BLOQUE 5: Funcionalidades
  features: string[];

  // BLOQUE 6: Roles del sistema
  hasRoles: string;
  roles?: string;

  // BLOQUE 7: Diseño y experiencia
  hasDesign: string;
  needsPrototype: string;
  visualStyle: string;

  // BLOQUE 8: Requerimientos técnicos
  needsCloud: string;
  securityLevel: string;
  needsIntegrations: string;
  integrations?: string;

  // BLOQUE 9: Tiempo y presupuesto
  timeline: string;
  budget: string;

  // BLOQUE 10: Soporte y continuidad
  needsSupport: string;

  // BLOQUE 11: Comentarios finales
  additionalComments?: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data: QuoteFormDetailedData = req.body;

    // Validate required fields
    if (
      !data.companyName ||
      !data.contactName ||
      !data.email ||
      !data.phone ||
      !data.location ||
      !data.projectGoals ||
      data.projectGoals.length === 0 ||
      !data.solutionType ||
      !data.features ||
      data.features.length === 0 ||
      !data.hasRoles ||
      !data.hasDesign ||
      !data.needsPrototype ||
      !data.visualStyle ||
      !data.needsCloud ||
      !data.securityLevel ||
      !data.needsIntegrations ||
      !data.timeline ||
      !data.budget ||
      !data.needsSupport
    ) {
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
    const companyEmailHtml = getQuoteCompanyEmailTemplate(data, { appUrl });

    // Email template for client
    const clientEmailHtml = getQuoteClientEmailTemplate(data, { appUrl });

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
          Subject: `🚀 New Detailed Quote Request: ${data.companyName}`,
          HTMLPart: companyEmailHtml,
        },
        {
          From: {
            Email: senderEmail,
            Name: senderName,
          },
          To: [
            {
              Email: data.email,
              Name: data.contactName,
            },
          ],
          Subject: 'Your Project Quote Request Has Been Received! 🎉',
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
  h3 {
    color: ${TEXT_COLOR};
    margin: 0 0 15px 0;
    font-size: 20px;
  }
  p {
    line-height: 1.6;
    margin: 15px 0;
    font-size: 16px;
  }
  ul {
    line-height: 1.8;
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

function getQuoteCompanyEmailTemplate(
  data: QuoteFormDetailedData,
  config: { appUrl: string }
): string {
  // Helper functions for translating values
  const getSolutionTypeName = (type: string) => {
    const types: Record<string, string> = {
      web: 'Web Application',
      mobile: 'Mobile Application',
      desktop: 'Desktop System',
      platform: 'Integrated Platform (web + mobile + others)',
      unsure: 'Not sure (needs consultation)',
    };
    return types[type] || type;
  };

  const getTimelineName = (val: string) => {
    const timelines: Record<string, string> = {
      'less-1': 'Less than 1 month',
      '1-3': '1 to 3 months',
      '3-6': '3 to 6 months',
      '6+': 'More than 6 months',
    };
    return timelines[val] || val;
  };

  const getBudgetName = (val: string) => {
    const budgets: Record<string, string> = {
      'less-1k': 'Less than $1,000',
      '1k-3k': '$1,000 – $3,000',
      '3k-5k': '$3,000 – $5,000',
      '5k-10k': '$5,000 – $10,000',
      '10k+': 'More than $10,000',
    };
    return budgets[val] || val;
  };

  const content = `
    <h2>🚀 New Detailed Quote Request</h2>
    <p style="font-size: 16px; color: #637381;">
      A comprehensive project quote has been submitted. Review all details below to prepare an accurate proposal.
    </p>
    
    <!-- BLOQUE 1: CLIENT INFORMATION -->
    <div class="info-box">
      <h3 style="margin-top: 0; color: ${BRAND_COLOR};">📋 Client Information</h3>
      <div class="info-row">
        <div class="info-label">Company / Project Name</div>
        <div class="info-value">${data.companyName}</div>
      </div>
      ${
        data.ruc
          ? `
      <div class="info-row">
        <div class="info-label">Tax ID / RUC</div>
        <div class="info-value">${data.ruc}</div>
      </div>
      `
          : ''
      }
      <div class="info-row">
        <div class="info-label">Contact Name</div>
        <div class="info-value">${data.contactName}</div>
      </div>
      <div class="info-row">
        <div class="info-label">Email</div>
        <div class="info-value"><a href="mailto:${data.email}" style="color: ${BRAND_COLOR}; text-decoration: none;">${data.email}</a></div>
      </div>
      <div class="info-row">
        <div class="info-label">Phone / WhatsApp</div>
        <div class="info-value"><a href="tel:${data.phone}" style="color: ${BRAND_COLOR}; text-decoration: none;">${data.phone}</a></div>
      </div>
      <div class="info-row">
        <div class="info-label">Location</div>
        <div class="info-value">${data.location}</div>
      </div>
    </div>
    
    <!-- BLOQUE 2: PROJECT GOALS -->
    <div class="info-box">
      <h3 style="margin-top: 0; color: ${BRAND_COLOR};">🎯 Project Goals</h3>
      <div class="info-value">
        <ul style="margin: 5px 0; padding-left: 20px;">
          ${data.projectGoals.map((goal) => `<li>${goal}</li>`).join('')}
        </ul>
      </div>
      ${
        data.otherGoal
          ? `
      <div class="info-row">
        <div class="info-label">Other Goal</div>
        <div class="info-value">${data.otherGoal}</div>
      </div>
      `
          : ''
      }
    </div>
    
    <!-- BLOQUE 3 & 4: SOLUTION TYPE & DETAILS -->
    <div class="info-box">
      <h3 style="margin-top: 0; color: ${BRAND_COLOR};">💡 Solution Type</h3>
      <div class="info-row">
        <div class="info-label">Solution Type</div>
        <div class="info-value">${getSolutionTypeName(data.solutionType)}</div>
      </div>
      ${
        data.webAppType
          ? `
      <div class="info-row">
        <div class="info-label">Web Application Type</div>
        <div class="info-value">${data.webAppType}</div>
      </div>
      `
          : ''
      }
      ${
        data.mobileplatforms && data.mobileplatforms.length > 0
          ? `
      <div class="info-row">
        <div class="info-label">Mobile Platforms</div>
        <div class="info-value">${data.mobileplatforms.join(', ')}</div>
      </div>
      `
          : ''
      }
      ${
        data.systemType
          ? `
      <div class="info-row">
        <div class="info-label">System Type</div>
        <div class="info-value">${data.systemType}</div>
      </div>
      `
          : ''
      }
    </div>
    
    <!-- BLOQUE 5: FEATURES -->
    <div class="info-box">
      <h3 style="margin-top: 0; color: ${BRAND_COLOR};">⚙️ Required Features</h3>
      <div class="info-value">
        <ul style="margin: 5px 0; padding-left: 20px; columns: 2; -webkit-columns: 2; -moz-columns: 2;">
          ${data.features.map((feature) => `<li>${feature}</li>`).join('')}
        </ul>
      </div>
    </div>
    
    <!-- BLOQUE 6: ROLES -->
    <div class="info-box">
      <h3 style="margin-top: 0; color: ${BRAND_COLOR};">👥 User Roles</h3>
      <div class="info-row">
        <div class="info-label">Has Different User Types?</div>
        <div class="info-value">${data.hasRoles}</div>
      </div>
      ${
        data.roles
          ? `
      <div class="info-row">
        <div class="info-label">Main Roles</div>
        <div class="info-value">${data.roles}</div>
      </div>
      `
          : ''
      }
    </div>
    
    <!-- BLOQUE 7: DESIGN & UX -->
    <div class="info-box">
      <h3 style="margin-top: 0; color: ${BRAND_COLOR};">🎨 Design & UX/UI</h3>
      <div class="info-row">
        <div class="info-label">Existing Design/Brand</div>
        <div class="info-value">${data.hasDesign}</div>
      </div>
      <div class="info-row">
        <div class="info-label">Needs Prototype?</div>
        <div class="info-value">${data.needsPrototype}</div>
      </div>
      <div class="info-row">
        <div class="info-label">Visual Style Preference</div>
        <div class="info-value">${data.visualStyle}</div>
      </div>
    </div>
    
    <!-- BLOQUE 8: TECHNICAL REQUIREMENTS -->
    <div class="info-box">
      <h3 style="margin-top: 0; color: ${BRAND_COLOR};">🔧 Technical Requirements</h3>
      <div class="info-row">
        <div class="info-label">Cloud Infrastructure</div>
        <div class="info-value">${data.needsCloud}</div>
      </div>
      <div class="info-row">
        <div class="info-label">Security Level</div>
        <div class="info-value">${data.securityLevel}</div>
      </div>
      <div class="info-row">
        <div class="info-label">External Integrations</div>
        <div class="info-value">${data.needsIntegrations}</div>
      </div>
      ${
        data.integrations
          ? `
      <div class="info-row">
        <div class="info-label">Integration Details</div>
        <div class="info-value">${data.integrations}</div>
      </div>
      `
          : ''
      }
    </div>
    
    <!-- BLOQUE 9: TIMELINE & BUDGET -->
    <div class="info-box" style="background: linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%); border-left: 4px solid #FF9800;">
      <h3 style="margin-top: 0; color: #E65100;">⏱️ Timeline & Budget</h3>
      <div class="info-row">
        <div class="info-label">Estimated Timeline</div>
        <div class="info-value" style="font-size: 18px; font-weight: 600; color: #E65100;">${getTimelineName(data.timeline)}</div>
      </div>
      <div class="info-row">
        <div class="info-label">Estimated Budget</div>
        <div class="info-value" style="font-size: 18px; font-weight: 600; color: #E65100;">${getBudgetName(data.budget)}</div>
      </div>
    </div>
    
    <!-- BLOQUE 10: SUPPORT -->
    <div class="info-box">
      <h3 style="margin-top: 0; color: ${BRAND_COLOR};">🛠️ Post-Development Support</h3>
      <div class="info-row">
        <div class="info-label">Support Plan</div>
        <div class="info-value">${data.needsSupport}</div>
      </div>
    </div>
    
    <!-- BLOQUE 11: ADDITIONAL COMMENTS -->
    ${
      data.additionalComments
        ? `
    <div class="info-box">
      <h3 style="margin-top: 0; color: ${BRAND_COLOR};">💬 Project Description & Additional Comments</h3>
      <div class="info-value" style="white-space: pre-wrap; line-height: 1.8;">${data.additionalComments}</div>
    </div>
    `
        : ''
    }
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="mailto:${data.email}" class="button" style="margin-right: 10px;">✉️ Reply to Client</a>
      <a href="tel:${data.phone}" class="button">📞 Call Client</a>
    </div>
    
    <p style="font-size: 14px; color: #637381; text-align: center; margin-top: 30px;">
      <strong>⚡ Action Items:</strong><br>
      1. Review all requirements thoroughly<br>
      2. Prepare detailed quote and timeline<br>
      3. Schedule discovery call with client<br>
      4. Send proposal within 2-3 business days
    </p>
  `;

  return getBaseTemplate(content, config.appUrl);
}

function getQuoteClientEmailTemplate(
  data: QuoteFormDetailedData,
  config: { appUrl: string }
): string {
  const content = `
    <h2>🎉 Your Quote Request Has Been Received!</h2>
    <p>Hi <strong>${data.contactName}</strong>,</p>
    <p style="font-size: 16px; line-height: 1.8;">
      Thank you for your interest in working with <strong>FreakJazz Development</strong>! 
      We have received your comprehensive quote request for <strong>${data.companyName}</strong>.
    </p>
    
    <div class="info-box" style="background: linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%); border-left: 4px solid ${BRAND_COLOR};">
      <h3 style="margin-top: 0; color: ${BRAND_COLOR_DARK};">📌 What Happens Next?</h3>
      <p style="margin: 0; font-size: 15px; line-height: 1.8;">
        Our development team is already reviewing your detailed requirements. 
        We'll analyze your project goals, technical needs, and budget to prepare the most accurate quote possible.
      </p>
    </div>
    
    <div style="background-color: ${LIGHT_BG}; padding: 25px; border-radius: 8px; margin: 25px 0;">
      <h3 style="color: ${TEXT_COLOR}; margin-top: 0;">⏰ Timeline</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">
            <strong style="color: ${BRAND_COLOR};">✓ Initial Review</strong>
          </td>
          <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0; text-align: right;">
            <strong>Within 24 hours</strong>
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">
            <strong style="color: ${BRAND_COLOR};">✓ Detailed Quote & Proposal</strong>
          </td>
          <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0; text-align: right;">
            <strong>2-3 business days</strong>
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">
            <strong style="color: ${BRAND_COLOR};">✓ Discovery Call (Optional)</strong>
          </td>
          <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0; text-align: right;">
            <strong>Upon request</strong>
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 0;">
            <strong style="color: ${BRAND_COLOR};">✓ Project Kickoff</strong>
          </td>
          <td style="padding: 12px 0; text-align: right;">
            <strong>After agreement</strong>
          </td>
        </tr>
      </table>
    </div>
    
    <div class="info-box">
      <h3 style="margin-top: 0; color: ${BRAND_COLOR};">📋 Your Quote Request Summary</h3>
      <div class="info-row">
        <div class="info-label">Company / Project</div>
        <div class="info-value">${data.companyName}</div>
      </div>
      <div class="info-row">
        <div class="info-label">Solution Type</div>
        <div class="info-value">${data.solutionType}</div>
      </div>
      <div class="info-row">
        <div class="info-label">Estimated Timeline</div>
        <div class="info-value">${data.timeline}</div>
      </div>
      <div class="info-row">
        <div class="info-label">Budget Range</div>
        <div class="info-value">${data.budget}</div>
      </div>
    </div>
    
    <p style="font-size: 16px; line-height: 1.8;">
      <strong>What makes FreakJazz Development different?</strong>
    </p>
    <ul style="line-height: 1.9; font-size: 15px;">
      <li><strong>🎯 Custom Solutions:</strong> We don't use cookie-cutter templates. Every project is tailored to your specific needs.</li>
      <li><strong>💻 Modern Technology:</strong> We use cutting-edge tools and frameworks to build scalable, maintainable applications.</li>
      <li><strong>🤝 Clear Communication:</strong> Regular updates, transparent pricing, and direct access to our development team.</li>
      <li><strong>🚀 Agile Delivery:</strong> Iterative development with frequent demos and your feedback incorporated continuously.</li>
    </ul>
    
    <div style="text-align: center; margin: 35px 0;">
      <a href="${config.appUrl}/projects" class="button" style="margin-right: 10px;">🎨 View Our Work</a>
      <a href="${config.appUrl}/contact" class="button">💬 Message Us</a>
    </div>
    
    <div style="background: linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 100%); padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #9C27B0;">
      <p style="margin: 0; font-size: 15px; line-height: 1.7;">
        <strong style="color: #6A1B9A;">💡 Pro Tip:</strong> 
        While you wait, feel free to explore our portfolio of similar projects. 
        If you have any questions or want to add more details to your request, simply reply to this email!
      </p>
    </div>
    
    <p style="font-size: 16px; line-height: 1.8;">
      We're genuinely excited about the opportunity to work on your project and help bring your vision to life!
    </p>
    
    <p style="font-size: 16px;">
      Best regards,<br>
      <strong style="color: ${BRAND_COLOR};">The FreakJazz Development Team</strong><br>
      <a href="mailto:${process.env.COMPANY_EMAIL || process.env.VITE_COMPANY_EMAIL || 'contact@freakjazz.com'}" style="color: ${BRAND_COLOR}; text-decoration: none;">
        ${process.env.COMPANY_EMAIL || process.env.VITE_COMPANY_EMAIL || 'contact@freakjazz.com'}
      </a>
    </p>
    
    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid ${LIGHT_BG};">
      <p style="font-size: 13px; color: #637381;">
        📧 Didn't request this quote? Please let us know by replying to this email.
      </p>
    </div>
  `;

  return getBaseTemplate(content, config.appUrl);
}
