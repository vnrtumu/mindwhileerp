// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { lazy } from 'react';
import { Navigate, createBrowserRouter } from 'react-router';
import Loadable from '../layouts/full/shared/loadable/Loadable';

/* ***Layouts**** */
const SchoolAdminLayout = Loadable(lazy(() => import('../layouts/school/SchoolAdminLayout')));
const SuperAdminLayout = Loadable(lazy(() => import('../layouts/super/SuperAdminLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

// authentication
const Login2 = Loadable(lazy(() => import('../views/authentication/auth2/Login')));
const Register2 = Loadable(lazy(() => import('../views/authentication/auth2/Register')));
const Maintainance = Loadable(lazy(() => import('../views/authentication/Maintainance')));

// School Admin Pages
const SchoolDashboard = Loadable(lazy(() => import('../src/pages/Dashboard')));

// Super Admin Dashboards
const Modern = Loadable(lazy(() => import('../views/dashboards/Modern')));

//pages
const UserProfile = Loadable(lazy(() => import('../views/pages/user-profile/UserProfile')));

/* ****Apps***** */
const Notes = Loadable(lazy(() => import('../views/apps/notes/Notes')));
const Form = Loadable(lazy(() => import('../views/utilities/form/Form')));
const Table = Loadable(lazy(() => import('../views/utilities/table/Table')));
const Tickets = Loadable(lazy(() => import('../views/apps/tickets/Tickets')));
const CreateTickets = Loadable(lazy(() => import('../views/apps/tickets/CreateTickets')));
const Blog = Loadable(lazy(() => import('../views/apps/blog/Blog')));
const BlogDetail = Loadable(lazy(() => import('../views/apps/blog/BlogDetail')));

const Error = Loadable(lazy(() => import('../views/authentication/Error')));

// // icons
const SolarIcon = Loadable(lazy(() => import('../views/icons/SolarIcon')));

const Router = [
  // Root redirect to auth
  {
    path: '/',
    element: <Navigate to="/auth/auth2/login" replace />,
  },

  // School Admin Routes
  {
    path: '/school',
    element: <SchoolAdminLayout />,
    children: [
      { path: '/school', element: <Navigate to="/school/dashboard" replace /> },
      { path: '/school/dashboard', element: <SchoolDashboard /> },
      // Add more school admin routes here as needed
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },

  // Super Admin Routes
  {
    path: '/super',
    element: <SuperAdminLayout />,
    children: [
      { path: '/super', element: <Navigate to="/super/dashboard" replace /> },
      { path: '/super/dashboard', element: <Modern /> },

      { path: '/super/apps/notes', element: <Notes /> },
      { path: '/super/utilities/form', element: <Form /> },
      { path: '/super/utilities/table', element: <Table /> },
      { path: '/super/apps/tickets', element: <Tickets /> },
      { path: '/super/apps/tickets/create', element: <CreateTickets /> },
      { path: '/super/apps/blog/post', element: <Blog /> },
      { path: '/super/apps/blog/detail/:id', element: <BlogDetail /> },
      { path: '/super/user-profile', element: <UserProfile /> },
      { path: '/super/icons/iconify', element: <SolarIcon /> },

      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },

  // Authentication Routes (Shared)
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '/auth/auth2/login', element: <Login2 /> },
      { path: '/auth/auth2/register', element: <Register2 /> },
      { path: '/auth/maintenance', element: <Maintainance /> },
      { path: '/auth/404', element: <Error /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },

  // Legacy route redirects for backward compatibility
  {
    path: '/dashboard',
    element: <Navigate to="/super/dashboard" replace />,
  },
  {
    path: '/school-dashboard',
    element: <Navigate to="/school/dashboard" replace />,
  },

  // Catch-all 404
  {
    path: '*',
    element: <Navigate to="/auth/404" />,
  },
];

const router = createBrowserRouter(Router);

export default router;
