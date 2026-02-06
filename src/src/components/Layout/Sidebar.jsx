import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    IconLayoutDashboard, IconApps, IconUser, IconUsers, IconUserPlus,
    IconSchool, IconBook, IconBooks, IconCalendar, IconClock,
    IconHome, IconClipboard, IconFileText, IconCash, IconBuildingBank,
    IconTruck, IconBallFootball, IconBed, IconSettings, IconReportAnalytics,
    IconChartPie, IconChartBar, IconBell, IconMail, IconLock,
    IconChevronDown, IconChevronRight, IconMenu2, IconUserCircle,
    IconBriefcase, IconCreditCard, IconBeach, IconLayoutSidebar,
    IconReceipt, IconSearch, IconRefresh, IconDiscount, IconShield,
    IconWallet, IconTrendingUp, IconTrendingDown, IconShoppingCart,
    IconUserCheck, IconAlertCircle, IconAccessible, IconBuilding,
    IconListDetails, IconFileInvoice, IconNotebook, IconPencil,
    IconDeviceLaptop, IconCertificate, IconFileDownload, IconMessage,
    IconBrandWhatsapp, IconMail as IconMailAlt, IconPrinter, IconCloud,
    IconDatabase, IconForms, IconUpload, IconMenu, IconZoomQuestion,
    IconId, IconTicket, IconClockHour4, IconHistory, IconPackage,
    IconCategory, IconUsersGroup, IconRoute, IconGps, IconDoor,
    IconKeyboard, IconWorld, IconApi, IconBackspace, IconFilePlus,
    IconArchive, IconAffiliate, IconVideo, IconMessages
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
            }
        ]
    },
    {
        group: 'Management',
        items: [
            {
                title: 'Finance & Fees',
                icon: IconCash,
                subItems: [
                    { title: 'Collect Fees', path: '/fees/collect' },
                    { title: 'Search Due Fees', path: '/fees/due' },
                    { title: 'All Transactions', path: '/fees/transactions' },
                    { title: 'Online Transactions', path: '/fees/online-transactions' },
                    { title: 'Fees Carry Forward', path: '/fees/carry-forward' },
                    { title: 'Assign Fees', path: '/fees/assign' },
                    { title: 'Fee Groups', path: '/fees/groups' },
                    { title: 'Fees Discount', path: '/fees/discount' },
                    { title: 'Fee Types', path: '/fees/types' },
                    { title: 'Fee Permissions', path: '/fees/permissions' }
                ]
            },
            {
                title: 'Accounts',
                icon: IconWallet,
                subItems: [
                    { title: 'Income', path: '/accounts/income' },
                    { title: 'Income Heads', path: '/accounts/income-heads' },
                    { title: 'Expense', path: '/accounts/expense' },
                    { title: 'Expense Heads', path: '/accounts/expense-heads' }
                ]
            },
            {
                title: 'Book Sales',
                icon: IconShoppingCart,
                subItems: [
                    { title: 'Books Sales', path: '/book-sales' }
                ]
            },
            {
                title: 'Student Information',
                icon: IconUser,
                subItems: [
                    { title: 'Student List', path: '/students/list' },
                    { title: 'Student Attendance', path: '/students/attendance' },
                    { title: 'Behavior Records', path: '/students/behavior' },
                    { title: 'Student Categories', path: '/students/categories' },
                    { title: 'Disabled Students', path: '/students/disabled' }
                ]
            },
            {
                title: 'Academics',
                icon: IconSchool,
                subItems: [
                    { title: 'Classes', path: '/classes' },
                    { title: 'Sections', path: '/sections' },
                    { title: 'Subjects', path: '/subjects' },
                    { title: 'Assign Subjects', path: '/assign-subjects' },
                    { title: 'Assign Class Teacher', path: '/assign-teacher' },
                    { title: 'Manage Periods', path: '/periods' },
                    { title: 'Class Timetable', path: '/timetable' },
                    { title: 'Promote Students', path: '/promote-students' },
                    { title: 'Homework', path: '/homework' }
                ]
            },
            {
                title: 'Front Office',
                icon: IconBuilding,
                subItems: [
                    { title: 'Visitor Book', path: '/front-office/visitors' },
                    { title: 'Complaints', path: '/front-office/complaints' },
                    { title: 'Postal Records', path: '/front-office/postal' }
                ]
            },
            {
                title: 'Offline Examinations',
                icon: IconPencil,
                subItems: [
                    { title: 'Exam', path: '/exam/offline' },
                    { title: 'Exam Types', path: '/exam/types' },
                    { title: 'Schedule & Marks Setup', path: '/exam/schedule-marks' },
                    { title: 'Marks', path: '/exam/marks' }
                ]
            },
            {
                title: 'Online Examinations',
                icon: IconDeviceLaptop,
                subItems: [
                    { title: 'Online Exam', path: '/exam/online' }
                ]
            },
            {
                title: 'Human Resource',
                icon: IconBriefcase,
                subItems: [
                    { title: 'Staff Attendance', path: '/hr/attendance' },
                    { title: 'Payroll', path: '/hr/payroll' },
                    { title: 'Set Salary', path: '/hr/salary' },
                    { title: 'Approve Leave Request', path: '/hr/leave-requests' },
                    { title: 'Leave Types', path: '/hr/leave-types' },
                    { title: 'Departments', path: '/hr/departments' },
                    { title: 'Designations', path: '/hr/designations' }
                ]
            },
            {
                title: 'Study Center',
                icon: IconBook,
                subItems: [
                    { title: 'Manage Resources', path: '/study/resources' },
                    { title: 'Assignments', path: '/study/assignments' },
                    { title: 'Live Classes', path: '/study/live-classes' }
                ]
            },
            {
                title: 'Certificates',
                icon: IconCertificate,
                subItems: [
                    { title: 'Certificate Templates', path: '/certificates/templates' },
                    { title: 'Generate Document', path: '/certificates/generate' }
                ]
            },
            {
                title: 'Communicate',
                icon: IconMessages,
                subItems: [
                    { title: 'Notice Board', path: '/communicate/notice' },
                    { title: 'Events & Holidays', path: '/communicate/events' },
                    { title: 'Compose Broadcast', path: '/communicate/broadcast' },
                    { title: 'Broadcast History', path: '/communicate/history' }
                ]
            },
            {
                title: 'Library',
                icon: IconBooks,
                subItems: [
                    { title: 'Issue/Return Book', path: '/library/issue-return' },
                    { title: 'Manage Books', path: '/library/books' },
                    { title: 'Book Categories', path: '/library/categories' }
                ]
            },
            {
                title: 'Inventory',
                icon: IconPackage,
                subItems: [
                    { title: 'Issue Item', path: '/inventory/issue' },
                    { title: 'Add Stock', path: '/inventory/stock' },
                    { title: 'Item List', path: '/inventory/items' },
                    { title: 'Item Categories', path: '/inventory/categories' },
                    { title: 'Suppliers', path: '/inventory/suppliers' }
                ]
            },
            {
                title: 'Transport',
                icon: IconTruck,
                subItems: [
                    { title: 'Manage Vehicles', path: '/transport/vehicles' },
                    { title: 'Manage Routes', path: '/transport/routes' },
                    { title: 'Live Vehicle Tracking', path: '/transport/tracking' }
                ]
            },
            {
                title: 'Hostel',
                icon: IconBed,
                subItems: [
                    { title: 'Student Allocation', path: '/hostel/allocation' },
                    { title: 'Manage Rooms', path: '/hostel/rooms' },
                    { title: 'Room Types', path: '/hostel/room-types' },
                    { title: 'Manage Hostels', path: '/hostel/manage' },
                    { title: 'Permissions', path: '/hostel/permissions' }
                ]
            },
            {
                title: 'Reports & Analytics',
                icon: IconReportAnalytics,
                subItems: [
                    { title: 'Class Report', path: '/reports/class' },
                    { title: 'Sponsorship Report', path: '/reports/sponsorship' },
                    { title: 'Student Report', path: '/reports/student' },
                    { title: 'ID Card Report', path: '/reports/id-card' },
                    { title: 'Hall Ticket Report', path: '/reports/hall-ticket' },
                    { title: 'Timetable Report', path: '/reports/timetable' },
                    { title: 'Exam Schedule Report', path: '/reports/exam-schedule' },
                    { title: 'Attendance Report', path: '/reports/attendance' },
                    { title: 'Library Books Report', path: '/reports/library' },
                    { title: 'Terminal Report', path: '/reports/terminal' },
                    { title: 'Merit Stage Report', path: '/reports/merit' },
                    { title: 'Online Exam', path: '/reports/online-exam' },
                    { title: 'Certificate Report', path: '/reports/certificate' },
                    { title: 'Leave Application Report', path: '/reports/leave' },
                    { title: 'Product Purchase Report', path: '/reports/purchase' },
                    { title: 'Product Sale Report', path: '/reports/sales' },
                    { title: 'Fees Report', path: '/reports/fees' },
                    { title: 'Due Fees Report', path: '/reports/due-fees' },
                    { title: 'Balance Fees Report', path: '/reports/balance-fees' },
                    { title: 'Transaction Report', path: '/reports/transactions' },
                    { title: 'Student Fine Report', path: '/reports/fines' },
                    { title: 'Overtime Report', path: '/reports/overtime' },
                    { title: 'Salary Report', path: '/reports/salary' },
                    { title: 'Audit Report', path: '/reports/audit' },
                    { title: 'Account Ledger Report', path: '/reports/ledger' }
                ]
            },
            {
                title: 'System Setting',
                icon: IconSettings,
                subItems: [
                    { title: 'General Setting', path: '/settings/general' },
                    { title: 'Session Setting', path: '/settings/session' },
                    { title: 'Notification Setting', path: '/settings/notifications' },
                    { title: 'WhatsApp Messaging', path: '/settings/whatsapp' },
                    { title: 'SMS Setting', path: '/settings/sms' },
                    { title: 'Email Setting', path: '/settings/email' },
                    { title: 'Payment Methods', path: '/settings/payments' },
                    { title: 'Print Header Footer', path: '/settings/print' },
                    { title: 'Thermal Print', path: '/settings/thermal-print' },
                    { title: 'Front CMS Setting', path: '/settings/cms' },
                    { title: 'Roles Permissions', path: '/settings/roles' },
                    { title: 'Backup Restore', path: '/settings/backup' },
                    { title: 'Users', path: '/settings/users' },
                    { title: 'Modules', path: '/settings/modules' },
                    { title: 'Custom Fields', path: '/settings/custom-fields' },
                    { title: 'Captcha Setting', path: '/settings/captcha' },
                    { title: 'System Fields', path: '/settings/system-fields' },
                    { title: 'Student Profile Update', path: '/settings/student-profile' },
                    { title: 'Online Admission', path: '/settings/admission' },
                    { title: 'File Types', path: '/settings/file-types' },
                    { title: 'Sidebar Menu', path: '/settings/sidebar' },
                    { title: 'System Update', path: '/settings/update' }
                ]
            }
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
