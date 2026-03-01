// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { lazy } from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import ErrorElement from '../components/common/ErrorElement';
import RoleGuard from '../guards/RoleGuard';
import AuthGuard from '../guards/AuthGuard';

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
const SchoolDashboard = Loadable(lazy(() => import('../school/pages/Dashboard/index')));
const TeacherDashboard = Loadable(lazy(() => import('../school/pages/TeacherDashboard/index')));
const StudentDashboard = Loadable(lazy(() => import('../school/pages/StudentDashboard/index')));

// Teachers Pages
const AllTeachers = Loadable(lazy(() => import('../school/pages/Teachers/AllTeachers')));
const TeachersList = Loadable(lazy(() => import('../school/pages/Teachers/TeachersList')));
const TeachersGrid = Loadable(lazy(() => import('../school/pages/Teachers/TeachersGrid')));
const TeacherDetails = Loadable(lazy(() => import('../school/pages/Teachers/TeacherDetails')));
const AddTeacher = Loadable(lazy(() => import('../school/pages/Teachers/AddTeacher')));
const Routine = Loadable(lazy(() => import('../school/pages/Teachers/Routine')));

// Academics Pages
const AcademicsDashboard = Loadable(lazy(() => import('../school/pages/Academics/AcademicsDashboard')));
const Classes = Loadable(lazy(() => import('../school/pages/Academics/Classes')));
const AddClass = Loadable(lazy(() => import('../school/pages/Academics/AddClass')));
const EditClass = Loadable(lazy(() => import('../school/pages/Academics/EditClass')));
const Sections = Loadable(lazy(() => import('../school/pages/Academics/Sections')));
const AddSection = Loadable(lazy(() => import('../school/pages/Academics/AddSection')));
const EditSection = Loadable(lazy(() => import('../school/pages/Academics/EditSection')));
const Subjects = Loadable(lazy(() => import('../school/pages/Academics/Subjects')));
const AddSubject = Loadable(lazy(() => import('../school/pages/Academics/AddSubject')));
const EditSubject = Loadable(lazy(() => import('../school/pages/Academics/EditSubject')));
const AssignSubjects = Loadable(lazy(() => import('../school/pages/Academics/AssignSubjects')));
const AddSubjectAssignment = Loadable(lazy(() => import('../school/pages/Academics/AddSubjectAssignment')));
const EditSubjectAssignment = Loadable(lazy(() => import('../school/pages/Academics/EditSubjectAssignment')));
const AssignClassTeacher = Loadable(lazy(() => import('../school/pages/Academics/AssignClassTeacher')));
const AddClassTeacherAssignment = Loadable(lazy(() => import('../school/pages/Academics/AddClassTeacherAssignment')));
const EditClassTeacherAssignment = Loadable(lazy(() => import('../school/pages/Academics/EditClassTeacherAssignment')));
const ManagePeriods = Loadable(lazy(() => import('../school/pages/Academics/ManagePeriods')));
const AddPeriod = Loadable(lazy(() => import('../school/pages/Academics/AddPeriod')));
const EditPeriod = Loadable(lazy(() => import('../school/pages/Academics/EditPeriod')));
const ClassTimetable = Loadable(lazy(() => import('../school/pages/Academics/ClassTimetable')));
const PromoteStudents = Loadable(lazy(() => import('../school/pages/Academics/PromoteStudents')));
const Homework = Loadable(lazy(() => import('../school/pages/Academics/Homework')));
const AddHomework = Loadable(lazy(() => import('../school/pages/Academics/AddHomework')));
const EditHomework = Loadable(lazy(() => import('../school/pages/Academics/EditHomework')));

