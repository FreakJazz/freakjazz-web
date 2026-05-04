// ----------------------------------------------------------------------
// Email Configuration
// ----------------------------------------------------------------------

export const emailConfig = {
  mailjet: {
    apiKey: import.meta.env.VITE_MAILJET_API_KEY || '',
    apiSecret: import.meta.env.VITE_MAILJET_API_SECRET || '',
  },
  sender: {
    email: import.meta.env.VITE_MAILJET_SENDER_EMAIL || 'noreply@freakjazz.com',
    name: import.meta.env.VITE_MAILJET_SENDER_NAME || 'FreakJazz Development',
  },
  company: {
    email: import.meta.env.VITE_COMPANY_EMAIL || 'contact@freakjazz.com',
    name: import.meta.env.VITE_COMPANY_NAME || 'FreakJazz Development',
  },
  app: {
    url: import.meta.env.VITE_APP_URL || 'https://freakjazz.com',
  },
} as const;
