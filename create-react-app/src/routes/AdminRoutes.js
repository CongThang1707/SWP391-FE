//AdminRoutes.js
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
const UtilsFeedBack = Loadable(lazy(() => import('views/utilities/FeedBack')));
const UtilsConsulting = Loadable(lazy(() => import('views/utilities/Consulting')));
const UtilsMembership = Loadable(lazy(() => import('views/utilities/Membership')));
const UtilsParentPremium = Loadable(lazy(() => import('views/utilities/ParentPremium')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));
const DoctorDetail = Loadable(lazy(() => import('views/sample-page/doctor_detail')));
const ParentDetail = Loadable(lazy(() => import('views/sample-page/parent_detail')));
const ChildrenDetail = Loadable(lazy(() => import('views/sample-page/children_detail')));
const BlogDetail = Loadable(lazy(() => import('views/sample-page/blog_detail')));
const BookingDetail = Loadable(lazy(() => import('views/sample-page/booking_detail')));
const FeedBackDetail = Loadable(lazy(() => import('views/sample-page/feedback_detail')));
const ConsultingDetail = Loadable(lazy(() => import('views/sample-page/consulting_detail')));
const MembershipDetail = Loadable(lazy(() => import('views/sample-page/membership_detail')));
const ParentPremiumDetail = Loadable(lazy(() => import('views/sample-page/parentpremium_detail')));

// ==============================|| MAIN ROUTING ||============================== //

const AdminRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
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
      path: 'utils',
      children: [
        {
          path: 'util-feedback',
          element: <UtilsFeedBack />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-consulting',
          element: <UtilsConsulting />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-membership',
          element: <UtilsMembership />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-parentpremium',
          element: <UtilsParentPremium />
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
      path: 'booking-detail/:id',
      element: <BookingDetail />
    },
    {
      path: '/feedback-detail/:id',
      element: <FeedBackDetail />
    },
    {
      path: '/consulting-detail/:id',
      element: <ConsultingDetail />
    },
    {
      path: '/membership-detail/:id',
      element: <MembershipDetail />
    },
    {
      path: '/parentpremium-detail/:id',
      element: <ParentPremiumDetail />
    }
  ]
};

export default AdminRoutes;
