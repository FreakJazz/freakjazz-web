import packageJson from '../package.json';

// ----------------------------------------------------------------------

export type ConfigValue = {
  appName: string;
  appVersion: string;
  serverUrl: string;
  assetsDir: string;
  images: {
    hero: string;
    contact: string;
    quote: string;
    projects: string;
  };
  auth: {
    method: 'jwt';
    skip: boolean;
    redirectPath: string;
  };
};

// ----------------------------------------------------------------------

export const CONFIG: ConfigValue = {
  appName: 'FreakJazz Web',
  appVersion: packageJson.version,
  serverUrl: import.meta.env.VITE_SERVER_URL ?? '',
  assetsDir: import.meta.env.VITE_ASSETS_DIR ?? '',
  images: {
    hero:
      import.meta.env.VITE_HERO_IMAGE ??
      'https://firebasestorage.googleapis.com/v0/b/repositorio-images.firebasestorage.app/o/freakjazz%2F773e877a-01de-46ca-a04d-71647185744d.jpg?alt=media&token=1590da1a-2ad0-4307-a1cd-8f64e8750256',
    contact:
      import.meta.env.VITE_CONTACT_IMAGE ??
      'https://firebasestorage.googleapis.com/v0/b/repositorio-images.firebasestorage.app/o/freakjazz%2Fd5e11b79-2754-44f7-88cb-f54bbbe57661.jpg?alt=media&token=d52eb456-13c1-4646-be36-dd5755be981e',
    quote:
      import.meta.env.VITE_QUOTE_IMAGE ??
      'https://firebasestorage.googleapis.com/v0/b/repositorio-images.firebasestorage.app/o/freakjazz%2F0ba33aae-a0f8-4758-9960-c375f332d590.jpg?alt=media&token=a3f54566-7eb5-4b4d-adb7-603a841283c1',
    projects:
      import.meta.env.VITE_PROJECTS_IMAGE ??
      'https://firebasestorage.googleapis.com/v0/b/repositorio-images.firebasestorage.app/o/freakjazz%2FWhatsApp%20Image%202026-05-04%20at%2015.43.02.jpeg?alt=media&token=a28f82e3-3c0d-4007-b87f-3d16ba7a77d8',
  },
  /**
   * Auth
   * @method jwt
   */
  auth: {
    method: 'jwt',
    skip: false,
    redirectPath: '/',
  },
};
