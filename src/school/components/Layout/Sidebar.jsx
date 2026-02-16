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
                    { title: 'Collect Fees', path: '/school/finance/collect-fees' },
                    { title: 'Search Due Fees', path: '/school/finance/search-due-fees' },
                    { title: 'All Transactions', path: '/school/finance/all-transactions' },
                    { title: 'Online Transactions', path: '/school/finance/online-transactions' },
                    { title: 'Fees Carry Forward', path: '/school/finance/fees-carry-forward' },
                    { title: 'Assign Fees', path: '/school/finance/assign-fees' },
                    { title: 'Fees Master', path: '/school/finance/fees-master' },
                    { title: 'Fee Groups', path: '/school/finance/fee-groups' },
                    { title: 'Fees Discount', path: '/school/finance/fees-discount' },
                    { title: 'Fee Types', path: '/school/finance/fee-types' },
                    { title: 'Fee Permissions', path: '/school/finance/fee-permissions' }
                ]
            },
            {
                title: 'Accounts',
                icon: IconWallet,
                subItems: [
                    { title: 'Income', path: '/school/accounts/income' },
                    { title: 'Income Heads', path: '/school/accounts/income-heads' },
                    { title: 'Expense', path: '/school/accounts/expense' },
                    { title: 'Expense Heads', path: '/school/accounts/expense-heads' }
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
                    { title: 'Student List', path: '/school/student-list' },
                    { title: 'Quick Student Admission', path: '/school/quick-admission' },
                    { title: 'Student Attendance', path: '/school/student-attendance' },
                    { title: 'Behavior Records', path: '/school/behavior-records' },
                    { title: 'Student Categories', path: '/school/student-categories' },
                    { title: 'Disabled Students', path: '/school/disabled-students' },
                    { title: 'Bulk Edit', path: '/school/bulk-edit' }
                ]
            },
            {
                title: 'Teachers',
                icon: IconUsers,
                subItems: [
                    { title: 'All Teachers', path: '/school/teachers/all' },
                    { title: 'Teachers List', path: '/school/teachers/list' },
                    { title: 'Routine', path: '/school/teachers/routine' }
                ]
            },
            {
                title: 'Academics',
                icon: IconSchool,
                subItems: [
                    { title: 'Classes', path: '/school/academics/classes' },
                    { title: 'Sections', path: '/school/academics/sections' },
                    { title: 'Subjects', path: '/school/academics/subjects' },
                    { title: 'Assign Subjects', path: '/school/academics/assign-subjects' },
                    { title: 'Assign Class Teacher', path: '/school/academics/assign-class-teacher' },
                    { title: 'Manage Periods', path: '/school/academics/manage-periods' },
                    { title: 'Class Timetable', path: '/school/academics/class-timetable' },
                    { title: 'Promote Students', path: '/school/academics/promote-students' },
                    { title: 'Homework', path: '/school/academics/homework' }
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
                title: 'Exam',
                icon: IconPencil,
                subItems: [
                    { title: 'Exam Dashboard', path: '/school/exam/dashboard' },
                    { title: 'Exam Schedule', path: '/school/exam/schedule' }
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
