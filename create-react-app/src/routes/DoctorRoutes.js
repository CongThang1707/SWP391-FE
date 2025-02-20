import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// login option 3 routing
const DoctorHomePage = Loadable(lazy(() => import('views/pages/homepage/index.js')));

// ==============================|| PARENT ROUTING ||============================== //

const ParentRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/pages/page2/homepage',
      element: <DoctorHomePage />
    }
  ]
};

export default ParentRoutes;
