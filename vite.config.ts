import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

// ----------------------------------------------------------------------

const PORT = 8080;

// CV PDFs live in Firebase Storage; proxied on the same origin so the browser honors the download filename.
const FIREBASE_HOST = 'https://firebasestorage.googleapis.com';
const CV_PATHS = {
  '/cv/es': '/v0/b/paginas-web-d9a17.firebasestorage.app/o/freakjazz%2Ffiles%2FESPA%C3%91OL.pdf?alt=media&token=e68c5eda-3f5f-4129-85f6-cb8c7071825d',
  '/cv/en': '/v0/b/paginas-web-d9a17.firebasestorage.app/o/freakjazz%2Ffiles%2FINGLES.pdf?alt=media&token=f9f7f3ba-0d21-43b6-98e5-88c339ea5d5a',
};
const cvProxy = Object.fromEntries(
  Object.entries(CV_PATHS).map(([route, target]) => [
    route,
    { target: FIREBASE_HOST, changeOrigin: true, rewrite: () => target },
  ])
);

export default defineConfig({
  plugins: [
    react(),
    checker({
      typescript: true,
      eslint: {
        useFlatConfig: true,
        lintCommand: 'eslint "./src/**/*.{js,jsx,ts,tsx}"',
        dev: { logLevel: ['error'] },
      },
      overlay: {
        position: 'tl',
        initialIsOpen: false,
      },
    }),
  ],
  resolve: {
    alias: [
      {
        find: /^src(.+)/,
        replacement: path.resolve(process.cwd(), 'src/$1'),
      },
    ],
  },
  server: {
    port: PORT,
    host: true,
    proxy: {
      ...cvProxy,
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  preview: { port: PORT, host: true },
});
