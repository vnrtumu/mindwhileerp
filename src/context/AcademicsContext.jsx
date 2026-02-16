import React, { createContext, useState } from 'react';

export const AcademicsContext = createContext();

export const AcademicsProvider = ({ children }) => {
    // Initial Mock Data for Classes
    const [classes, setClasses] = useState([
        { id: 1, name: 'Class 1', numeric: 1 },
        { id: 2, name: 'Class 2', numeric: 2 },
        { id: 3, name: 'Class 3', numeric: 3 },
        { id: 4, name: 'Class 4', numeric: 4 },
        { id: 5, name: 'Class 5', numeric: 5 },
        { id: 6, name: 'Class 6', numeric: 6 },
        { id: 7, name: 'Class 7', numeric: 7 },
        { id: 8, name: 'Class 8', numeric: 8 },
        { id: 9, name: 'Class 9', numeric: 9 },
        { id: 10, name: 'Class 10', numeric: 10 },
    ]);

    // Initial Mock Data for Sections
    const [sections, setSections] = useState([
        { id: 1, name: 'A' },
        { id: 2, name: 'B' },
        { id: 3, name: 'C' },
        { id: 4, name: 'Telugu' },
        { id: 5, name: 'English' },
    ]);

    // Initial Mock Data for Subjects
    const [subjects, setSubjects] = useState([
        { id: 1, name: 'Mathematics', code: 'MATH101', type: 'Theory' },
        { id: 2, name: 'Science', code: 'SCI101', type: 'Theory' },
        { id: 3, name: 'English', code: 'ENG101', type: 'Theory' },
        { id: 4, name: 'Physics Lab', code: 'PHYLAB', type: 'Practical' },
        { id: 5, name: 'Social Studies', code: 'SOC101', type: 'Theory' },
    ]);

    const addClass = (newClass) => {
        setClasses([...classes, { ...newClass, id: Date.now() }]);
    };

    const addSection = (newSection) => {
        setSections([...sections, { ...newSection, id: Date.now() }]);
    };

    const addSubject = (newSubject) => {
        setSubjects([...subjects, { ...newSubject, id: Date.now() }]);
    };

    const deleteClass = (id) => {
        setClasses(classes.filter(c => c.id !== id));
    };

    const deleteSection = (id) => {
        setSections(sections.filter(s => s.id !== id));
    };

    const deleteSubject = (id) => {
        setSubjects(subjects.filter(s => s.id !== id));
    };

    return (
        <AcademicsContext.Provider value={{ classes, sections, subjects, addClass, addSection, addSubject, deleteClass, deleteSection, deleteSubject }}>
            {children}
        </AcademicsContext.Provider>
    );
};
