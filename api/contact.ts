import type { VercelRequest, VercelResponse } from '@vercel/node';

import Mailjet from 'node-mailjet';

// ----------------------------------------------------------------------
// Contact Form API Handler
// Sends TWO emails per submission:
//   1. To the visitor  -> confirmation, in the language of the site they used
//   2. To the owner    -> notification (always Spanish) with all the details
// ----------------------------------------------------------------------

type Lang = 'es' | 'en';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
  lang?: Lang;
}

/** Mailbox that receives the contact notifications. */
const OWNER_EMAIL = process.env.CONTACT_NOTIFY_EMAIL || 'jazzrb2307@gmail.com';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, subject, message, phone, lang: rawLang }: ContactFormData = req.body;
    const lang: Lang = rawLang === 'en' ? 'en' : 'es';

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
      process.env.MAILJET_SENDER_NAME || process.env.VITE_MAILJET_SENDER_NAME || 'Jazmin Rodriguez';
    const appUrl = process.env.APP_URL || process.env.VITE_APP_URL || 'https://freakjazz.com';

    const data = { name, email, subject, message, phone };

    await mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        // 1) Visitor: "we will contact you soon"
        {
          From: { Email: senderEmail, Name: senderName },
          To: [{ Email: email, Name: name }],
          ReplyTo: { Email: OWNER_EMAIL, Name: 'Jazmin Rodriguez' },
          Subject: COPY[lang].clientSubject,
          HTMLPart: getClientEmail(data, { appUrl, lang }),
        },
        // 2) Owner: new contact notification
        {
          From: { Email: senderEmail, Name: senderName },
          To: [{ Email: OWNER_EMAIL, Name: 'Jazmin Rodriguez' }],
          ReplyTo: { Email: email, Name: name },
          Subject: `🔔 Nuevo contacto (${lang.toUpperCase()}): ${subject}`,
          HTMLPart: getOwnerEmail(data, { appUrl, visitorLang: lang }),
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
// Helpers
// ----------------------------------------------------------------------

const BRAND = '#078DEE';
const BRAND_DARK = '#0351AB';
const ACCENT = '#7C3AED';
const TEXT = '#1C252E';
const MUTED = '#637381';
const SOFT_BG = '#F4F6F8';

const esc = (value: string = ''): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const LINKS = {
  linkedin: 'https://www.linkedin.com/in/jazmin-rodriguez-bermeo/',
  github: 'https://github.com/FreakJazz',
  medium: 'https://medium.com/@jazzrb2307',
};

type Step = { icon: string; title: string; text: string; done?: boolean };

const COPY = {
  es: {
    clientSubject: '✅ ¡Recibí tu mensaje! Pronto me pondré en contacto contigo',
    preheader: 'Recibí tu mensaje y pronto me pondré en contacto contigo.',
    heroTitle: (name: string) => `¡Gracias por escribirme, ${name}!`,
    heroSubtitle: 'Recibí tu mensaje y pronto me pondré en contacto contigo.',
    intro:
      'Me encanta saber de personas con ideas y proyectos. Revisaré tu mensaje con calma para darte una respuesta útil.',
    stepsTitle: 'Qué sigue',
    steps: [
      { icon: '✅', title: 'Mensaje recibido', text: 'Ya está en mi bandeja.', done: true },
      { icon: '👀', title: 'Revisión', text: 'Analizo lo que necesitas.' },
      { icon: '💬', title: 'Te contacto', text: 'Normalmente en 24 a 48 horas hábiles.' },
    ] as Step[],
    yourMessage: 'Tu mensaje',
    subjectLabel: 'Asunto',
    explore: 'Mientras tanto, conoce más de mi trabajo',
    btnProjects: '🚀 Ver proyectos',
    btnAbout: '👩‍💻 Sobre mí',
    followMe: 'Sígueme',
    regards: 'Un abrazo,',
    role: 'Senior Software Engineer · .NET, Python, IA',
    rights: 'Todos los derechos reservados.',
    notYou: '¿No enviaste este mensaje? Puedes ignorar este correo.',
  },
  en: {
    clientSubject: "✅ I got your message! I'll be in touch soon",
    preheader: "I received your message and I'll get in touch with you soon.",
    heroTitle: (name: string) => `Thanks for reaching out, ${name}!`,
    heroSubtitle: "I received your message and I'll get in touch with you soon.",
    intro:
      'I love hearing from people with ideas and projects. I will review your message carefully so I can give you a useful answer.',
    stepsTitle: "What's next",
    steps: [
      { icon: '✅', title: 'Message received', text: "It's already in my inbox.", done: true },
      { icon: '👀', title: 'Review', text: 'I look into what you need.' },
      { icon: '💬', title: "I'll contact you", text: 'Usually within 24-48 business hours.' },
    ] as Step[],
    yourMessage: 'Your message',
    subjectLabel: 'Subject',
    explore: 'Meanwhile, get to know my work',
    btnProjects: '🚀 View projects',
    btnAbout: '👩‍💻 About me',
    followMe: 'Follow me',
    regards: 'Warm regards,',
    role: 'Senior Software Engineer · .NET, Python, AI',
    rights: 'All rights reserved.',
    notYou: "Didn't send this message? You can safely ignore this email.",
  },
};

function button(href: string, label: string, primary = true): string {
  const style = primary
    ? `background:linear-gradient(135deg,${BRAND} 0%,${ACCENT} 100%);background-color:${BRAND};color:#ffffff;`
    : `background:#ffffff;color:${BRAND_DARK};border:2px solid ${BRAND};`;
  return `<a href="${href}" style="display:inline-block;padding:14px 26px;margin:6px;border-radius:999px;font-weight:700;font-size:15px;text-decoration:none;${style}">${label}</a>`;
}

function socialRow(lang: Lang): string {
  const items = [
    ['LinkedIn', LINKS.linkedin],
    ['GitHub', LINKS.github],
    ['Medium', LINKS.medium],
  ];
  return `
    <p style="margin:0 0 10px;color:${MUTED};font-size:13px;letter-spacing:1px;text-transform:uppercase;">${COPY[lang].followMe}</p>
    ${items
      .map(
        ([label, url]) =>
          `<a href="${url}" style="display:inline-block;margin:0 5px;padding:8px 16px;border-radius:999px;background:#ffffff;color:${BRAND_DARK};font-size:13px;font-weight:700;text-decoration:none;border:1px solid #dfe3e8;">${label}</a>`
      )
      .join('')}`;
}

type LayoutOptions = {
  lang: Lang;
  appUrl: string;
  preheader: string;
  emoji: string;
  title: string;
  subtitle: string;
  body: string;
  footerExtra?: string;
};

/** Table-based layout with inline styles so it renders well in Gmail, Outlook and mobile clients. */
function layout({ lang, appUrl, preheader, emoji, title, subtitle, body, footerExtra }: LayoutOptions): string {
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(title)}</title>
</head>
<body style="margin:0;padding:0;background:${SOFT_BG};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${esc(preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${SOFT_BG};padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:620px;background:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 12px 40px rgba(3,81,171,0.15);">

        <!-- Hero -->
        <tr><td align="center" style="background:linear-gradient(135deg,${BRAND_DARK} 0%,${BRAND} 55%,${ACCENT} 100%);background-color:${BRAND};padding:44px 30px 38px;">
          <table role="presentation" cellpadding="0" cellspacing="0"><tr>
            <td align="center" style="width:64px;height:64px;border-radius:18px;background:#ffffff;color:${BRAND_DARK};font-size:26px;font-weight:800;letter-spacing:-1px;">FJ</td>
          </tr></table>
          <div style="font-size:46px;line-height:1;margin:22px 0 10px;">${emoji}</div>
          <h1 style="margin:0;color:#ffffff;font-size:28px;line-height:1.25;font-weight:800;">${title}</h1>
          <p style="margin:12px auto 0;max-width:440px;color:rgba(255,255,255,0.9);font-size:16px;line-height:1.6;">${subtitle}</p>
        </td></tr>

        <!-- Body -->
        <tr><td style="padding:34px 30px 10px;color:${TEXT};font-size:16px;line-height:1.7;">
          ${body}
        </td></tr>

        <!-- Footer -->
        <tr><td align="center" style="background:${SOFT_BG};padding:26px 30px;color:${MUTED};font-size:13px;line-height:1.7;">
          ${footerExtra ?? ''}
          <p style="margin:14px 0 0;">© ${new Date().getFullYear()} FreakJazz · Jazmin Rodriguez. ${COPY[lang].rights}</p>
          <p style="margin:4px 0 0;"><a href="${appUrl}" style="color:${BRAND};text-decoration:none;font-weight:600;">freakjazz.com</a></p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ----------------------------------------------------------------------
// Email 1: to the visitor (ES / EN)
// ----------------------------------------------------------------------

function getClientEmail(
  data: ContactFormData,
  config: { appUrl: string; lang: Lang }
): string {
  const c = COPY[config.lang];

  const steps = c.steps
    .map(
      (step) => `
      <tr>
        <td width="44" valign="top" style="padding:10px 0;">
          <div style="width:36px;height:36px;line-height:36px;text-align:center;border-radius:50%;font-size:17px;background:${step.done ? '#E6F7EE' : '#EAF4FE'};">${step.icon}</div>
        </td>
        <td valign="top" style="padding:10px 0 10px 8px;">
          <div style="font-weight:700;color:${TEXT};">${step.title}</div>
          <div style="color:${MUTED};font-size:14px;">${step.text}</div>
        </td>
      </tr>`
    )
    .join('');

  const body = `
    <p style="margin:0 0 22px;">${c.intro}</p>

    <h2 style="margin:26px 0 8px;font-size:18px;color:${TEXT};">${c.stepsTitle}</h2>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${steps}</table>

    <div style="margin:26px 0;padding:20px 22px;border-radius:16px;background:${SOFT_BG};border-left:5px solid ${BRAND};">
      <div style="font-size:12px;letter-spacing:1px;text-transform:uppercase;color:${MUTED};font-weight:700;">${c.yourMessage}</div>
      <div style="margin-top:8px;font-weight:700;">${c.subjectLabel}: <span style="font-weight:500;">${esc(data.subject)}</span></div>
      <div style="margin-top:8px;color:#454F5B;white-space:pre-wrap;">${esc(data.message)}</div>
    </div>

    <div style="text-align:center;margin:30px 0 8px;">
      <p style="margin:0 0 10px;font-weight:700;">${c.explore}</p>
      ${button(`${config.appUrl}/projects`, c.btnProjects)}
      ${button(`${config.appUrl}/about`, c.btnAbout, false)}
    </div>

    <div style="text-align:center;margin:26px 0 8px;">${socialRow(config.lang)}</div>

    <p style="margin:30px 0 4px;">${c.regards}</p>
    <p style="margin:0 0 20px;"><strong style="color:${BRAND_DARK};font-size:18px;">Jazmin Rodriguez</strong><br><span style="color:${MUTED};font-size:14px;">${c.role}</span></p>
  `;

  return layout({
    lang: config.lang,
    appUrl: config.appUrl,
    preheader: c.preheader,
    emoji: '🎉',
    title: esc(c.heroTitle(data.name)),
    subtitle: c.heroSubtitle,
    body,
    footerExtra: `<p style="margin:0;">${c.notYou}</p>`,
  });
}

// ----------------------------------------------------------------------
// Email 2: to the owner (always Spanish)
// ----------------------------------------------------------------------

function row(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #EDEFF2;">
        <div style="font-size:12px;letter-spacing:1px;text-transform:uppercase;color:${MUTED};font-weight:700;">${label}</div>
        <div style="margin-top:4px;font-size:16px;color:${TEXT};">${value}</div>
      </td>
    </tr>`;
}

function getOwnerEmail(
  data: ContactFormData,
  config: { appUrl: string; visitorLang: Lang }
): string {
  const lang: Lang = 'es';
  const phoneDigits = (data.phone || '').replace(/[^\d]/g, '');

  const body = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${row('De', esc(data.name))}
      ${row('Correo', `<a href="mailto:${esc(data.email)}" style="color:${BRAND};font-weight:600;">${esc(data.email)}</a>`)}
      ${data.phone ? row('Teléfono', `<a href="tel:${esc(data.phone.replace(/\s/g, ''))}" style="color:${BRAND};font-weight:600;">${esc(data.phone)}</a>`) : ''}
      ${row('Idioma del visitante', config.visitorLang === 'en' ? '🇬🇧 Inglés (EN)' : '🇪🇨 Español (ES)')}
      ${row('Asunto', `<strong>${esc(data.subject)}</strong>`)}
    </table>

    <div style="margin:24px 0;padding:20px 22px;border-radius:16px;background:${SOFT_BG};border-left:5px solid ${ACCENT};">
      <div style="font-size:12px;letter-spacing:1px;text-transform:uppercase;color:${MUTED};font-weight:700;">Mensaje</div>
      <div style="margin-top:8px;white-space:pre-wrap;color:#454F5B;">${esc(data.message)}</div>
    </div>

    <div style="text-align:center;margin:28px 0 10px;">
      ${button(`mailto:${esc(data.email)}?subject=${encodeURIComponent(`Re: ${data.subject}`)}`, `✉️ Responder a ${esc(data.name)}`)}
      ${phoneDigits ? button(`https://wa.me/${phoneDigits}`, '💬 WhatsApp', false) : ''}
    </div>
  `;

  return layout({
    lang,
    appUrl: config.appUrl,
    preheader: `${data.name}: ${data.subject}`,
    emoji: '🔔',
    title: 'Nuevo mensaje de contacto',
    subtitle: `${esc(data.name)} te escribió desde freakjazz.com`,
    body,
    footerExtra: '<p style="margin:0;">Puedes responder directamente a este correo: llegará al visitante.</p>',
  });
}
