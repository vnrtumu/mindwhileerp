import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    IconLayoutDashboard, IconApps, IconUser, IconUsers, IconUserPlus,
    IconSchool, IconBook, IconBooks, IconCalendar, IconClock,
    IconHome, IconClipboard, IconFileText, IconCash, IconBuildingBank,
    IconTruck, IconBallFootball, IconBed, IconSettings, IconReportAnalytics,
    IconChartPie, IconChartBar, IconBell, IconMail, IconLock,
    IconChevronDown, IconChevronRight, IconMenu2, IconUserCircle,
    IconBriefcase, IconCreditCard, IconBeach, IconLayoutSidebar
} from '@tabler/icons-react';
import './Layout.css';

const menuData = [
    {
        group: 'Main',
        items: [
            {
                title: 'Dashboard',
                icon: IconLayoutDashboard,
                subItems: [
                    { title: 'Admin Dashboard', path: '/school/dashboard' },
                    { title: 'Teacher Dashboard', path: '/school/teacher-dashboard' },
                    { title: 'Student Dashboard', path: '/school/student-dashboard' },
                    { title: 'Parent Dashboard', path: '/school/parent-dashboard' }
                ]
            },
            {
                title: 'Application',
                icon: IconApps,
                subItems: [
                    { title: 'Chat', path: '/school/chat' },
                    { title: 'Calendar', path: '/school/calendar' },
                    { title: 'Email', path: '/school/email' },
                    { title: 'To Do', path: '/school/todo' },
                    { title: 'Notes', path: '/school/notes' }
                ]
            }
        ]
    },
    {
        group: 'Peoples',
        items: [
            {
                title: 'Students',
                icon: IconUser,
                subItems: [
                    { title: 'All Students', path: '/school/students' },
                    { title: 'Student List', path: '/school/students/list' },
                    { title: 'Student Details', path: '/school/students/details' }
                ]
            },
            {
                title: 'Parents',
                icon: IconUsers,
                subItems: [
                    { title: 'All Parents', path: '/school/parents' },
                    { title: 'Parent List', path: '/school/parents/list' }
                ]
            },
            {
                title: 'Guardians',
                icon: IconUserPlus,
                subItems: [
                    { title: 'All Guardians', path: '/school/guardians' },
                    { title: 'Guardian List', path: '/school/guardians/list' }
                ]
            },
            {
                title: 'Teachers',
                icon: IconSchool,
                subItems: [
                    { title: 'All Teachers', path: '/school/teachers' },
                    { title: 'Teacher List', path: '/school/teachers/list' },
                    { title: 'Teacher Details', path: '/school/teachers/details' }
                ]
            }
        ]
    },
    {
        group: 'Academic',
        items: [
            {
                title: 'Classes',
                icon: IconBook,
                subItems: [
                    { title: 'All Classes', path: '/school/classes' },
                    { title: 'Schedule', path: '/school/classes/schedule' }
                ]
            },
            { title: 'Class Room', icon: IconHome, path: '/school/classroom' },
            { title: 'Class Routine', icon: IconClock, path: '/school/routine' },
            { title: 'Section', icon: IconLayoutSidebar, path: '/school/section' },
            { title: 'Subject', icon: IconBooks, path: '/school/subjects' },
            { title: 'Syllabus', icon: IconFileText, path: '/school/syllabus' },
            { title: 'Time Table', icon: IconCalendar, path: '/school/timetable' },
            { title: 'Home Work', icon: IconClipboard, path: '/school/homework' },
            {
                title: 'Examinations',
                icon: IconClipboard,
                subItems: [
                    { title: 'Exam', path: '/school/exam' },
                    { title: 'Exam Schedule', path: '/school/exam/schedule' },
                    { title: 'Grade', path: '/school/exam/grade' },
                    { title: 'Exam Results', path: '/school/exam/results' }
                ]
            }
        ]
    },
    {
        group: 'Management',
        items: [
            {
                title: 'Fees Collection',
                icon: IconCash,
                subItems: [
                    { title: 'Fees Group', path: '/school/fees/group' },
                    { title: 'Fees Type', path: '/school/fees/type' },
                    { title: 'Fees Master', path: '/school/fees/master' },
                    { title: 'Collect Fees', path: '/school/fees/collect' }
                ]
            },
            {
                title: 'Library',
                icon: IconBooks,
                subItems: [
                    { title: 'Books', path: '/school/library/books' },
                    { title: 'Issue/Return', path: '/school/library/issue' },
                    { title: 'Members', path: '/school/library/members' }
                ]
            },
            { title: 'Sports', icon: IconBallFootball, path: '/school/sports' },
            { title: 'Hostel', icon: IconBed, path: '/school/hostel' },
            { title: 'Transport', icon: IconTruck, path: '/school/transport' }
        ]
    },
    {
        group: 'HRM',
        items: [
            { title: 'Staffs', icon: IconBriefcase, path: '/school/staff' },
            { title: 'Departments', icon: IconBuildingBank, path: '/school/departments' },
            { title: 'Designation', icon: IconUserCircle, path: '/school/designation' },
            {
                title: 'Attendance',
                icon: IconCalendar,
                subItems: [
                    { title: 'Student Attendance', path: '/school/attendance/student' },
                    { title: 'Staff Attendance', path: '/school/attendance/staff' }
                ]
            },
            { title: 'Leaves', icon: IconBeach, path: '/school/leaves' },
            { title: 'Holidays', icon: IconCalendar, path: '/school/holidays' },
            { title: 'Payroll', icon: IconCreditCard, path: '/school/payroll' }
        ]
    },
    {
        group: 'Reports',
        items: [
            { title: 'Attendance Report', icon: IconChartBar, path: '/school/reports/attendance' },
            { title: 'Class Report', icon: IconChartBar, path: '/school/reports/class' },
            { title: 'Student Report', icon: IconChartPie, path: '/school/reports/student' },
            { title: 'Grade Report', icon: IconReportAnalytics, path: '/school/reports/grade' },
            { title: 'Fees Report', icon: IconReportAnalytics, path: '/school/reports/fees' }
        ]
    },
    {
        group: 'User Management',
        items: [
            { title: 'Users', icon: IconUsers, path: '/school/users' },
            { title: 'Roles & Permissions', icon: IconLock, path: '/school/roles' }
        ]
    },
    {
        group: 'Announcements',
        items: [
            { title: 'Notice Board', icon: IconBell, path: '/school/announcements' },
            { title: 'Events', icon: IconCalendar, path: '/school/events' }
        ]
    },
    {
        group: 'Settings',
        items: [
            { title: 'General Settings', icon: IconSettings, path: '/school/settings/general' },
            { title: 'Website Settings', icon: IconSettings, path: '/school/settings/website' },
            { title: 'App Settings', icon: IconSettings, path: '/school/settings/app' },
            { title: 'System Settings', icon: IconSettings, path: '/school/settings/system' }
        ]
    }
];

