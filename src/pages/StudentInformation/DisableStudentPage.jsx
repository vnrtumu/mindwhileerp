import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { StudentContext } from '../../context/StudentContext';
import './StudentList.css';

const reasons = [
  'Transfer to Another School',
  'Relocation of Family',
  'Completed Schooling',
  'Admission Cancelled',
  'Long-Term Absenteeism',
  'Financial Constraints',
  'Medical Reasons',
  'Disciplinary Action',
  'Change of Curriculum/Board',
  'Personal / Family Reasons'
];

const DisableStudentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { students, disableStudent, disabledStudents, disablingIds } = useContext(StudentContext);
  const student = students.find(s => s.id === id) || disabledStudents.find(s => s.id === id) || { name: 'Unknown' };
  const [selected, setSelected] = useState('');
  const [pending, setPending] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const confirmDisable = async () => {
    if (!selected) return alert('Please select a reason');
    if (disabledStudents.find(s => s.id === id)) { alert('Student is already disabled'); return; }
    if (disablingIds.includes(id)) return; // already in-flight
    setPending(true);
    const ok = await disableStudent(id, selected);
    setPending(false);
    if (ok) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2600);
      navigate('/student-info/disabled-students', { state: { disabled: true } });
    } else {
      alert('Unable to disable student (already disabled or missing).');
    }
  };

  return (
    <div className="student-list-page">
      <div className="page-header">
        <div className="page-title">
          <h4>Disable Student</h4>
          <nav className="breadcrumb"><span>Students</span> / <span className="current">Disable</span></nav>
        </div>
      </div>

      <div className="card soft-card" style={{maxWidth:800}}>
        <h3>Disable {student.name}</h3>
        <p className="muted">Select a reason for disabling this student account.</p>

        <div style={{marginTop:16}}>
          {reasons.map(r => (
            <label key={r} style={{display:'flex',alignItems:'center',gap:10, marginBottom:8}}>
              <input type="radio" name="reason" value={r} checked={selected===r} onChange={() => setSelected(r)} />
              <span>{r}</span>
            </label>
          ))}
        </div>

        <div style={{display:'flex',gap:10,justifyContent:'flex-end',marginTop:18}}>
          <button className="btn btn-outline" onClick={() => navigate(-1)} disabled={pending}>Cancel</button>
          <button className="btn btn-primary" onClick={confirmDisable} disabled={pending}>{pending ? 'Disabling...' : 'Confirm Disable'}</button>
        </div>
        {showToast && <div className="snackbar success">Student disabled</div>}
      </div>
    </div>
  );
};

export default DisableStudentPage;
