import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import ResponsiveAppBar from 'layout/UserLayout';

// login option 3 routing
const ParentHomePage = Loadable(lazy(() => import('views/pages/homepage/index.js')));
const ParentBlogPage = Loadable(lazy(() => import('views/pages/blog/index.js')));
const ParentProfilePage = Loadable(lazy(() => import('views/pages/profile/index.js')));
const ParentContactPage = Loadable(lazy(() => import('views/pages/contact/index.js')));
const ParentAppointmentPage = Loadable(lazy(() => import('views/pages/appointment/AppointmentPage.js')));

// ==============================|| PARENT ROUTING ||============================== //

const ParentRoutes = {
  path: '/',
  element: <ResponsiveAppBar />,
  children: [
    {
      path: '/',
      element: <ParentHomePage />
    },
    {
      path: '/blog',
      element: <ParentBlogPage />
    },
    {
      path: '/profile',
      element: <ParentProfilePage />
    },
    {
      path: '/contact',
      element: <ParentContactPage />
    },
    {
      path: '/appointment',
      element: <ParentAppointmentPage />
    }
  ]
};

export default ParentRoutes;
