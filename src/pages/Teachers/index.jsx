import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AllTeachers from './AllTeachers';
import TeachersList from './TeachersList';
import TeacherDetails from './TeacherDetails';
import AddTeacher from './AddTeacher';
import Routine from './Routine';

const Teachers = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="list" replace />} />
            <Route path="All Teachers" element={<AllTeachers />} />
            <Route path="list" element={<TeachersList />} />
            <Route path="details" element={<TeacherDetails />} />
            <Route path="add" element={<AddTeacher />} />
            <Route path="edit/:id" element={<AddTeacher />} />
            <Route path="routine" element={<Routine />} />
        </Routes>
    );
};

export default Teachers;
