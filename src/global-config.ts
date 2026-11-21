import packageJson from '../package.json';

// ----------------------------------------------------------------------

export type ConfigValue = {
  appName: string;
  appVersion: string;
  serverUrl: string;
  assetsDir: string;
  images: {
    hero: string;
    heroMobile: string;
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
      'https://firebasestorage.googleapis.com/v0/b/paginas-web-d9a17.firebasestorage.app/o/freakjazz%2Fimages%2F53f46de1-7e8e-420a-b3c4-11b2e7cbd5fc.jpe?alt=media&token=5f13039b-61fc-4d57-a924-8c228e36b65e',
    heroMobile:
      'https://firebasestorage.googleapis.com/v0/b/paginas-web-d9a17.firebasestorage.app/o/freakjazz%2Fimages%2Ff514bd43-a18a-4da7-a288-ccd08c064529.jpe?alt=media&token=3d971ca0-b81f-44e4-b5db-407cccdf6b91',
    contact:
      'https://firebasestorage.googleapis.com/v0/b/paginas-web-d9a17.firebasestorage.app/o/freakjazz%2Fimages%2F97af01e9-729a-417d-93de-5df48b87cb66.jpe?alt=media&token=b33cbd61-6900-4ec4-8e37-9df8573b7e0b',
    quote:
      import.meta.env.VITE_QUOTE_IMAGE ??
      'https://firebasestorage.googleapis.com/v0/b/repositorio-images.firebasestorage.app/o/freakjazz%2F0ba33aae-a0f8-4758-9960-c375f332d590.jpg?alt=media&token=a3f54566-7eb5-4b4d-adb7-603a841283c1',
    projects:
      'https://firebasestorage.googleapis.com/v0/b/paginas-web-d9a17.firebasestorage.app/o/freakjazz%2Fimages%2F98e25366-5d1c-4edc-ab58-ce9e76fb6dba.jpe?alt=media&token=d6258426-9445-4dcc-bf8b-203d1704700b',
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
