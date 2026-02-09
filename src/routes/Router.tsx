// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { lazy } from 'react';
import { Navigate, createBrowserRouter } from 'react-router';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import ErrorElement from '../components/Common/ErrorElement';

/* ***Layouts**** */
const SchoolAdminLayout = Loadable(lazy(() => import('../layouts/school/SchoolAdminLayout')));
const SuperAdminLayout = Loadable(lazy(() => import('../layouts/super/SuperAdminLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

// authentication
const Login2 = Loadable(lazy(() => import('../views/authentication/auth2/Login')));
const Register2 = Loadable(lazy(() => import('../views/authentication/auth2/Register')));
const Maintainance = Loadable(lazy(() => import('../views/authentication/Maintainance')));

// School Admin Pages
const SchoolDashboard = Loadable(lazy(() => import('../school/pages/Dashboard')));
const TeacherDashboard = Loadable(lazy(() => import('../school/pages/TeacherDashboard')));
const StudentDashboard = Loadable(lazy(() => import('../pages/StudentDashboard')));
const TeachersModule = Loadable(lazy(() => import('../pages/Teachers/index')));
const TeachersGrid = Loadable(lazy(() => import('../pages/Teachers/index').then(m => ({ default: m.TeachersGrid }))));
const TeachersList = Loadable(lazy(() => import('../pages/Teachers/index').then(m => ({ default: m.TeachersList }))));
const TestComponent = Loadable(lazy(() => import('../pages/Teachers/TestComponent')));
const TeacherDetails = Loadable(lazy(() => import('../pages/Teachers/TeacherDetails')));
const AddTeacher = Loadable(lazy(() => import('../pages/Teachers/AddTeacher')));
const TeacherRoutine = Loadable(lazy(() => import('../pages/Teachers/Routine')));

// Academics Pages
const Classes = Loadable(lazy(() => import('../pages/Academics/Classes')));
const Sections = Loadable(lazy(() => import('../pages/Academics/Sections')));
const Subjects = Loadable(lazy(() => import('../pages/Academics/Subjects')));
const AssignSubjects = Loadable(lazy(() => import('../pages/Academics/AssignSubjects')));
const AssignTeacher = Loadable(lazy(() => import('../pages/Academics/AssignTeacher')));
const Periods = Loadable(lazy(() => import('../pages/Academics/Periods')));
const Timetable = Loadable(lazy(() => import('../pages/Academics/Timetable')));
const PromoteStudents = Loadable(lazy(() => import('../pages/Academics/PromoteStudents')));
const Homework = Loadable(lazy(() => import('../pages/Academics/Homework')));
const ParentDashboard = Loadable(lazy(() => import('../pages/Academics/ParentDashboard')));

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
    errorElement: <ErrorElement />,
    children: [
      { path: '/school', element: <Navigate to="/school/dashboard" replace /> },
      { path: '/school/dashboard', element: <SchoolDashboard /> },
      { path: '/school/teacher-dashboard', element: <TeacherDashboard /> },
      { path: '/school/student-dashboard', element: <StudentDashboard /> },
      { path: '/school/parent-dashboard', element: <ParentDashboard /> },
      { path: '/school/students', element: <Navigate to="/school/students/list" replace /> },
      { path: '/school/students/list', element: <div>Student List Page</div> },
      { path: '/school/students/attendance', element: <div>Student Attendance Page</div> },
      { path: '/school/students/behavior', element: <div>Behavior Records Page</div> },
      { path: '/school/students/categories', element: <div>Student Categories Page</div> },
      { path: '/school/students/disabled', element: <div>Disabled Students Page</div> },
      { path: '/school/teachers', element: <TeachersGrid /> },
      { path: '/school/teachers/list', element: <TeachersList /> },
      { path: '/school/teachers/details', element: <TeacherDetails /> },
      { path: '/school/teachers/details/:id', element: <TeacherDetails /> },
      { path: '/school/teachers/add', element: <AddTeacher /> },
      { path: '/school/teachers/edit/:id', element: <AddTeacher /> },
      { path: '/school/teachers/routine', element: <TeacherRoutine /> },
      { path: '/school/test-import', element: <TestComponent /> },

      // Academics
      { path: '/school/academics/classes', element: <Classes /> },
      { path: '/school/academics/sections', element: <Sections /> },
      { path: '/school/academics/subjects', element: <Subjects /> },
      { path: '/school/academics/assign-subjects', element: <AssignSubjects /> },
      { path: '/school/academics/assign-teacher', element: <AssignTeacher /> },
      { path: '/school/academics/periods', element: <Periods /> },
      { path: '/school/academics/timetable', element: <Timetable /> },
      { path: '/school/academics/promote-students', element: <PromoteStudents /> },
      { path: '/school/academics/homework', element: <Homework /> },
      { path: '/school/departments', element: <div>Departments Page</div> },
      { path: '/school/accounts', element: <div>Accounts Page</div> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },

  // Super Admin Routes
  {
    path: '/super',
    element: <SuperAdminLayout />,
    errorElement: <ErrorElement />,
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
  {
    path: '/teacher-dashboard',
    element: <Navigate to="/school/teacher-dashboard" replace />,
  },

  // Catch-all 404
  {
    path: '*',
    element: <Navigate to="/auth/404" />,
  },
];

const router = createBrowserRouter(Router);

export default router;
