import { Helmet } from 'react-helmet-async';

// ============================================================================
// Person Schema (Developer Profile)
// ============================================================================

export function PersonSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Jazmin Rodriguez',
    jobTitle: 'Senior Full Stack Developer & Software Trainer',
    description:
      'Senior Full Stack Developer with 5+ years of experience specializing in .NET Core, Python, React, and cloud infrastructure (AWS, Azure). Software development training and mentoring for teams and professionals.',
    url: 'https://freakjazz.com',
    image: 'https://freakjazz.com/profile-jazmin-rodriguez.jpg',
    email: 'contact@freakjazz.com',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'EC',
      addressLocality: 'Ecuador',
    },
    knowsAbout: [
      '.NET Core',
      'Python',
      'React',
      'Next.js',
      'TypeScript',
      'AWS',
      'Azure',
      'Microservices',
      'Docker',
      'Kubernetes',
      'PostgreSQL',
      'SQL Server',
      'MongoDB',
      'Clean Architecture',
      'SOLID Principles',
      'DevOps',
      'CI/CD',
      'Django',
      'FastAPI',
      'Material-UI',
      'Tailwind CSS',
      'Software Training',
      'Developer Mentoring',
      'Capacitación Desarrollo Software',
      'Formación Programadores .NET',
    ],
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: "Master's Degree in Software Engineering",
    },
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Software Engineer',
      occupationLocation: {
        '@type': 'Country',
        name: 'Ecuador',
      },
      estimatedSalary: {
        '@type': 'MonetaryAmountDistribution',
        name: 'Hourly Rate',
        currency: 'USD',
        duration: 'PT1H',
        minValue: 15,
        maxValue: 25,
      },
    },
    knowsLanguage: [
      {
        '@type': 'Language',
        name: 'Spanish',
        alternateName: 'es',
      },
      {
        '@type': 'Language',
        name: 'English',
        alternateName: 'en',
      },
    ],
    sameAs: ['https://www.linkedin.com/in/jazmin-rodriguez-bermeo/', 'https://github.com/freakjazz'],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

// ============================================================================
// Service Schema (Professional Services)
// ============================================================================

export function ServiceSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Software Development Services',
    provider: {
      '@type': 'Person',
      name: 'Jazmin Rodriguez',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Worldwide',
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: 'https://freakjazz.com/cotizacion',
      serviceType: 'Online',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Development Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Full Stack Development',
            description:
              'Complete web application development using .NET Core, Python, React, and Next.js',
          },
          priceSpecification: {
            '@type': 'PriceSpecification',
            price: '15-25',
            priceCurrency: 'USD',
            unitText: 'HOUR',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Backend Development',
            description: '.NET Core and Python backend development with microservices architecture',
          },
          priceSpecification: {
            '@type': 'PriceSpecification',
            price: '15-25',
            priceCurrency: 'USD',
            unitText: 'HOUR',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Frontend Development',
            description: 'React and Next.js frontend development with TypeScript',
          },
          priceSpecification: {
            '@type': 'PriceSpecification',
            price: '15-25',
            priceCurrency: 'USD',
            unitText: 'HOUR',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Cloud Architecture',
            description: 'AWS and Azure cloud infrastructure design and implementation',
          },
          priceSpecification: {
            '@type': 'PriceSpecification',
            price: '15-25',
            priceCurrency: 'USD',
            unitText: 'HOUR',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Capacitación en Desarrollo de Software',
            description:
              'Formación y capacitación en .NET Core, React, Python para equipos de desarrollo y profesionales. Cursos personalizados de programación full stack, arquitectura limpia y buenas prácticas.',
          },
          priceSpecification: {
            '@type': 'PriceSpecification',
            price: '15-25',
            priceCurrency: 'USD',
            unitText: 'HOUR',
          },
        },
      ],
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

// ============================================================================
// Organization Schema (FreakJazz Brand)
// ============================================================================

export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'FreakJazz',
    url: 'https://freakjazz.com',
    logo: 'https://freakjazz.com/logo/freakjazz-logo.svg',
    founder: {
      '@type': 'Person',
      name: 'Jazmin Rodriguez',
    },
    sameAs: ['https://www.linkedin.com/in/jazmin-rodriguez-bermeo/', 'https://github.com/freakjazz'],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'contact@freakjazz.com',
      contactType: 'customer service',
      availableLanguage: ['Spanish', 'English'],
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

// ============================================================================
// FAQ Schema
// ============================================================================

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSchemaProps {
  items: FaqItem[];
}

export function FaqSchema({ items }: FaqSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

// ============================================================================
// Breadcrumb Schema
// ============================================================================

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

// ============================================================================
// Website Schema
// ============================================================================

export function WebsiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'FreakJazz',
    url: 'https://freakjazz.com',
    description: 'Senior Software Engineer - Full Stack Developer',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://freakjazz.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

// ============================================================================
// All Schemas Combined (for homepage)
// ============================================================================

export function AllSchemas() {
  return (
    <>
      <PersonSchema />
      <ServiceSchema />
      <OrganizationSchema />
      <WebsiteSchema />
    </>
  );
}
