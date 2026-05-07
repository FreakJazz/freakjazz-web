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
}: SeoHeadProps) {
  // Full title with site name
  const fullTitle = title ? `${title} | FreakJazz` : DEFAULT_TITLE;

  // Canonical URL
  const canonicalUrl = url || DEFAULT_URL;

  // Robots meta
  const robotsContent = [noindex ? 'noindex' : 'index', nofollow ? 'nofollow' : 'follow'].join(
    ', '
  );

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content={robotsContent} />
      <link rel="canonical" href={canonicalUrl} />

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
      <meta property="og:locale" content="es_EC" />
      <meta property="og:locale:alternate" content="en_US" />

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
      <meta name="language" content="Spanish" />
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

// ============================================================================
// Predefined SEO Configurations
// ============================================================================

export const SEO_CONFIGS = {
  home: {
    title: 'Jazmin Rodriguez | Senior Full Stack Developer Ecuador',
    description: DEFAULT_DESCRIPTION,
    keywords: DEFAULT_KEYWORDS,
    type: 'profile' as const,
  },

  quote: {
    title: 'Hire Jazmin Rodriguez | Freelance Developer | Get Quote',
    description:
      "Looking for a senior full stack developer? I'm available for your project. .NET, Python, React, AWS. Hourly rate: $15-25. Request a quote now.",
    keywords:
      'hire developer Ecuador, freelance developer quote, software development cost, developer hourly rate, .NET developer hire, React developer hire',
    url: 'https://freakjazz.com/cotizacion',
  },

  about: {
    title: 'About Jazmin Rodriguez | Senior Software Engineer',
    description:
      "Senior Software Engineer with Master's degree and 5+ years of experience. Expert in .NET Core, Python, React, microservices, and cloud architecture (AWS, Azure).",
    keywords:
      'software engineer Ecuador, full stack developer profile, .NET expert, Python developer, React specialist, cloud architect',
    url: 'https://freakjazz.com/about-us',
    type: 'profile' as const,
  },

  contact: {
    title: 'Contact Jazmin Rodriguez | Available for Freelance Work',
    description:
      'Get in touch to discuss your project. Available for freelance development work. Quick response guaranteed. Ecuador-based, working with clients worldwide.',
    keywords:
      'contact developer, hire freelance developer, software developer contact, developer availability',
    url: 'https://freakjazz.com/contact-us',
  },
} as const;
