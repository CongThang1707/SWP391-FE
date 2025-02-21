import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import ResponsiveAppBar from 'layout/UserLayout';

// login option 3 routing
const HomePage = Loadable(lazy(() => import('views/pages/homepage/index.js')));
const BlogPage = Loadable(lazy(() => import('views/pages/blog/index.js')));

// ==============================|| PARENT ROUTING ||============================== //

const UserRoutes = {
  path: '/',
  element: <ResponsiveAppBar />,
  children: [
    {
      path: '/',
      element: <HomePage />
    },
    {
      path: '/pages/page1/blog',
      element: <BlogPage />
    }
  ]
};

export default UserRoutes;
