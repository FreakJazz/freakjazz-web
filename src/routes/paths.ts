// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
};

// ----------------------------------------------------------------------

export const paths = {
  // Main pages
  home: '/',
  contact: '/contact-us',
  quote: '/quote',
  projects: '/projects',

  // Error pages
  page403: '/error/403',
  page404: '/error/404',
  page500: '/error/500',

  // External links
  docs: 'https://docs.minimals.cc/',
  changelog: 'https://docs.minimals.cc/changelog/',

  // AUTH (JWT only)
  auth: {
    jwt: {
      signIn: `${ROOTS.AUTH}/jwt/sign-in`,
      signUp: `${ROOTS.AUTH}/jwt/sign-up`,
    },
  },
};
