import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// login option 3 routing
const ParentHomePage = Loadable(lazy(() => import('views/pages/homepage/ParentPage.js')));

// ==============================|| PARENT ROUTING ||============================== //

const ParentRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/pages/page1/homepage',
      element: <ParentHomePage />
    }
  ]
};

export default ParentRoutes;
