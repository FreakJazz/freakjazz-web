/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Mailjet Configuration
  readonly VITE_MAILJET_API_KEY: string;
  readonly VITE_MAILJET_API_SECRET: string;
  readonly VITE_MAILJET_SENDER_EMAIL: string;
  readonly VITE_MAILJET_SENDER_NAME: string;
  readonly VITE_COMPANY_EMAIL: string;
  readonly VITE_COMPANY_NAME: string;

  // Application Configuration
  readonly VITE_APP_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