// Student Pages
const Students = Loadable(lazy(() => import('../school/pages/Students/Students')));
const AddStudent = Loadable(lazy(() => import('../school/pages/StudentInformation/AddStudent')));
const StudentList = Loadable(lazy(() => import('../school/pages/StudentInformation/StudentList')));
const QuickStudentAdmissionList = Loadable(lazy(() => import('../school/pages/StudentInformation/QuickStudentAdmissionList')));
const QuickStudentAdmissionForm = Loadable(lazy(() => import('../school/pages/StudentInformation/QuickStudentAdmissionForm')));
const StudentProfile = Loadable(lazy(() => import('../school/pages/StudentInformation/StudentProfile')));
const DisableStudentPage = Loadable(lazy(() => import('../school/pages/StudentInformation/DisableStudentPage')));
const AddAttendancePage = Loadable(lazy(() => import('../school/pages/StudentInformation/AddAttendancePage')));
const StudentAttendance = Loadable(lazy(() => import('../school/pages/StudentInformation/AttendanceTeacher')));
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
const AssignFeesEdit = Loadable(lazy(() => import('../school/pages/Finance/AssignFeesEdit')));
const AssignFeesEditGlobal = Loadable(lazy(() => import('../school/pages/Finance/AssignFeesEditGlobal')));
const FeesDiscount = Loadable(lazy(() => import('../school/pages/Finance/FeesDiscount')));
const FeeTypes = Loadable(lazy(() => import('../school/pages/Finance/FeeTypes')));
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
const AssignExamSchedule = Loadable(lazy(() => import('../school/pages/Examination/AssignExamSchedule')));
const OnlineExam = Loadable(lazy(() => import('../school/pages/Examination/OnlineExam')));
const AddOnlineExam = Loadable(lazy(() => import('../school/pages/Examination/AddOnlineExam')));
const AddOnlineExamPremium = Loadable(lazy(() => import('../school/pages/Examination/AddOnlineExamPremium')));
const EditOnlineExam = Loadable(lazy(() => import('../school/pages/Examination/EditOnlineExam')));
const EditOnlineExamPremium = Loadable(lazy(() => import('../school/pages/Examination/EditOnlineExamPremium')));
const ViewOnlineExamPremium = Loadable(lazy(() => import('../school/pages/Examination/ViewOnlineExamPremium')));
const ManageQuestions = Loadable(lazy(() => import('../school/pages/Examination/ManageQuestions')));

// Transport Pages
const ManageVehicles = Loadable(lazy(() => import('../school/pages/Transport/ManageVehicles')));
const AddVehicle = Loadable(lazy(() => import('../school/pages/Transport/AddVehicle')));
const EditVehicle = Loadable(lazy(() => import('../school/pages/Transport/EditVehicle')));
const ManageRoutes = Loadable(lazy(() => import('../school/pages/Transport/ManageRoutes')));
const AddRoute = Loadable(lazy(() => import('../school/pages/Transport/AddRoute')));
const EditRoute = Loadable(lazy(() => import('../school/pages/Transport/EditRoute')));
const LiveTracking = Loadable(lazy(() => import('../school/pages/Transport/LiveTracking')));
const ManageStudentTransport = Loadable(lazy(() => import('../school/pages/Transport/ManageStudentTransport.jsx')));
const TransportDashboard = Loadable(lazy(() => import('../school/pages/Transport/TransportDashboard.jsx')));

// Human Resource / Payroll
const Payroll = Loadable(lazy(() => import('../school/pages/HumanResource/Payroll')));
const StaffAttendance = Loadable(lazy(() => import('../school/pages/HumanResource/StaffAttendance')));
const SetSalary = Loadable(lazy(() => import('../school/pages/HumanResource/SetSalary')));
const ApproveLeaveRequests = Loadable(lazy(() => import('../school/pages/HumanResource/ApproveLeaveRequests')));
const LeaveTypes = Loadable(lazy(() => import('../school/pages/HumanResource/LeaveTypes')));
const Departments = Loadable(lazy(() => import('../school/pages/HumanResource/Departments')));
const Designations = Loadable(lazy(() => import('../school/pages/HumanResource/Designations')));