const SidebarMenuItem = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const IconComponent = item.icon;

    const handleClick = (e) => {
        if (hasSubItems) {
            e.preventDefault();
            setIsOpen(!isOpen);
        }
    };

    if (hasSubItems) {
        return (
            <div className="menu-item-container">
                <a
                    href="#"
                    className={`menu-item ${isOpen ? 'active' : ''}`}
                    onClick={handleClick}
                >
                    <span className="menu-item-content">
                        <IconComponent size={18} stroke={1.5} />
                        <span className="menu-title-text">{item.title}</span>
                    </span>
                    {isOpen ? <IconChevronDown size={16} /> : <IconChevronRight size={16} />}
                </a>
                {isOpen && (
                    <ul className="submenu">
                        {item.subItems.map((sub, idx) => (
                            <li key={idx}>
                                <NavLink
                                    to={sub.path}
                                    className={({ isActive }) => `submenu-link ${isActive ? 'active' : ''}`}
                                >
                                    {sub.title}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
    }

    return (
        <NavLink
            to={item.path || '#'}
            className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}
        >
            <span className="menu-item-content">
                <IconComponent size={18} stroke={1.5} />
                <span className="menu-title-text">{item.title}</span>
            </span>
        </NavLink>
    );
};

const Sidebar = ({ isOpen }) => {
    return (
        <aside className={`sidebar ${!isOpen ? 'collapsed' : ''}`}>
            <div className="sidebar-header">
                <div className="logo">
                    <IconMenu2 size={28} className="logo-icon" />
                    {isOpen && <span className="logo-text">MindWhile</span>}
                </div>
            </div>

            <div className="sidebar-menu">
                {menuData.map((section, idx) => (
                    <div key={idx} className="menu-section">
                        <h6 className="menu-group-title">{section.group}</h6>
                        <ul className="menu-list">
                            {section.items.map((item, itemIdx) => (
                                <li key={itemIdx}>
                                    <SidebarMenuItem item={item} />
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </aside>
    );
};

export default Sidebar;
