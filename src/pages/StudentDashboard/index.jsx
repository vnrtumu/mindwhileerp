import React from 'react';
import StudentProfileCard from './components/StudentProfileCard';
import StudentAttendance from './components/StudentAttendance';
import StudentQuickLinks from './components/StudentQuickLinks';
import StudentSchedules from './components/StudentSchedules';
import StudentPerformance from './components/StudentPerformance';
import StudentHomework from './components/StudentHomework';
import ClassFaculties from './components/ClassFaculties';
import LeaveStatus from './components/LeaveStatus';
import StudentExamResult from './components/StudentExamResult';
import StudentFeesReminder from './components/StudentFeesReminder';
import StudentNoticeBoard from './components/StudentNoticeBoard';
import StudentSyllabus from './components/StudentSyllabus';
import StudentTodo from './components/StudentTodo';
import './StudentDashboard.css';

const StudentDashboard = () => {
    return (
        <div className="student-dashboard-page">
            {/* Page Header */}
            <div className="page-header">
                <div className="page-title">
                    <h4>Student Dashboard</h4>
                    <nav className="breadcrumb">
                        <span>Dashboard</span> / <span className="current">Student Dashboard</span>
                    </nav>
                </div>
            </div>

            {/* Top Row - Profile, Attendance, Quick Links */}
            <div className="dashboard-top-row">
                <div className="profile-column">
                    <StudentProfileCard />
                </div>
                <div className="attendance-column">
                    <StudentAttendance />
                </div>
                <div className="quicklinks-column">
                    <StudentQuickLinks />
                </div>
            </div>

            {/* Schedules Section - Full Width with Calendar */}
            <div className="dashboard-section">
                <StudentSchedules />
            </div>

            {/* Performance Section */}
            <div className="dashboard-section">
                <StudentPerformance />
            </div>

            {/* Home Works Section */}
            <div className="dashboard-section">
                <StudentHomework />
            </div>

            {/* Class Faculties Section */}
            <div className="dashboard-section">
                <ClassFaculties />
            </div>

            {/* Leave Status & Exam Result - Side by Side */}
            <div className="dashboard-two-column">
                <LeaveStatus />
                <StudentExamResult />
            </div>

            {/* Fees Reminder Section */}
            <div className="dashboard-section">
                <StudentFeesReminder />
            </div>

            {/* Notice Board, Syllabus, Todo - Three Columns */}
            <div className="dashboard-three-column">
                <StudentNoticeBoard />
                <StudentSyllabus />
                <StudentTodo />
            </div>

            {/* Footer */}
            <footer className="dashboard-footer">
                <p>Copyright © 2024 MindWhile. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default StudentDashboard;