// System Settings Pages
const GeneralSetting = Loadable(lazy(() => import('../school/pages/SystemSettings/GeneralSetting')));
const SessionSetting = Loadable(lazy(() => import('../school/pages/SystemSettings/SessionSetting')));
const NotificationSetting = Loadable(lazy(() => import('../school/pages/SystemSettings/NotificationSetting')));
const WhatsAppSetting = Loadable(lazy(() => import('../school/pages/SystemSettings/WhatsAppSetting')));
const SMSSetting = Loadable(lazy(() => import('../school/pages/SystemSettings/SMSSetting')));
const EmailSetting = Loadable(lazy(() => import('../school/pages/SystemSettings/EmailSetting')));
const PaymentMethods = Loadable(lazy(() => import('../school/pages/SystemSettings/PaymentMethods')));
const PrintHeaderFooter = Loadable(lazy(() => import('../school/pages/SystemSettings/PrintHeaderFooter')));
const ThermalPrint = Loadable(lazy(() => import('../school/pages/SystemSettings/ThermalPrint')));
const FrontCMSSetting = Loadable(lazy(() => import('../school/pages/SystemSettings/FrontCMSSetting')));
const RolesPermissions = Loadable(lazy(() => import('../school/pages/SystemSettings/RolesPermissions')));
const BackupRestore = Loadable(lazy(() => import('../school/pages/SystemSettings/BackupRestore')));
const Users = Loadable(lazy(() => import('../school/pages/SystemSettings/Users')));
const Modules = Loadable(lazy(() => import('../school/pages/SystemSettings/Modules')));
const CustomFields = Loadable(lazy(() => import('../school/pages/SystemSettings/CustomFields')));
const CaptchaSetting = Loadable(lazy(() => import('../school/pages/SystemSettings/CaptchaSetting')));
const SystemFields = Loadable(lazy(() => import('../school/pages/SystemSettings/SystemFields')));
const StudentProfileUpdate = Loadable(lazy(() => import('../school/pages/SystemSettings/StudentProfileUpdate')));
const OnlineAdmission = Loadable(lazy(() => import('../school/pages/SystemSettings/OnlineAdmission')));
const FileTypes = Loadable(lazy(() => import('../school/pages/SystemSettings/FileTypes')));
const SidebarMenu = Loadable(lazy(() => import('../school/pages/SystemSettings/SidebarMenu')));
const SystemUpdate = Loadable(lazy(() => import('../school/pages/SystemSettings/SystemUpdate')));

// Library Pages
const IssueReturnBook = Loadable(lazy(() => import('../school/pages/Library/IssueReturnBook')));
const IssueNewBook = Loadable(lazy(() => import('../school/pages/Library/IssueNewBook')));
const ManageBooks = Loadable(lazy(() => import('../school/pages/Library/ManageBooks')));
const BookCategories = Loadable(lazy(() => import('../school/pages/Library/BookCategories')));
const LibraryMembers = Loadable(lazy(() => import('../school/pages/Library/LibraryMembers')));

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
const EditTickets = Loadable(lazy(() => import('../views/apps/tickets/EditTickets')));
const Leads = Loadable(lazy(() => import('../views/apps/leads/Leads')));
const CreateLead = Loadable(lazy(() => import('../views/apps/leads/CreateLead')));
const EditLeads = Loadable(lazy(() => import('../views/apps/leads/EditLeads')));
const Blog = Loadable(lazy(() => import('../views/apps/blog/Blog')));
const BlogDetail = Loadable(lazy(() => import('../views/apps/blog/BlogDetail')));

// Landing Page
const LandingPage = Loadable(lazy(() => import('../views/landing/LandingPage')));

// CMS Pages
const CmsPageSections = Loadable(lazy(() => import('../views/cms/PageSections')));
const CmsNavigationMenu = Loadable(lazy(() => import('../views/cms/NavigationMenu')));
const CmsClientLogos = Loadable(lazy(() => import('../views/cms/ClientLogos')));

const Error = Loadable(lazy(() => import('../views/authentication/Error')));

const SolarIcon = Loadable(lazy(() => import('../views/icons/SolarIcon')));

