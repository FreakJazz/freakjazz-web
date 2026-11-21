// CV PDFs are stored in Firebase Storage. /cv/es and /cv/en are same-origin proxies to them
// (see vercel.json and vite.config.ts), so the browser honors the `download` filename.

export type CvLang = 'es' | 'en';

/** Returns the CV url and a download name like "Jazmin-Rodriguez-CV-ES-2026-11-20.pdf". */
export function getCvDownload(lang: string) {
  const code: CvLang = lang === 'en' ? 'en' : 'es';

  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');

  return {
    url: `/cv/${code}`,
    filename: `Jazmin-Rodriguez-CV-${code.toUpperCase()}-${yyyy}-${mm}-${dd}.pdf`,
  };
}
