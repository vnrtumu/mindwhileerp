import { FC } from 'react';
import { Outlet } from 'react-router';
import Sidebar from '../../src/components/Layout/Sidebar';
import Header from '../../src/components/Layout/Header';
// @ts-ignore
import { ThemeProvider } from '../../src/context/ThemeContext';

const SchoolAdminLayout: FC = () => {
    return (
        <ThemeProvider>
            <div className="flex w-full min-h-screen">
                <Sidebar isOpen={true} />
                <div className="layout-content flex-1">
                    <Header toggleSidebar={() => { }} />
                    <main className="page-wrapper">
                        <Outlet />
                    </main>
                </div>
            </div>
        </ThemeProvider>
    );
};

export default SchoolAdminLayout;