// Communicate Pages
const NoticeBoard = Loadable(lazy(() => import('../school/pages/Communicate/NoticeBoard')));
const EventsHolidays = Loadable(lazy(() => import('../school/pages/Communicate/EventsHolidays')));
const ComposeBroadcast = Loadable(lazy(() => import('../school/pages/Communicate/ComposeBroadcast')));
const BroadcastHistory = Loadable(lazy(() => import('../school/pages/Communicate/BroadcastHistory')));
const SendSMS = Loadable(lazy(() => import('../school/pages/Communicate/SendSMS')));
const SendEmail = Loadable(lazy(() => import('../school/pages/Communicate/SendEmail')));
const EmailSMSLog = Loadable(lazy(() => import('../school/pages/Communicate/EmailSMSLog')));
const ScheduleEmailSMSLog = Loadable(lazy(() => import('../school/pages/Communicate/ScheduleEmailSMSLog')));
const LoginCredentialsSend = Loadable(lazy(() => import('../school/pages/Communicate/LoginCredentialsSend')));
const EmailTemplate = Loadable(lazy(() => import('../school/pages/Communicate/EmailTemplate')));
const SMSTemplate = Loadable(lazy(() => import('../school/pages/Communicate/SMSTemplate')));
const SendWhatsapp = Loadable(lazy(() => import('../school/pages/Communicate/SendWhatsapp')));
const WhatsappTemplate = Loadable(lazy(() => import('../school/pages/Communicate/WhatsappTemplate')));

// Reports Pages
const ReportsDashboard = Loadable(lazy(() => import('../school/pages/Reports/ReportsDashboard')));
const StudentReport = Loadable(lazy(() => import('../school/pages/Reports/StudentReport')));
const AttendanceReport = Loadable(lazy(() => import('../school/pages/Reports/AttendanceReport')));
const FeesReport = Loadable(lazy(() => import('../school/pages/Reports/FeesReport')));
const SalaryReport = Loadable(lazy(() => import('../school/pages/Reports/SalaryReport')));
const HallTicketReport = Loadable(lazy(() => import('../school/pages/Reports/HallTicketReport')));
const HostelReport = Loadable(lazy(() => import('../school/pages/Reports/HostelReport')));
const TransportReport = Loadable(lazy(() => import('../school/pages/Reports/TransportReport')));
const CertificateReport = Loadable(lazy(() => import('../school/pages/Reports/CertificateReport')));
const ReportPlaceholder = Loadable(lazy(() => import('../school/pages/Reports/ReportPlaceholder')));

// Book Sales Pages
const BookSalesDashboard = Loadable(lazy(() => import('../school/pages/BookSales/BookSalesDashboard')));
const BookSalesVendors = Loadable(lazy(() => import('../school/pages/BookSales/Vendors')));
const BookSalesInventory = Loadable(lazy(() => import('../school/pages/BookSales/Inventory')));
const BookSalesStockIn = Loadable(lazy(() => import('../school/pages/BookSales/StockIn')));
const BookSalesSalesEntry = Loadable(lazy(() => import('../school/pages/BookSales/SalesEntry')));
const BookSalesReturns = Loadable(lazy(() => import('../school/pages/BookSales/Returns')));
const BookSalesReports = Loadable(lazy(() => import('../school/pages/BookSales/BookSalesReports')));



