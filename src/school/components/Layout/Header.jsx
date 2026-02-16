import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../components/provider/theme-provider';
import {
    CalendarIcon, PlusIcon, MoonIcon, BellIcon, MessageIcon,
    ChartBarIcon, MaximizeIcon, MenuIcon, SearchIcon,
    UserIcon, SettingsIcon, LogoutIcon, ChevronDownIcon, SunIcon
} from '../../assets/icons';
import './Layout.css';

// Custom icons for Add Menu
const StudentIcon = ({ size = 24, color = '#fff' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
        <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
    </svg>
);

const TeachersIcon = ({ size = 24, color = '#fff' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"></path>
        <circle cx="19" cy="11" r="2"></circle>
        <path d="M19 8v1"></path>
        <path d="M19 13v1"></path>
    </svg>
);

const StaffsIcon = ({ size = 24, color = '#fff' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="3"></circle>
        <circle cx="5" cy="19" r="3"></circle>
        <circle cx="19" cy="19" r="3"></circle>
        <path d="M12 8v4"></path>
        <path d="M8 14l4-2 4 2"></path>
    </svg>
);

const InvoiceIcon = ({ size = 24, color = '#fff' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2"></rect>
        <line x1="9" y1="6" x2="15" y2="6"></line>
        <line x1="9" y1="10" x2="15" y2="10"></line>
        <line x1="9" y1="14" x2="12" y2="14"></line>
    </svg>
);

const Header = ({ toggleSidebar }) => {
    const { theme, setTheme } = useTheme();
    const isDarkMode = theme === 'dark';

    const toggleTheme = () => {
        setTheme(isDarkMode ? 'light' : 'dark');
    };
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [showAddDropdown, setShowAddDropdown] = useState(false);
    const [showYearDropdown, setShowYearDropdown] = useState(false);
    const [selectedYear, setSelectedYear] = useState('2024 / 2025');

    const profileRef = useRef(null);
    const addRef = useRef(null);
    const yearRef = useRef(null);
    const navigate = useNavigate();

    const academicYears = [
        '2024 / 2025',
        '2023 / 2024',
        '2022 / 2023',
        '2021 / 2022'
    ];

    const addMenuItems = [
        { title: 'Students', icon: StudentIcon, path: '/students/add', color: '#3d5ee1', bgColor: '#e8f0ff' },
        { title: 'Teachers', icon: TeachersIcon, path: '/teachers/add', color: '#22c55e', bgColor: '#e5f9ed' },
        { title: 'Staffs', icon: StaffsIcon, path: '/staff/add', color: '#f59e0b', bgColor: '#fef3c7' },
        { title: 'Invoice', icon: InvoiceIcon, path: '/invoice/add', color: '#3d5ee1', bgColor: '#e0f2fe' }
    ];

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setShowProfileDropdown(false);
            }
            if (addRef.current && !addRef.current.contains(event.target)) {
                setShowAddDropdown(false);
            }
            if (yearRef.current && !yearRef.current.contains(event.target)) {
                setShowYearDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/login');
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };

    const handleYearSelect = (year) => {
        setSelectedYear(year);
        setShowYearDropdown(false);
    };

    return (
        <header className="top-header">
            <div className="header-left">
                <button className="toggle-btn" onClick={toggleSidebar}>
                    <MenuIcon size={22} color="#ffffff" />
                </button>
                <div className="header-search">
                    <SearchIcon size={18} color="var(--text-light)" />
                    <input type="text" placeholder="Search..." />
                </div>
            </div>

            <div className="header-right">
                {/* Academic Year Dropdown */}
                <div className="academic-dropdown-container" ref={yearRef}>
                    <button
                        className="academic-year-badge"
                        onClick={() => setShowYearDropdown(!showYearDropdown)}
                    >
                        <CalendarIcon size={18} color="var(--bodytext)" />
                        <span>Academic Year : {selectedYear}</span>
                        <ChevronDownIcon size={16} color="var(--bodytext)" />
                    </button>

                    {showYearDropdown && (
                        <div className="academic-dropdown">
                            {academicYears.map((year, index) => (
                                <div
                                    key={index}
                                    className={`academic-dropdown-item ${year === selectedYear ? 'active' : ''}`}
                                    onClick={() => handleYearSelect(year)}
                                >
                                    Academic Year : {year}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Add New Dropdown */}
                <div className="add-dropdown-container" ref={addRef}>
                    <button
                        className="header-icon-btn"
                        onClick={() => setShowAddDropdown(!showAddDropdown)}
                    >
                        <PlusIcon size={20} color="var(--bodytext)" />
                    </button>

                    {showAddDropdown && (
                        <div className="add-dropdown">
                            <h6 className="add-dropdown-title">Add New</h6>
                            <div className="add-dropdown-grid">
                                {addMenuItems.map((item, index) => (
                                    <a
                                        key={index}
                                        href={item.path}
                                        className="add-dropdown-item"
                                        style={{ backgroundColor: item.bgColor }}
                                    >
                                        <div
                                            className="add-item-icon"
                                            style={{ backgroundColor: item.color }}
                                        >
                                            <item.icon size={24} color="#fff" />
                                        </div>
                                        <span>{item.title}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Dark/Light Mode Toggle */}
                <button className="header-icon-btn theme-toggle" onClick={toggleTheme} title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
                    {isDarkMode ? (
                        <SunIcon size={20} color="#f59e0b" />
                    ) : (
                        <MoonIcon size={20} color="var(--bodytext)" />
                    )}
                </button>

                {/* Notifications */}
                <button className="header-icon-btn has-notification">
                    <BellIcon size={20} color="var(--bodytext)" />
                    <span className="notification-dot red"></span>
                </button>

                {/* Messages */}
                <button className="header-icon-btn has-notification">
                    <MessageIcon size={20} color="var(--bodytext)" />
                    <span className="notification-dot blue"></span>
                </button>

                {/* Analytics */}
                <button className="header-icon-btn">
                    <ChartBarIcon size={20} color="var(--bodytext)" />
                </button>

                {/* Fullscreen */}
                <button className="header-icon-btn" onClick={toggleFullscreen}>
                    <MaximizeIcon size={20} color="var(--bodytext)" />
                </button>

                {/* Profile with Dropdown */}
                <div className="profile-dropdown-container" ref={profileRef}>
                    <div
                        className="user-profile-btn"
                        onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    >
                        <img
                            src="https://randomuser.me/api/portraits/men/75.jpg"
                            alt="User"
                            className="header-user-avatar"
                        />
                    </div>

                    {/* Dropdown Menu */}
                    {showProfileDropdown && (
                        <div className="profile-dropdown">
                            <div className="dropdown-header">
                                <div className="dropdown-avatar-container">
                                    <img
                                        src="https://randomuser.me/api/portraits/men/75.jpg"
                                        alt="User"
                                        className="dropdown-avatar"
                                    />
                                    <span className="online-indicator"></span>
                                </div>
                                <div className="dropdown-user-info">
                                    <span className="dropdown-user-name">Kevin Larry</span>
                                    <span className="dropdown-user-role">Administrator</span>
                                </div>
                            </div>

                            <div className="dropdown-divider"></div>

                            <ul className="dropdown-menu-list">
                                <li>
                                    <a href="/profile" className="dropdown-menu-item">
                                        <UserIcon size={18} color="var(--bodytext)" />
                                        <span>My Profile</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="/settings" className="dropdown-menu-item">
                                        <SettingsIcon size={18} color="var(--bodytext)" />
                                        <span>Settings</span>
                                    </a>
                                </li>
                                <li>
                                    <button onClick={handleLogout} className="dropdown-menu-item logout-btn">
                                        <LogoutIcon size={18} color="#ea5455" />
                                        <span>Logout</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
