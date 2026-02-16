import React, { useContext, useState } from 'react';
import { StudentContext } from '../../../context/StudentContext';
import { useNavigate } from 'react-router-dom';
import './StudentList.css';
import HeaderActionButton from './components/HeaderActionButton';
import BackButton from './components/BackButton';
import { EyeIcon, CheckIcon, PlaceholderAvatar } from '../../../components/Icons';

// Compact Disabled Students table — matches Student List styles

const DisabledStudents = () => {
  const { disabledStudents, enableStudent, enablingIds } = useContext(StudentContext);
  const navigate = useNavigate();
  const [pendingId, setPendingId] = useState(null);
  const [showToast, setShowToast] = useState(false);

  return (
    <div className="student-list-page">
      <div className="container">
      <div className="page-header">
        <div className="page-title">
          <div className="back-button-wrapper">
            <BackButton title="Go back to Disabled Students" />
            <div>
              <h4>Disabled Students</h4>
              <nav className="breadcrumb"><span>Students</span> / <span className="current">Disabled</span></nav>
            </div>
          </div>
        </div>
        <div className="page-actions">
          <HeaderActionButton to={'/school/dashboard'} label={'Back to Dashboard'} />
        </div>
      </div>

      <div className="card soft-card fade-in compact-table">
        {disabledStudents.length === 0 ? (
          <div style={{textAlign:'center',padding:40}}>
            <h3>No disabled students</h3>
            <p className="muted">Students you disable will appear here. You can re-enable them at any time.</p>
          </div>
        ) : (
          <div className="table-wrap">
            <table className="students-table compact">
              <thead>
                <tr>
                  <th className="col-adm">Adm No.</th>
                  <th className="col-photo">Photo</th>
                  <th className="col-name">Name</th>
                  <th className="col-class">Class</th>
                  <th className="col-disabled">Disabled On</th>
                  <th className="col-reason">Reason</th>
                  <th className="col-actions">Actions</th>
                </tr>
              </thead>
              <tbody>
                {disabledStudents.map(d => (
                  <tr key={d.id}>
                    <td className="adm">{d.admissionNo || d.id || '—'}</td>
                    <td className="photo">
                      {d.image ? <img src={d.image} className="avatar" alt={d.name} /> : <PlaceholderAvatar gender={d.gender} size={36} />}
                    </td>
                    <td className="name">{d.name}</td>
                    <td className="class">{d.class || d.className || '—'}</td>
                    <td className="disabled">{new Date(d.disabledAt || d.disabledDate || Date.now()).toLocaleDateString()}</td>
                    <td className="reason"><span className="badge badge-danger" style={{background:'#FFF5F5',color:'#C53030'}}>{d.reason || '—'}</span></td>
                    <td className="actions">
                      <button className="icon-btn icon-view" title="View" onClick={() => navigate(`/school/student-profile/${d.id}`)}><EyeIcon /></button>
                      <button className="icon-btn icon-reenable" title="Re-enable" onClick={async () => {
                        if (enablingIds.includes(d.id) || pendingId===d.id) return;
                        setPendingId(d.id);
                        const ok = await enableStudent(d.id);
                        setPendingId(null);
                        if (ok) { setShowToast(true); setTimeout(()=>setShowToast(false),2600); }
                      }}>{pendingId===d.id ? <span style={{fontSize:12}}>...</span> : <CheckIcon />}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {showToast && <div className="snackbar success">Student re-enabled</div>}
      </div>
    </div>
    </div>
  );
};

export default DisabledStudents;

