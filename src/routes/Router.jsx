// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { lazy } from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import ErrorElement from '../components/common/errorElement';

/* ***Layouts**** */
const SchoolAdminLayout = Loadable(lazy(() => import('../layouts/school/SchoolAdminLayout')));
const SuperAdminLayout = Loadable(lazy(() => import('../layouts/super/SuperAdminLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

// authentication
const Login2 = Loadable(lazy(() => import('../views/authentication/auth2/Login')));
const ForgotPassword2 = Loadable(lazy(() => import('../views/authentication/auth2/ForgotPassword')));
const Register2 = Loadable(lazy(() => import('../views/authentication/auth2/Register')));
const Maintainance = Loadable(lazy(() => import('../views/authentication/Maintainance')));
const SchoolLogin = Loadable(lazy(() => import('../views/authentication/SchoolLogin')));

// School Admin Pages
// School Admin Pages
const SchoolDashboard = Loadable(lazy(() => import('../school/pages/Dashboard/index')));
const TeacherDashboard = Loadable(lazy(() => import('../school/pages/TeacherDashboard/index')));
const StudentDashboard = Loadable(lazy(() => import('../school/pages/StudentDashboard/index')));

// Teachers Pages
const AllTeachers = Loadable(lazy(() => import('../school/pages/Teachers/AllTeachers')));
const TeachersList = Loadable(lazy(() => import('../school/pages/Teachers/TeachersList')));
const TeachersGrid = Loadable(lazy(() => import('../school/pages/Teachers/TeachersGrid')));
const TeacherDetails = Loadable(lazy(() => import('../school/pages/Teachers/TeacherDetails')));
const Routine = Loadable(lazy(() => import('../school/pages/Teachers/Routine')));

// Academics Pages
const Classes = Loadable(lazy(() => import('../school/pages/Academics/Classes')));
const Sections = Loadable(lazy(() => import('../school/pages/Academics/Sections')));
const Subjects = Loadable(lazy(() => import('../school/pages/Academics/Subjects')));
const AssignSubjects = Loadable(lazy(() => import('../school/pages/Academics/AssignSubjects')));
const AssignTeacher = Loadable(lazy(() => import('../school/pages/Academics/AssignTeacher')));
const AssignClassTeacher = Loadable(lazy(() => import('../school/pages/Academics/AssignClassTeacher')));
const Periods = Loadable(lazy(() => import('../school/pages/Academics/Periods')));
const ManagePeriods = Loadable(lazy(() => import('../school/pages/Academics/ManagePeriods')));
const Timetable = Loadable(lazy(() => import('../school/pages/Academics/Timetable')));
const ClassTimetable = Loadable(lazy(() => import('../school/pages/Academics/ClassTimetable')));
const PromoteStudents = Loadable(lazy(() => import('../school/pages/Academics/PromoteStudents')));
const Homework = Loadable(lazy(() => import('../school/pages/Academics/Homework')));
const ParentDashboard = Loadable(lazy(() => import('../school/pages/Academics/ParentDashboard')));

// Student Pages
const Students = Loadable(lazy(() => import('../school/pages/Students/Students')));
const AddStudent = Loadable(lazy(() => import('../school/pages/StudentInformation/AddStudent')));
const StudentList = Loadable(lazy(() => import('../school/pages/StudentInformation/StudentList')));
const QuickStudentAdmissionList = Loadable(lazy(() => import('../school/pages/StudentInformation/QuickStudentAdmissionList')));
const QuickStudentAdmissionForm = Loadable(lazy(() => import('../school/pages/StudentInformation/QuickStudentAdmissionForm')));
const StudentProfile = Loadable(lazy(() => import('../school/pages/StudentInformation/StudentProfile')));
const DisableStudentPage = Loadable(lazy(() => import('../school/pages/StudentInformation/DisableStudentPage')));
const StudentAttendance = Loadable(lazy(() => import('../school/pages/StudentInformation/StudentAttendance')));
const AddAttendancePage = Loadable(lazy(() => import('../school/pages/StudentInformation/AddAttendancePage')));
const StudentCategories = Loadable(lazy(() => import('../school/pages/StudentInformation/StudentCategories')));
const AddStudentCategoryPage = Loadable(lazy(() => import('../school/pages/StudentInformation/AddStudentCategoryPage')));
const BehaviorRecords = Loadable(lazy(() => import('../school/pages/StudentInformation/BehaviorRecords')));
const AddBehaviorRecordPage = Loadable(lazy(() => import('../school/pages/StudentInformation/AddBehaviorRecordPage')));
const DisabledStudents = Loadable(lazy(() => import('../school/pages/StudentInformation/DisabledStudents')));
const BulkEdit = Loadable(lazy(() => import('../school/pages/StudentInformation/BulkEdit')));

// Finance Pages
const CollectFees = Loadable(lazy(() => import('../school/pages/Finance/CollectFees')));
const SearchDueFees = Loadable(lazy(() => import('../school/pages/Finance/SearchDueFees')));
const AllTransactions = Loadable(lazy(() => import('../school/pages/Finance/AllTransactions')));
const OnlineTransactions = Loadable(lazy(() => import('../school/pages/Finance/OnlineTransactions')));
const FeesCarryForward = Loadable(lazy(() => import('../school/pages/Finance/FeesCarryForward')));
const AssignFees = Loadable(lazy(() => import('../school/pages/Finance/AssignFees')));
const FeeGroups = Loadable(lazy(() => import('../school/pages/Finance/FeeGroups')));
const FeesDiscount = Loadable(lazy(() => import('../school/pages/Finance/FeesDiscount')));
const FeeTypes = Loadable(lazy(() => import('../school/pages/Finance/FeeTypes')));
const FeesMaster = Loadable(lazy(() => import('../school/pages/Finance/FeesMaster')));
const FeePermissions = Loadable(lazy(() => import('../school/pages/Finance/FeePermissions')));

// Accounts Pages
const Income = Loadable(lazy(() => import('../school/pages/Accounts/Income')));
const IncomeHeads = Loadable(lazy(() => import('../school/pages/Accounts/IncomeHeads')));
const Expense = Loadable(lazy(() => import('../school/pages/Accounts/Expense')));
const ExpenseHeads = Loadable(lazy(() => import('../school/pages/Accounts/ExpenseHeads')));

// Examination Pages
const ExamDashboard = Loadable(lazy(() => import('../school/pages/Examination/ExamDashboard')));
const AssignExam = Loadable(lazy(() => import('../school/pages/Examination/AssignExam')));
const ExamSchedule = Loadable(lazy(() => import('../school/pages/Examination/ExamSchedule')));
const AddExamSchedule = Loadable(lazy(() => import('../school/pages/Examination/AddExamSchedule')));

// Super Admin Dashboards
const Modern = Loadable(lazy(() => import('../views/dashboards/Modern')));

//pages
const UserProfile = Loadable(lazy(() => import('../views/pages/user-profile/UserProfile')));

/* ****Apps***** */
const Notes = Loadable(lazy(() => import('../views/apps/notes/Notes')));
const Form = Loadable(lazy(() => import('../views/utilities/form/Form')));
const Schools = Loadable(lazy(() => import('../views/utilities/schools/Schools')));
const AddSchool = Loadable(lazy(() => import('../views/utilities/schools/AddSchool')));
const Plans = Loadable(lazy(() => import('../views/utilities/plans/Plans')));
const AddPlan = Loadable(lazy(() => import('../views/utilities/plans/AddPlan')));
const PaymentHistory = Loadable(lazy(() => import('../views/utilities/payment-history/PaymentHistory')));
const PlatformSettings = Loadable(lazy(() => import('../views/utilities/platform-settings/PlatformSettings')));
const PaymentGateways = Loadable(lazy(() => import('../views/utilities/payment-gateways/PaymentGateways')));
const SmsGateways = Loadable(lazy(() => import('../views/utilities/sms-gateways/SmsGateways')));
const NotificationTypes = Loadable(lazy(() => import('../views/utilities/notification-types/NotificationTypes')));
const SpecificSchoolSettings = Loadable(lazy(() => import('../views/utilities/specific-school-settings/SpecificSchoolSettings')));
const MasterMenuBuilder = Loadable(lazy(() => import('../views/utilities/master-menu-builder/MasterMenuBuilder')));
const Tickets = Loadable(lazy(() => import('../views/apps/tickets/Tickets')));
const CreateTickets = Loadable(lazy(() => import('../views/apps/tickets/CreateTickets')));
const Leads = Loadable(lazy(() => import('../views/apps/leads/Leads')));
const CreateLead = Loadable(lazy(() => import('../views/apps/leads/CreateLead')));
const Blog = Loadable(lazy(() => import('../views/apps/blog/Blog')));
const BlogDetail = Loadable(lazy(() => import('../views/apps/blog/BlogDetail')));

// Landing Page
const LandingPage = Loadable(lazy(() => import('../views/landing/LandingPage')));

// CMS Pages
const CmsPageSections = Loadable(lazy(() => import('../views/cms/PageSections')));
const CmsNavigationMenu = Loadable(lazy(() => import('../views/cms/NavigationMenu')));

const Error = Loadable(lazy(() => import('../views/authentication/Error')));

// // icons
const SolarIcon = Loadable(lazy(() => import('../views/icons/SolarIcon')));

const Router = [
  // Landing page at root
  {
    path: '/',
    element: <LandingPage />
  },

  // School Admin Routes
  {
    path: '/school',
    element: <SchoolAdminLayout />,
    errorElement: <ErrorElement />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: 'dashboard', element: <SchoolDashboard /> },
      { path: 'teacher-dashboard', element: <TeacherDashboard /> },

      // Student Routes
      { path: 'students', element: <Students /> },
      { path: 'student-dashboard', element: <StudentDashboard /> },
      { path: 'student-list', element: <StudentList /> },
      { path: 'quick-admission', element: <QuickStudentAdmissionList /> },
      { path: 'quick-admission-form', element: <QuickStudentAdmissionForm /> },
      { path: 'quick-admission-form/:id', element: <QuickStudentAdmissionForm /> },
      { path: 'add-student', element: <AddStudent /> },
      { path: 'student-profile/:id', element: <StudentProfile /> },
      { path: 'disable-student/:id', element: <DisableStudentPage /> },
      { path: 'student-attendance', element: <StudentAttendance /> },
      { path: 'add-attendance', element: <AddAttendancePage /> },
      { path: 'student-categories', element: <StudentCategories /> },
      { path: 'add-category', element: <AddStudentCategoryPage /> },
      { path: 'behavior-records', element: <BehaviorRecords /> },
      { path: 'add-behavior-record', element: <AddBehaviorRecordPage /> },
      { path: 'disabled-students', element: <DisabledStudents /> },
      { path: 'bulk-edit', element: <BulkEdit /> },

      // Academics Routes
      { path: 'academics/classes', element: <Classes /> },
      { path: 'academics/sections', element: <Sections /> },
      { path: 'academics/subjects', element: <Subjects /> },
      { path: 'academics/assign-subjects', element: <AssignSubjects /> },
      { path: 'academics/assign-class-teacher', element: <AssignClassTeacher /> },
      { path: 'academics/manage-periods', element: <ManagePeriods /> },
      { path: 'academics/class-timetable', element: <ClassTimetable /> },
      { path: 'academics/promote-students', element: <PromoteStudents /> },
      { path: 'academics/homework', element: <Homework /> },

      // Finance Routes
      { path: 'finance/collect-fees', element: <CollectFees /> },
      { path: 'finance/search-due-fees', element: <SearchDueFees /> },
      { path: 'finance/all-transactions', element: <AllTransactions /> },
      { path: 'finance/online-transactions', element: <OnlineTransactions /> },
      { path: 'finance/fees-carry-forward', element: <FeesCarryForward /> },
      { path: 'finance/assign-fees', element: <AssignFees /> },
      { path: 'finance/fee-groups', element: <FeeGroups /> },
      { path: 'finance/fee-groups/:id', element: <FeeGroups /> },
      { path: 'finance/fees-discount', element: <FeesDiscount /> },
      { path: 'finance/fee-types', element: <FeeTypes /> },
      { path: 'finance/fee-types/:id', element: <FeeTypes /> },
      { path: 'finance/fees-master', element: <FeesMaster /> },
      { path: 'finance/fee-permissions', element: <FeePermissions /> },

      // Accounts Routes
      { path: 'accounts/income', element: <Income /> },
      { path: 'accounts/income-heads', element: <IncomeHeads /> },
      { path: 'accounts/expense', element: <Expense /> },
      { path: 'accounts/expense-heads', element: <ExpenseHeads /> },

      // Exam Routes
      { path: 'exam/dashboard', element: <ExamDashboard /> },
      { path: 'exam/assign', element: <AssignExam /> },
      { path: 'exam/schedule', element: <ExamSchedule /> },
      { path: 'exam/schedule/add', element: <AddExamSchedule /> },

      // Teachers Routes
      { path: 'teachers/all', element: <AllTeachers /> },
      { path: 'teachers/list', element: <TeachersList /> },
      { path: 'teachers/grid', element: <TeachersGrid /> },
      { path: 'teachers/add', element: <AllTeachers /> },
      { path: 'teachers/edit/:id', element: <AllTeachers /> },
      { path: 'teachers/routine', element: <Routine /> },
      { path: 'teachers/details/:id', element: <TeacherDetails /> },
      { path: 'teachers', element: <Navigate to="/school/teachers/all" replace /> },

      { path: 'departments', element: <div>Departments Page</div> },
      { path: 'accounts', element: <div>Accounts Page</div> },
      { path: '*', element: <Navigate to="/auth/404" /> }]

  },

  // Super Admin Routes
  {
    path: '/super',
    element: <SuperAdminLayout />,
    errorElement: <ErrorElement />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: 'dashboard', element: <Modern /> },
      { path: 'apps/notes', element: <Notes /> },
      { path: 'utilities/form', element: <Form /> },
      { path: 'utilities/schools', element: <Schools /> },
      { path: 'utilities/schools/create', element: <AddSchool /> },
      { path: 'utilities/plans', element: <Plans /> },
      { path: 'utilities/plans/create', element: <AddPlan /> },
      { path: 'utilities/payment-history', element: <PaymentHistory /> },
      { path: 'settings/platform', element: <PlatformSettings /> },
      { path: 'settings/payment-gateways', element: <PaymentGateways /> },
      { path: 'settings/sms-gateways', element: <SmsGateways /> },
      { path: 'settings/notification-types', element: <NotificationTypes /> },
      { path: 'apps/tickets', element: <Tickets /> },
      { path: 'apps/tickets/create', element: <CreateTickets /> },
      { path: 'apps/leads', element: <Leads /> },
      { path: 'apps/leads/create', element: <CreateLead /> },
      { path: 'apps/blog/post', element: <Blog /> },
      { path: 'apps/blog/detail/:id', element: <BlogDetail /> },
      { path: 'user-profile', element: <UserProfile /> },
      { path: 'icons/iconify', element: <SolarIcon /> },
      // CMS Management Routes
      { path: 'cms/page-sections', element: <CmsPageSections /> },
      { path: 'cms/navigation-menu', element: <CmsNavigationMenu /> },
      { path: 'settings/school-features', element: <SpecificSchoolSettings /> },
      { path: 'settings/menu-builder', element: <MasterMenuBuilder /> },
      { path: '*', element: <Navigate to="/auth/404" /> }]

  },

  // Authentication Routes (Shared)
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: 'login', element: <SchoolLogin /> },
      { path: 'school-login', element: <SchoolLogin /> },
      { path: 'auth2/login', element: <Login2 /> },
      { path: 'auth2/forgot-password', element: <ForgotPassword2 /> },
      { path: 'auth2/register', element: <Register2 /> },
      { path: 'maintenance', element: <Maintainance /> },
      { path: '403', element: <Error /> },
      { path: '404', element: <Error /> },
      { path: '*', element: <Navigate to="/auth/404" /> }]

  },

  // Legacy route redirects for backward compatibility
  {
    path: '/dashboard',
    element: <Navigate to="/super/dashboard" replace />
  },
  {
    path: '/school-dashboard',
    element: <Navigate to="/school/dashboard" replace />
  },
  {
    path: '/teacher-dashboard',
    element: <Navigate to="/school/teacher-dashboard" replace />
  },

  // Catch-all 404
  {
    path: '*',
    element: <Navigate to="/auth/404" />
  }];


const router = createBrowserRouter(Router);

export default router;