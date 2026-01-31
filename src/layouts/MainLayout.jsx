import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Layout/Sidebar';
import Header from '../components/Layout/Header';

const MainLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="main-layout">
            <Sidebar isOpen={sidebarOpen} />
            <div className={`layout-content ${!sidebarOpen ? 'sidebar-collapsed' : ''}`}>
                <Header toggleSidebar={toggleSidebar} />
                <main className="page-wrapper">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
