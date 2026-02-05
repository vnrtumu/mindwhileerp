import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Login from './components/Login/Login';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import StudentDashboard from './pages/StudentDashboard';
import Income from './pages/Accounts/Income';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes Wrapper */}
          <Route path="/" element={<MainLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="student-dashboard" element={<StudentDashboard />} />
            <Route path="students" element={<div>Students Page</div>} />
            <Route path="teachers" element={<div>Teachers Page</div>} />
            <Route path="departments" element={<div>Departments Page</div>} />
            <Route path="accounts" element={<div>Accounts Page</div>} />
            <Route path="accounts/income" element={<Income />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

