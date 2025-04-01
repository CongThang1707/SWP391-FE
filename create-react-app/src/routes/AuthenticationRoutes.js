import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import UserLayout from 'layout/UserLayout'; // Import layout mới

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));
const AuthEmailRegister = Loadable(lazy(() => import('views/pages/authentication/authentication3/EmailRegister')));
const AuthVerifyOTP = Loadable(lazy(() => import('views/pages/authentication/authentication3/VerifyOTP')));
const HomePage = Loadable(lazy(() => import('views/pages/homepage/index.js')));
const BlogPage = Loadable(lazy(() => import('views/pages/blog/index.js')));
const News = Loadable(lazy(() => import('views/pages/news/index.js')));
const Contact = Loadable(lazy(() => import('views/pages/contact/index.js')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = [
  {
    path: '/pages/login/login3',
    element: <MinimalLayout />,
    children: [
      {
        path: '',
        element: <AuthLogin3 />
      }
    ]
  },
  {
    path: '/pages/register/register3',
    element: <MinimalLayout />,
    children: [
      {
        path: '',
        element: <AuthRegister3 />
      }
    ]
  },
  {
    path: '/pages/register/email-register',
    element: <MinimalLayout />,
    children: [
      {
        path: '',
        element: <AuthEmailRegister />
      }
    ]
  },
  {
    path: '/pages/register/email-verify',
    element: <MinimalLayout />,
    children: [
      {
        path: '',
        element: <AuthVerifyOTP />
      }
    ]
  },
  {
    path: '/',
    element: <UserLayout />, // Sử dụng layout mới cho trang chủ
    children: [
      {
        path: '',
        element: <HomePage />
      },
      {
        path: 'blog',
        element: <BlogPage />
      },
      {
        path: 'news',
        element: <News />
      },
      {
        path: 'contact',
        element: <Contact />
      }
    ]
  }
];

export default AuthenticationRoutes;
