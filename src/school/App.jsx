import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { StudentProvider } from './context/StudentContext';
import Login from './components/Login/Login';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentDashboard from './pages/StudentDashboard';
import Income from './pages/Accounts/Income';
import CollectFees from './pages/Finance/CollectFees';
import SearchDueFees from './pages/Finance/SearchDueFees';
import AllTransactions from './pages/Finance/AllTransactions';
import OnlineTransactions from './pages/Finance/OnlineTransactions';
import FeesCarryForward from './pages/Finance/FeesCarryForward';
import AssignFees from './pages/Finance/AssignFees';
import FeeGroups from './pages/Finance/FeeGroups';
import FeesDiscount from './pages/Finance/FeesDiscount';
import FeeTypes from './pages/Finance/FeeTypes';
import FeePermissions from './pages/Finance/FeePermissions';

import StudentList from './pages/StudentInformation/StudentList';
import AttendanceListPage from './pages/StudentInformation/AttendanceListPage';
import AddAttendancePage from './pages/StudentInformation/AddAttendancePage';
import AttendancePortal from './pages/StudentInformation/AttendancePortal';
import BehaviorRecords from './pages/StudentInformation/BehaviorRecords';
import BehaviorRecordsListPage from './pages/StudentInformation/BehaviorRecordsListPage';
import AddBehaviorRecordPage from './pages/StudentInformation/AddBehaviorRecordPage';
import StudentCategories from './pages/StudentInformation/StudentCategories';
import AddStudentCategoryPage from './pages/StudentInformation/AddStudentCategoryPage';

import DisabledStudents from './pages/StudentInformation/DisabledStudents';
import AddStudent from './pages/StudentInformation/AddStudent';
import StudentProfile from './pages/StudentInformation/StudentProfile';
import DisableStudentPage from './pages/StudentInformation/DisableStudentPage';

import Classes from './pages/Academics/Classes';
import Sections from './pages/Academics/Sections';
import Subjects from './pages/Academics/Subjects';
import AssignSubjects from './pages/Academics/AssignSubjects';
import AssignClassTeacher from './pages/Academics/AssignClassTeacher';
import ManagePeriods from './pages/Academics/ManagePeriods';
import ClassTimetable from './pages/Academics/ClassTimetable';
import PromoteStudents from './pages/Academics/PromoteStudents';
import Homework from './pages/Academics/Homework';

import { AcademicsProvider } from './context/AcademicsContext';

function App() {
  return (
    <ThemeProvider>
      <StudentProvider>
        <AcademicsProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />

<<<<<<< HEAD:src/App.jsx
              {/* Protected Routes Wrapper */}
              <Route path="/" element={<MainLayout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="student-dashboard" element={<StudentDashboard />} />
                <Route path="students" element={<div>Students Page</div>} />
                <Route path="teachers" element={<div>Teachers Page</div>} />
                <Route path="departments" element={<div>Departments Page</div>} />
                <Route path="accounts" element={<div>Accounts Page</div>} />
                <Route path="accounts/income" element={<Income />} />

                {/* Finance & Fees Routes */}
                <Route path="finance/collect-fees" element={<CollectFees />} />
                <Route path="finance/search-due-fees" element={<SearchDueFees />} />
                <Route path="finance/all-transactions" element={<AllTransactions />} />
                <Route path="finance/online-transactions" element={<OnlineTransactions />} />
                <Route path="finance/fees-carry-forward" element={<FeesCarryForward />} />
                <Route path="finance/assign-fees" element={<AssignFees />} />
                <Route path="finance/fee-groups" element={<FeeGroups />} />
                <Route path="finance/fees-discount" element={<FeesDiscount />} />
                <Route path="finance/fee-permissions" element={<FeePermissions />} />

                {/* Student Information Routes */}
                <Route path="student-info/student-list" element={<StudentList />} />
                <Route path="student-info/student-list/add" element={<AddStudent />} />
                <Route path="student-info/student-list/profile/:id" element={<StudentProfile />} />
                <Route path="student-info/student-list/disable/:id" element={<DisableStudentPage />} />
                <Route path="student-info/student-attendance" element={<AttendanceListPage />} />
                <Route path="student-info/student-attendance/add" element={<AddAttendancePage />} />
                <Route path="student-info/student-attendance/add/portal" element={<AttendancePortal />} />
                <Route path="student-info/behavior-records" element={<BehaviorRecordsListPage />} />
                <Route path="student-info/behavior-records/add" element={<AddBehaviorRecordPage />} />
                <Route path="student-info/student-categories" element={<StudentCategories />} />
                <Route path="student-info/student-categories/add" element={<AddStudentCategoryPage />} />
                <Route path="student-info/disabled-students" element={<DisabledStudents />} />
                <Route path="students/disabled" element={<DisabledStudents />} />

                {/* Academics Routes */}
                <Route path="academics/classes" element={<Classes />} />
                <Route path="academics/sections" element={<Sections />} />
                <Route path="academics/subjects" element={<Subjects />} />
                <Route path="academics/assign-subjects" element={<AssignSubjects />} />
                <Route path="academics/assign-class-teacher" element={<AssignClassTeacher />} />
                <Route path="academics/manage-periods" element={<ManagePeriods />} />
                <Route path="academics/class-timetable" element={<ClassTimetable />} />
                <Route path="academics/promote-students" element={<PromoteStudents />} />
                <Route path="academics/homework" element={<Homework />} />
              </Route>
            </Routes>
          </Router>
        </AcademicsProvider>
      </StudentProvider>
=======
          {/* Protected Routes Wrapper */}
          <Route path="/" element={<MainLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="teacher-dashboard" element={<TeacherDashboard />} />
            <Route path="student-dashboard" element={<StudentDashboard />} />
            <Route path="students" element={<div>Students Page</div>} />
            <Route path="teachers" element={<div>Teachers Page</div>} />
            <Route path="departments" element={<div>Departments Page</div>} />
            <Route path="accounts" element={<div>Accounts Page</div>} />
            <Route path="accounts/income" element={<Income />} />
          </Route>
        </Routes>
      </Router>
>>>>>>> dd19bf874bfe1257e03bb23ed12aae1f1cc51940:src/school/App.jsx
    </ThemeProvider>
  );
}

export default App;

