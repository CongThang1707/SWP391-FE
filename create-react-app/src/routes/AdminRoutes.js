import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsBlog = Loadable(lazy(() => import('views/utilities/Blog')));
const UtilsBooking = Loadable(lazy(() => import('views/utilities/Booking')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));
const DoctorDetail = Loadable(lazy(() => import('views/sample-page/doctor_detail')));
const ParentDetail = Loadable(lazy(() => import('views/sample-page/parent_detail')));
const ChildrenDetail = Loadable(lazy(() => import('views/sample-page/children_detail')));
const BlogDetail = Loadable(lazy(() => import('views/sample-page/blog_detail')));
const BookingDetail = Loadable(lazy(() => import('views/sample-page/booking_detail')));

// ==============================|| MAIN ROUTING ||============================== //

const AdminRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    // {
    //   path: '/',
    //   element: <DashboardDefault />
    // },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-typography',
          element: <UtilsTypography />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-color',
          element: <UtilsColor />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-shadow',
          element: <UtilsShadow />
        }
      ]
    },
    {
      path: 'utils',
      children: [ 
        {
          path: 'util-blog',
          element: <UtilsBlog />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-booking',
          element: <UtilsBooking />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'tabler-icons',
          element: <UtilsTablerIcons />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'material-icons',
          element: <UtilsMaterialIcons />
        }
      ]
    },
    {
      path: 'doctor-detail/:id',
      element: <DoctorDetail />
    },
    {
      path: 'parent-detail/:id',
      element: <ParentDetail />
    },
    {
      path: 'children-detail/:id',
      element: <ChildrenDetail />
    },
    {
      path: 'blog-detail/:id',
      element: <BlogDetail />
    },
    {
      path: '/booking-detail/:id',
      element: <BookingDetail />
    }
  ]
};

export default AdminRoutes;