const Router = [
  // Landing page at root
  {
    path: '/',
    element: <LandingPage />,
  },

  // School Admin Routes
  {
    path: '/school',
    element: <AuthGuard><SchoolAdminLayout /></AuthGuard>,
    errorElement: <ErrorElement />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: 'dashboard', element: <SchoolDashboard /> },
      { path: 'teacher-dashboard', element: <TeacherDashboard /> },

      // Student Routes
      { path: 'students', element: <Students /> },
      { path: 'student-dashboard', element: <StudentDashboard /> },

      // Student Information Routes (flat)
      { path: 'student-list', element: <StudentList /> },
      { path: 'student-list/add', element: <AddStudent /> },
      { path: 'student-profile/:id', element: <StudentProfile /> },
      { path: 'disable-student/:id', element: <DisableStudentPage /> },
      { path: 'student-attendance', element: <StudentAttendance /> },
      { path: 'student-attendance/add', element: <AddAttendancePage /> },
      { path: 'student-categories', element: <StudentCategories /> },
      { path: 'student-categories/add', element: <AddStudentCategoryPage /> },
      { path: 'behavior-records', element: <BehaviorRecords /> },
      { path: 'behavior-records/add', element: <AddBehaviorRecordPage /> },
      { path: 'disabled-students', element: <DisabledStudents /> },
      { path: 'bulk-edit', element: <BulkEdit /> },
      { path: 'quick-admission', element: <QuickStudentAdmissionList /> },
      { path: 'quick-admission/add', element: <QuickStudentAdmissionForm /> },
      { path: 'quick-admission/:id', element: <QuickStudentAdmissionForm /> },

      // Academics Routes
      {
        path: 'academics',
        children: [
          { index: true, element: <AcademicsDashboard /> },
          { path: 'classes', element: <Classes /> },
          { path: 'classes/add', element: <AddClass /> },
          { path: 'classes/edit/:id', element: <EditClass /> },
          { path: 'sections', element: <Sections /> },
          { path: 'sections/add', element: <AddSection /> },
          { path: 'sections/edit/:id', element: <EditSection /> },
          { path: 'subjects', element: <Subjects /> },
          { path: 'subjects/add', element: <AddSubject /> },
          { path: 'subjects/edit/:id', element: <EditSubject /> },
          { path: 'assign-subjects', element: <AssignSubjects /> },
          { path: 'assign-subjects/add', element: <AddSubjectAssignment /> },
          { path: 'assign-subjects/edit/:id', element: <EditSubjectAssignment /> },
          { path: 'assign-class-teacher', element: <AssignClassTeacher /> },
          { path: 'assign-class-teacher/add', element: <AddClassTeacherAssignment /> },
          { path: 'assign-class-teacher/edit/:id', element: <EditClassTeacherAssignment /> },
          { path: 'manage-periods', element: <ManagePeriods /> },
          { path: 'manage-periods/add', element: <AddPeriod /> },
          { path: 'manage-periods/edit/:id', element: <EditPeriod /> },
          { path: 'class-timetable', element: <ClassTimetable /> },
          { path: 'promote-students', element: <PromoteStudents /> },
          { path: 'homework', element: <Homework /> },
          { path: 'homework/add', element: <AddHomework /> },
          { path: 'homework/edit/:id', element: <EditHomework /> },
        ],
      },

      // Finance Routes
      {
        path: 'finance',
        children: [
          { path: 'collect-fees', element: <CollectFees /> },
          { path: 'search-due-fees', element: <SearchDueFees /> },
          { path: 'all-transactions', element: <AllTransactions /> },
          { path: 'online-transactions', element: <OnlineTransactions /> },
          { path: 'fees-carry-forward', element: <FeesCarryForward /> },
          { path: 'assign-fees', element: <AssignFees /> },
          { path: 'assign-fees/edit', element: <AssignFeesEditGlobal /> },
          { path: 'assign-fees/edit/:studentId', element: <AssignFeesEdit /> },
          { path: 'fees-discount', element: <FeesDiscount /> },
          { path: 'fee-types', element: <FeeTypes /> },
          { path: 'fee-types/:id', element: <FeeTypes /> },
          { path: 'fee-permissions', element: <FeePermissions /> },
        ],
      },

      // Accounts Routes (flat — kept from develop-uat)
      { path: 'accounts/income', element: <Income /> },
      { path: 'accounts/income-heads', element: <IncomeHeads /> },
      { path: 'accounts/expense', element: <Expense /> },
      { path: 'accounts/expense-heads', element: <ExpenseHeads /> },

      // Exam Routes
      { path: 'exam/dashboard', element: <ExamDashboard /> },
      { path: 'exam/assign', element: <AssignExam /> },
      { path: 'exam/schedule', element: <ExamSchedule /> },
      { path: 'exam/schedule/add', element: <AddExamSchedule /> },
      { path: 'exam/schedule/:scheduleId/assign', element: <AssignExamSchedule /> },
      {
        path: 'examination',
        children: [
          { index: true, element: <OnlineExam /> },
          { path: 'online-exam', element: <OnlineExam /> },
          { path: 'online-exam/add', element: <AddOnlineExamPremium /> },
          { path: 'online-exam/add-basic', element: <AddOnlineExam /> },
          { path: 'online-exam/edit/:id', element: <EditOnlineExamPremium /> },
          { path: 'online-exam/edit-basic/:id', element: <EditOnlineExam /> },
          { path: 'online-exam/view/:id', element: <ViewOnlineExamPremium /> },
          { path: 'online-exam/questions/:id', element: <ManageQuestions /> },

        ],
      },

      // Library Routes
      { path: 'library/issue-return', element: <IssueReturnBook /> },
      { path: 'library/issue-new-book', element: <IssueNewBook /> },
      { path: 'library/books', element: <ManageBooks /> },
      { path: 'library/categories', element: <BookCategories /> },
      { path: 'library/members', element: <LibraryMembers /> },

      // Transport Routes
      { path: 'transport', element: <TransportDashboard /> },
      { path: 'transport/vehicles', element: <ManageVehicles /> },
      { path: 'transport/vehicles/add', element: <AddVehicle /> },
      { path: 'transport/vehicles/edit/:id', element: <EditVehicle /> },
      { path: 'transport/routes', element: <ManageRoutes /> },
      { path: 'transport/routes/add', element: <AddRoute /> },
      { path: 'transport/routes/edit/:id', element: <EditRoute /> },
      { path: 'transport/tracking', element: <LiveTracking /> },
      { path: 'transport/student-transport', element: <ManageStudentTransport /> },
      { path: 'transport/student-transport/add', element: <ManageStudentTransport /> },
      { path: 'transport/student-transport/edit/:id', element: <ManageStudentTransport /> },

      // Teachers Routes
      {
        path: 'teachers',
        children: [
          { path: 'all', element: <AllTeachers /> },
          { path: 'list', element: <TeachersList /> },
          { path: 'grid', element: <TeachersGrid /> },
          { path: 'add', element: <AddTeacher /> },
          { path: 'edit/:id', element: <AddTeacher /> },
          { path: 'routine', element: <Routine /> },
          { path: 'details/:id', element: <TeacherDetails /> },
          { index: true, element: <Navigate to="all" replace /> },
          { path: 'departments', element: <div>Departments Page</div> },
          { path: 'accounts', element: <div>Accounts Page</div> },
        ],
      },

      // Human Resource Routes
      {
        path: 'human-resource',
        children: [
          { path: 'payroll', element: <Payroll /> },
          { path: 'staff-attendance', element: <StaffAttendance /> },
          { path: 'set-salary', element: <SetSalary /> },
          { path: 'approve-leave-requests', element: <ApproveLeaveRequests /> },
          { path: 'leave-types', element: <LeaveTypes /> },
          { path: 'departments', element: <Departments /> },
          { path: 'designations', element: <Designations /> },
        ],
      },

      // Human Resource flat routes (for sidebar links)
      { path: 'payroll', element: <Payroll /> },
      { path: 'staff-attendance', element: <StaffAttendance /> },
      { path: 'set-salary', element: <SetSalary /> },
      { path: 'approve-leave-requests', element: <ApproveLeaveRequests /> },
      { path: 'leave-types', element: <LeaveTypes /> },
      { path: 'departments', element: <Departments /> },
      { path: 'designations', element: <Designations /> },

      // System Settings Routes
      {
        path: 'settings',
        children: [
          { path: 'general', element: <GeneralSetting /> },
          { path: 'session', element: <SessionSetting /> },
          { path: 'notifications', element: <NotificationSetting /> },
          { path: 'whatsapp', element: <WhatsAppSetting /> },
          { path: 'sms', element: <SMSSetting /> },
          { path: 'email', element: <EmailSetting /> },
          { path: 'payments', element: <PaymentMethods /> },
          { path: 'print', element: <PrintHeaderFooter /> },
          { path: 'thermal-print', element: <ThermalPrint /> },
          { path: 'cms', element: <FrontCMSSetting /> },
          { path: 'roles', element: <RolesPermissions /> },
          { path: 'backup', element: <BackupRestore /> },
          { path: 'users', element: <Users /> },
          { path: 'modules', element: <Modules /> },
          { path: 'custom-fields', element: <CustomFields /> },
          { path: 'captcha', element: <CaptchaSetting /> },
          { path: 'system-fields', element: <SystemFields /> },
          { path: 'student-profile', element: <StudentProfileUpdate /> },
          { path: 'admission', element: <OnlineAdmission /> },
          { path: 'file-types', element: <FileTypes /> },
          { path: 'sidebar', element: <SidebarMenu /> },
          { path: 'update', element: <SystemUpdate /> },
        ],
      },

      // System Settings flat routes (for sidebar links)
      { path: 'settings/general', element: <GeneralSetting /> },
      { path: 'settings/session', element: <SessionSetting /> },
      { path: 'settings/notifications', element: <NotificationSetting /> },
      { path: 'settings/whatsapp', element: <WhatsAppSetting /> },
      { path: 'settings/sms', element: <SMSSetting /> },
      { path: 'settings/email', element: <EmailSetting /> },
      { path: 'settings/payments', element: <PaymentMethods /> },
      { path: 'settings/print', element: <PrintHeaderFooter /> },
      { path: 'settings/thermal-print', element: <ThermalPrint /> },
      { path: 'settings/cms', element: <FrontCMSSetting /> },
      { path: 'settings/roles', element: <RolesPermissions /> },
      { path: 'settings/backup', element: <BackupRestore /> },
      { path: 'settings/users', element: <Users /> },
      { path: 'settings/modules', element: <Modules /> },
      { path: 'settings/custom-fields', element: <CustomFields /> },
      { path: 'settings/captcha', element: <CaptchaSetting /> },
      { path: 'settings/system-fields', element: <SystemFields /> },
      { path: 'settings/student-profile', element: <StudentProfileUpdate /> },
      { path: 'settings/admission', element: <OnlineAdmission /> },
      { path: 'settings/file-types', element: <FileTypes /> },
      { path: 'settings/sidebar', element: <SidebarMenu /> },
      { path: 'settings/update', element: <SystemUpdate /> },

      // Communicate Routes
      {
        path: 'communicate',
        children: [
          { path: 'notice', element: <NoticeBoard /> },
          { path: 'events', element: <EventsHolidays /> },
          { path: 'broadcast', element: <ComposeBroadcast /> },
          { path: 'send-sms', element: <SendSMS /> },
          { path: 'send-whatsapp', element: <SendWhatsapp /> },
          { path: 'send-email', element: <SendEmail /> },
          { path: 'log', element: <EmailSMSLog /> },
          { path: 'schedule-log', element: <ScheduleEmailSMSLog /> },
          { path: 'credentials', element: <LoginCredentialsSend /> },
          { path: 'email-template', element: <EmailTemplate /> },
          { path: 'sms-template', element: <SMSTemplate /> },
          { path: 'whatsapp-template', element: <WhatsappTemplate /> },
          { path: 'history', element: <BroadcastHistory /> },
        ],
      },

      // Reports Routes
      {
        path: 'reports',
        children: [
          { index: true, element: <ReportsDashboard /> },
          { path: 'student', element: <StudentReport /> },
          { path: 'attendance', element: <AttendanceReport /> },
          { path: 'fees', element: <FeesReport /> },
          { path: 'salary', element: <SalaryReport /> },
          { path: 'hall-ticket', element: <HallTicketReport /> },
          { path: 'hostel', element: <HostelReport /> },
          { path: 'transport', element: <TransportReport /> },
          { path: 'certificate', element: <CertificateReport /> },
          { path: ':reportType', element: <ReportPlaceholder /> },
        ],
      },

      // Book Sales Routes
      {
        path: 'book-sales',
        children: [
          { index: true, element: <BookSalesDashboard /> },
          { path: 'vendors', element: <BookSalesVendors /> },
          { path: 'inventory', element: <BookSalesInventory /> },
          { path: 'stock-in', element: <BookSalesStockIn /> },
          { path: 'sales', element: <BookSalesSalesEntry /> },
          { path: 'returns', element: <BookSalesReturns /> },
          { path: 'reports', element: <BookSalesReports /> },
        ],
      },
      { path: '*', element: <Navigate to="/auth/404" state={{ from: 'school' }} /> },
    ],
  },

  // Redirect legacy HR paths
  { path: '/hr/attendance', element: <Navigate to="/school/staff-attendance" replace /> },
  { path: '/hr/payroll', element: <Navigate to="/school/payroll" replace /> },
  { path: '/hr/salary', element: <Navigate to="/school/set-salary" replace /> },
  { path: '/hr/leave-requests', element: <Navigate to="/school/approve-leave-requests" replace /> },
  { path: '/hr/leave-types', element: <Navigate to="/school/leave-types" replace /> },
  { path: '/hr/departments', element: <Navigate to="/school/departments" replace /> },
  { path: '/hr/designations', element: <Navigate to="/school/designations" replace /> },

  // Redirect legacy settings paths
  { path: '/settings/general', element: <Navigate to="/school/settings/general" replace /> },
  { path: '/settings/session', element: <Navigate to="/school/settings/session" replace /> },
  { path: '/settings/notifications', element: <Navigate to="/school/settings/notifications" replace /> },
  { path: '/settings/whatsapp', element: <Navigate to="/school/settings/whatsapp" replace /> },
  { path: '/settings/sms', element: <Navigate to="/school/settings/sms" replace /> },
  { path: '/settings/email', element: <Navigate to="/school/settings/email" replace /> },
  { path: '/settings/payments', element: <Navigate to="/school/settings/payments" replace /> },
  { path: '/settings/print', element: <Navigate to="/school/settings/print" replace /> },
  { path: '/settings/thermal-print', element: <Navigate to="/school/settings/thermal-print" replace /> },
  { path: '/settings/cms', element: <Navigate to="/school/settings/cms" replace /> },
  { path: '/settings/roles', element: <Navigate to="/school/settings/roles" replace /> },
  { path: '/settings/backup', element: <Navigate to="/school/settings/backup" replace /> },
  { path: '/settings/users', element: <Navigate to="/school/settings/users" replace /> },
  { path: '/settings/modules', element: <Navigate to="/school/settings/modules" replace /> },
  { path: '/settings/custom-fields', element: <Navigate to="/school/settings/custom-fields" replace /> },
  { path: '/settings/captcha', element: <Navigate to="/school/settings/captcha" replace /> },
  { path: '/settings/system-fields', element: <Navigate to="/school/settings/system-fields" replace /> },
  { path: '/settings/student-profile', element: <Navigate to="/school/settings/student-profile" replace /> },
  { path: '/settings/admission', element: <Navigate to="/school/settings/admission" replace /> },
  { path: '/settings/file-types', element: <Navigate to="/school/settings/file-types" replace /> },
  { path: '/settings/sidebar', element: <Navigate to="/school/settings/sidebar" replace /> },
  { path: '/settings/update', element: <Navigate to="/school/settings/update" replace /> },

  // Super Admin Routes
  {
    path: '/super',
    element: <RoleGuard allowedRoles={['super_admin']}><SuperAdminLayout /></RoleGuard>,
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
      { path: 'apps/tickets/edit/:id', element: <EditTickets /> },
      { path: 'apps/leads', element: <Leads /> },
      { path: 'apps/leads/create', element: <CreateLead /> },
      { path: 'apps/leads/edit/:id', element: <EditLeads /> },
      { path: 'apps/blog/post', element: <Blog /> },
      { path: 'apps/blog/detail/:id', element: <BlogDetail /> },
      { path: 'user-profile', element: <UserProfile /> },
      { path: 'icons/iconify', element: <SolarIcon /> },
      { path: 'cms/page-sections', element: <CmsPageSections /> },
      { path: 'cms/navigation-menu', element: <CmsNavigationMenu /> },
      { path: 'settings/school-features', element: <SpecificSchoolSettings /> },
      { path: 'settings/menu-builder', element: <MasterMenuBuilder /> },
      { path: 'settings/client-logos', element: <CmsClientLogos /> },
      { path: '*', element: <Navigate to="/auth/404" state={{ from: 'super' }} /> },
    ],
  },

  // Authentication Routes
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
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },

  // Legacy route redirects for backward compatibility
  { path: '/dashboard', element: <Navigate to="/super/dashboard" replace /> },
  { path: '/school-dashboard', element: <Navigate to="/school/dashboard" replace /> },
  { path: '/teacher-dashboard', element: <Navigate to="/school/teacher-dashboard" replace /> },

  // Catch-all 404
  { path: '*', element: <Navigate to="/auth/404" state={{ from: 'root' }} /> },
];

const router = createBrowserRouter(Router);

export default router;