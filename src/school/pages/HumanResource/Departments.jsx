import React from 'react';
import BackButton from '../StudentInformation/components/BackButton';
import HeaderActionButton from '../StudentInformation/components/HeaderActionButton';
import './Payroll.css';

const Departments = () => {
  return (
    <div className="payroll-page">
      <div className="container">
        <div className="page-header">
          <div className="page-title">
            <div className="back-button-wrapper">
              <BackButton title="Go back to Human Resource" />
              <div>
                <h4>Departments</h4>
                <nav className="breadcrumb"><span>Human Resource</span> / <span className="current">Departments</span></nav>
              </div>
            </div>
          </div>
          <div className="page-header-actions">
            <HeaderActionButton to={'/school/dashboard'} label={'Back to Dashboard'} />
          </div>
        </div>

        <div className="card table-card soft-card">
          <div style={{padding:20}}>Departments placeholder — manage departments here.</div>
        </div>
      </div>
    </div>
  );
};

export default Departments;
