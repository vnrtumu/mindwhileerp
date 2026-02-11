import React from 'react';
import { IconRefresh, IconPrinter, IconFileExport, IconChevronDown, IconFileTypePdf, IconFileTypeXls } from '@tabler/icons-react';
import './Academics.css';

const AcademicsPlaceholder = ({ title }) => {
    const [showExportMenu, setShowExportMenu] = React.useState(false);

    return (
        <div className="academics-page">
            <div className="page-header-row">
                <div className="breadcrumb">
                    <h2>{title}</h2>
                    <span>Dashboard / Academics / {title}</span>
                </div>
                <div className="header-actions">
                    <button className="icon-btn"><IconRefresh size={20} /></button>
                    <button className="icon-btn" onClick={() => window.print()}><IconPrinter size={20} /></button>
                    <div className="export-dropdown-container">
                        <button
                            className={`icon-btn export-btn ${showExportMenu ? 'active' : ''}`}
                            onClick={() => setShowExportMenu(!showExportMenu)}
                        >
                            <IconFileExport size={20} /> Export <IconChevronDown size={16} />
                        </button>
                        {showExportMenu && (
                            <div className="export-menu">
                                <button className="export-item"><IconFileTypePdf size={18} /> Export as PDF</button>
                                <button className="export-item"><IconFileTypeXls size={18} /> Export as Excel</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="placeholder-content">
                <div className="placeholder-card">
                    <h2>{title} Page</h2>
                    <p>This is a placeholder for the {title} module. Implementation is coming soon.</p>
                </div>
            </div>

            <footer className="academics-footer">
                <p>Copyright © 2024 MindWhile. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default AcademicsPlaceholder;
