import { Helmet } from 'react-helmet-async';

// ============================================================================
// Types
// ============================================================================

interface SeoHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'profile' | 'article';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
  nofollow?: boolean;
  lang?: 'en' | 'es'; // Current language
}

// ============================================================================
// Default Values
// ============================================================================

const DEFAULT_TITLE = 'Jazmin Rodriguez | Senior Full Stack Developer Ecuador | $15-25/hr';
const DEFAULT_DESCRIPTION =
  'Senior Software Engineer with 5+ years experience. Specialized in .NET Core, Python, React, AWS. Available for freelance projects. Hourly rate: $15-25 USD. Ecuador.';
const DEFAULT_KEYWORDS =
  'desarrolladora full stack Ecuador, senior software engineer freelance, .NET Python React developer, freelance developer available, software developer hourly rate';
const DEFAULT_IMAGE = 'https://freakjazz.com/og-image-developer.jpg';
const DEFAULT_URL = 'https://freakjazz.com';
const DEFAULT_AUTHOR = 'Jazmin Rodriguez';

// ============================================================================
// Component
// ============================================================================

export function SeoHead({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  image = DEFAULT_IMAGE,
  url = DEFAULT_URL,
  type = 'website',
  author = DEFAULT_AUTHOR,
  publishedTime,
  modifiedTime,
  noindex = false,
  nofollow = false,
  lang = 'en', // Default to English
}: SeoHeadProps) {
  // Full title with site name
  const fullTitle = title ? `${title} | FreakJazz` : DEFAULT_TITLE;

  // Canonical URL
  const canonicalUrl = url || DEFAULT_URL;

  // Robots meta
  const robotsContent = [noindex ? 'noindex' : 'index', nofollow ? 'nofollow' : 'follow'].join(
    ', '
  );

  // Language and locale mapping
  const localeMap = {
    en: 'en_US',
    es: 'es_EC',
  };
  const currentLocale = localeMap[lang];
  const alternateLocale = lang === 'en' ? localeMap.es : localeMap.en;

  // Hreflang: the site serves both languages from the same URL (language toggle)
  const baseUrl = 'https://freakjazz.com';
  const hreflangs = {
    en: canonicalUrl || baseUrl,
    es: canonicalUrl || baseUrl,
    'x-default': baseUrl,
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <html lang={lang} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content={robotsContent} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Hreflang Tags for Multilingual SEO */}
      <link rel="alternate" hrefLang="en" href={hreflangs.en} />
      <link rel="alternate" hrefLang="es" href={hreflangs.es} />
      <link rel="alternate" hrefLang="x-default" href={hreflangs['x-default']} />

      {/* Google Search Console Verification */}
      {import.meta.env.VITE_GOOGLE_SITE_VERIFICATION && (
        <meta
          name="google-site-verification"
          content={import.meta.env.VITE_GOOGLE_SITE_VERIFICATION}
        />
      )}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title || DEFAULT_TITLE} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="FreakJazz" />
      <meta property="og:locale" content={currentLocale} />
      <meta property="og:locale:alternate" content={alternateLocale} />

      {/* Profile specific (if type is profile) */}
      {type === 'profile' && (
        <>
          <meta property="profile:first_name" content="Jazmin" />
          <meta property="profile:last_name" content="Rodriguez" />
          <meta property="profile:username" content="freakjazz" />
        </>
      )}

      {/* Article specific (if type is article) */}
      {type === 'article' && (
        <>
          {author && <meta property="article:author" content={author} />}
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
        </>
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title || DEFAULT_TITLE} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@freakjazz" />

      {/* Additional SEO Tags */}
      <meta name="language" content={lang === 'es' ? 'Spanish' : 'English'} />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />

      {/* Geo Tags */}
      <meta name="geo.region" content="EC" />
      <meta name="geo.placename" content="Ecuador" />

      {/* Mobile */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="FreakJazz" />

      {/* Theme Color */}
      <meta name="theme-color" content="#078DEE" />
      <meta name="msapplication-TileColor" content="#078DEE" />
    </Helmet>
  );
}
