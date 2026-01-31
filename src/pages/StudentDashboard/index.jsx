import React, { useState } from 'react';
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

            {/* Main Content - 3 Column Layout */}
            <div className="student-dashboard-content">
                {/* Left Column - Student Profile */}
                <div className="student-left-column">
                    <StudentProfileCard />
                </div>

                {/* Middle Column */}
                <div className="student-middle-column">
                    <StudentAttendance />
                    <StudentQuickLinks />
                    <StudentSchedules />
                    <StudentPerformance />
                    <StudentHomework />
                </div>

                {/* Right Column */}
                <div className="student-right-column">
                    <ClassFaculties />
                    <LeaveStatus />
                    <StudentExamResult />
                    <StudentFeesReminder />
                    <StudentNoticeBoard />
                    <StudentSyllabus />
                    <StudentTodo />
                </div>
            </div>

            {/* Footer */}
            <footer className="dashboard-footer">
                <p>Copyright © 2024 MindWhile. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default StudentDashboard;
