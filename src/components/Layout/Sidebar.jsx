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
                    { title: 'Admin Dashboard', path: '/dashboard' },
                    { title: 'Teacher Dashboard', path: '/teacher-dashboard' },
                    { title: 'Student Dashboard', path: '/student-dashboard' },
                    { title: 'Parent Dashboard', path: '/parent-dashboard' }
                ]
            },
            {
                title: 'Application',
                icon: IconApps,
                subItems: [
                    { title: 'Chat', path: '/chat' },
                    { title: 'Calendar', path: '/calendar' },
                    { title: 'Email', path: '/email' },
                    { title: 'To Do', path: '/todo' },
                    { title: 'Notes', path: '/notes' }
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
                    { title: 'All Students', path: '/students' },
                    { title: 'Student List', path: '/students/list' },
                    { title: 'Student Details', path: '/students/details' }
                ]
            },
            {
                title: 'Parents',
                icon: IconUsers,
                subItems: [
                    { title: 'All Parents', path: '/parents' },
                    { title: 'Parent List', path: '/parents/list' }
                ]
            },
            {
                title: 'Guardians',
                icon: IconUserPlus,
                subItems: [
                    { title: 'All Guardians', path: '/guardians' },
                    { title: 'Guardian List', path: '/guardians/list' }
                ]
            },
            {
                title: 'Teachers',
                icon: IconSchool,
                subItems: [
                    { title: 'All Teachers', path: '/teachers' },
                    { title: 'Teacher List', path: '/teachers/list' },
                    { title: 'Teacher Details', path: '/teachers/details' }
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
                    { title: 'All Classes', path: '/classes' },
                    { title: 'Schedule', path: '/classes/schedule' }
                ]
            },
            { title: 'Class Room', icon: IconHome, path: '/classroom' },
            { title: 'Class Routine', icon: IconClock, path: '/routine' },
            { title: 'Section', icon: IconLayoutSidebar, path: '/section' },
            { title: 'Subject', icon: IconBooks, path: '/subjects' },
            { title: 'Syllabus', icon: IconFileText, path: '/syllabus' },
            { title: 'Time Table', icon: IconCalendar, path: '/timetable' },
            { title: 'Home Work', icon: IconClipboard, path: '/homework' },
            {
                title: 'Examinations',
                icon: IconClipboard,
                subItems: [
                    { title: 'Exam', path: '/exam' },
                    { title: 'Exam Schedule', path: '/exam/schedule' },
                    { title: 'Grade', path: '/exam/grade' },
                    { title: 'Exam Results', path: '/exam/results' }
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
                    { title: 'Fees Group', path: '/fees/group' },
                    { title: 'Fees Type', path: '/fees/type' },
                    { title: 'Fees Master', path: '/fees/master' },
                    { title: 'Collect Fees', path: '/fees/collect' }
                ]
            },
            {
                title: 'Library',
                icon: IconBooks,
                subItems: [
                    { title: 'Books', path: '/library/books' },
                    { title: 'Issue/Return', path: '/library/issue' },
                    { title: 'Members', path: '/library/members' }
                ]
            },
            { title: 'Sports', icon: IconBallFootball, path: '/sports' },
            { title: 'Hostel', icon: IconBed, path: '/hostel' },
            { title: 'Transport', icon: IconTruck, path: '/transport' }
        ]
    },
    {
        group: 'HRM',
        items: [
            { title: 'Staffs', icon: IconBriefcase, path: '/staff' },
            { title: 'Departments', icon: IconBuildingBank, path: '/departments' },
            { title: 'Designation', icon: IconUserCircle, path: '/designation' },
            {
                title: 'Attendance',
                icon: IconCalendar,
                subItems: [
                    { title: 'Student Attendance', path: '/attendance/student' },
                    { title: 'Staff Attendance', path: '/attendance/staff' }
                ]
            },
            { title: 'Leaves', icon: IconBeach, path: '/leaves' },
            { title: 'Holidays', icon: IconCalendar, path: '/holidays' },
            { title: 'Payroll', icon: IconCreditCard, path: '/payroll' }
        ]
    },
    {
        group: 'Reports',
        items: [
            { title: 'Attendance Report', icon: IconChartBar, path: '/reports/attendance' },
            { title: 'Class Report', icon: IconChartBar, path: '/reports/class' },
            { title: 'Student Report', icon: IconChartPie, path: '/reports/student' },
            { title: 'Grade Report', icon: IconReportAnalytics, path: '/reports/grade' },
            { title: 'Fees Report', icon: IconReportAnalytics, path: '/reports/fees' }
        ]
    },
    {
        group: 'User Management',
        items: [
            { title: 'Users', icon: IconUsers, path: '/users' },
            { title: 'Roles & Permissions', icon: IconLock, path: '/roles' }
        ]
    },
    {
        group: 'Announcements',
        items: [
            { title: 'Notice Board', icon: IconBell, path: '/announcements' },
            { title: 'Events', icon: IconCalendar, path: '/events' }
        ]
    },
    {
        group: 'Settings',
        items: [
            { title: 'General Settings', icon: IconSettings, path: '/settings/general' },
            { title: 'Website Settings', icon: IconSettings, path: '/settings/website' },
            { title: 'App Settings', icon: IconSettings, path: '/settings/app' },
            { title: 'System Settings', icon: IconSettings, path: '/settings/system' }
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
