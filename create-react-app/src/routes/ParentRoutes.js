import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import ResponsiveAppBar from 'layout/UserLayout';

// login option 3 routing
const ParentHomePage = Loadable(lazy(() => import('views/pages/homepage/index.js')));
const ParentBlogPage = Loadable(lazy(() => import('views/pages/blog/index.js')));
const ParentProfilePage = Loadable(lazy(() => import('views/pages/profile/index.js')));

// ==============================|| PARENT ROUTING ||============================== //

const ParentRoutes = {
  path: '/',
  element: <ResponsiveAppBar />,
  children: [
    {
      path: '/pages/page1/homepage',
      element: <ParentHomePage />
    },
    {
      path: '/pages/page1/blog',
      element: <ParentBlogPage />
    },
    {
      path: '/pages/page1/profile',
      element: <ParentProfilePage />
    }
  ]
};

export default ParentRoutes;
