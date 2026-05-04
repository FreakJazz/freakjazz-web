import type { RouteObject } from 'react-router';

import { Outlet } from 'react-router';
import { lazy, Suspense } from 'react';

import { MainLayout } from 'src/layouts/main';

import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

const ContactPage = lazy(() => import('src/pages/contact-us'));
const QuotePage = lazy(() => import('src/pages/quote'));
const ProjectsPage = lazy(() => import('src/pages/projects'));

// Error pages
const Page500 = lazy(() => import('src/pages/error/500'));
const Page403 = lazy(() => import('src/pages/error/403'));
const Page404 = lazy(() => import('src/pages/error/404'));

// ----------------------------------------------------------------------

export const mainRoutes: RouteObject[] = [
  {
    element: (
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    ),
    children: [
      {
        element: (
          <MainLayout>
            <Outlet />
          </MainLayout>
        ),
        children: [
          { path: 'contact-us', element: <ContactPage /> },
          { path: 'quote', element: <QuotePage /> },
          { path: 'projects', element: <ProjectsPage /> },
        ],
      },
      {
        path: 'error',
        children: [
          { path: '500', element: <Page500 /> },
          { path: '404', element: <Page404 /> },
          { path: '403', element: <Page403 /> },
        ],
      },
    ],
  },
];
