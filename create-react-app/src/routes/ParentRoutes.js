import { lazy } from 'react';
//ParentRoutes.js
// project imports
import Loadable from 'ui-component/Loadable';
import ResponsiveAppBar from 'layout/UserLayout';

// login option 3 routing
const ParentHomePage = Loadable(lazy(() => import('views/pages/homepage/index.js')));
const ParentBlogPage = Loadable(lazy(() => import('views/pages/blog/index.js')));
const ParentProfilePage = Loadable(lazy(() => import('views/pages/profile/index.js')));
const ParentContactPage = Loadable(lazy(() => import('views/pages/contact/index.js')));
const ParentAppointmentPage = Loadable(lazy(() => import('views/pages/appointment/AppointmentPage.js')));
const ChildrenDetailPage = Loadable(lazy(() => import('views/sample-page/parent_child_detail.js')));
const ConsultingForm = Loadable(lazy(() => import('views/sample-page/consulting.js')));
const News = Loadable(lazy(() => import('views/pages/news/index.js')));

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
      path: '/news',
      element: <News />
    },
    {
      path: '/contact',
      element: <ParentContactPage />
    },
    {
      path: '/appointment',
      element: <ParentAppointmentPage />
    },
    {
      path: '/children/:id', // Định nghĩa đúng tham số động :id
      element: <ChildrenDetailPage />
    },
    {
      path: '/consulting',
      element: <ConsultingForm />
    }
  ]
};

export default ParentRoutes;
