import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import ResponsiveAppBar from 'layout/UserLayout';

// login option 3 routing
const ParentHomePage = Loadable(lazy(() => import('views/pages/homepage/index.js')));
const ParentBlogPage = Loadable(lazy(() => import('views/pages/blog/index.js')));
const ParentProfilePage = Loadable(lazy(() => import('views/pages/profile/index.js')));
const ParentContactPage = Loadable(lazy(() => import('views/pages/contact/index.js')));

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
      path: '/pages/page1/blog',
      element: <ParentBlogPage />
    },
    {
      path: '/pages/page1/profile',
      element: <ParentProfilePage />
    },
    {
      path: '/pages/page1/contact',
      element: <ParentContactPage />
    }
  ]
};

export default ParentRoutes;
