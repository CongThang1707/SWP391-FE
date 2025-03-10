import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import ResponsiveAppBar from 'layout/UserLayout';

// login option 3 routing
const DoctorHomePage = Loadable(lazy(() => import('views/pages/homepage/index.js')));
const DoctorProfilePage = Loadable(lazy(() => import('views/pages/profile/index.js')));
const DoctorContactPage = Loadable(lazy(() => import('views/pages/contact/index.js')));
const DoctorBlogPage = Loadable(lazy(() => import('views/pages/blog/index.js')));
const ManageAppointment = Loadable(lazy(() => import('views/pages/appointment/ManageAppointment.js')));
// ==============================|| PARENT ROUTING ||============================== //

const DoctorRoutes = {
  path: '/',
  element: <ResponsiveAppBar />,
  children: [
    {
      path: '/',
      element: <DoctorHomePage />
    },
    {
      path: '/profile',
      element: <DoctorProfilePage />
    },
    {
      path: '/appointment',
      element: <ManageAppointment />
    },
    {
      path: '/contact',
      element: <DoctorContactPage />
    },
    {
      path: '/blog',
      element: <DoctorBlogPage />
    }
  ]
};

export default DoctorRoutes;
