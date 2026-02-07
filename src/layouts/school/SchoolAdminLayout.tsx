import { FC } from 'react';
import { Outlet } from 'react-router';
import Sidebar from '../../school/components/Layout/Sidebar';
import Header from '../../school/components/Layout/Header';
// @ts-ignore
import { ThemeProvider } from '../../school/context/ThemeContext';

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
