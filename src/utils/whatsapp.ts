export const WHATSAPP_NUMBER = '593983551848'; // international format, digits only
export const WHATSAPP_DISPLAY = '+593 98 355 1848';

const MESSAGES = {
  es: 'Hola Jazmin, vi tu portafolio y me gustaría conversar sobre un proyecto.',
  en: "Hi Jazmin, I saw your portfolio and I'd like to talk about a project.",
};

/** wa.me link with a prefilled message in the visitor's language. */
export function getWhatsAppUrl(lang: string) {
  const text = MESSAGES[lang === 'en' ? 'en' : 'es'];
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
