import React, { createContext, useState } from 'react';

export const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
    // Initial Mock Data
    const [students, setStudents] = useState([
        { id: 'PRE2209', name: 'Aaliyah', class: '10', section: 'A', rollNo: '1001', gender: 'Female', image: '' },
        { id: 'PRE2213', name: 'Malynne', class: '8', section: 'A', rollNo: '1002', gender: 'Female', image: '' },
        { id: 'PRE2143', name: 'Levell Scott', class: '10', section: 'B', rollNo: '1003', gender: 'Male', image: '' },
        { id: 'PRE2431', name: 'Minnie', class: '11', section: 'C', rollNo: '1004', gender: 'Female', image: '' },
        { id: 'PRE1534', name: 'Lois A', class: '10', section: 'A', rollNo: '1005', gender: 'Female', image: '' },
        { id: 'PRE2153', name: 'Calvin', class: '9', section: 'B', rollNo: '1006', gender: 'Male', image: '' },
        { id: 'PRE1234', name: 'Joe Kelley', class: '10', section: 'B', rollNo: '1007', gender: 'Female', image: '' },
        { id: 'PRE2123', name: 'Charles', class: '8', section: 'A', rollNo: '1008', gender: 'Male', image: '' },
    ]);

    // Mock staff list for reporting
    const [staff] = useState([
        { id: 'S001', name: 'Ms. Anusha' },
        { id: 'S002', name: 'Mr. Ramesh' },
        { id: 'S003', name: 'Ms. Priya' },
        { id: 'S004', name: 'Mr. Kiran' }
    ]);

    // Behavior records state (start empty; records added via AddBehaviorRecordPage)
    const [behaviorRecords, setBehaviorRecords] = useState([]);

    const addStudent = (newStudent) => {
        // Generate a simple ID if not provided (mock logic)
        const studentWithId = {
            ...newStudent,
            id: newStudent.id || `PRE${Math.floor(Math.random() * 9000) + 1000}`
        };
        setStudents(prevStudents => [studentWithId, ...prevStudents]);
    };

    const addBehaviorRecord = (record) => {
        const r = { id: `B${Math.floor(Math.random()*9000)+1000}`, ...record };
        setBehaviorRecords(prev => [r, ...prev]);
    };

    const updateBehaviorRecord = (id, updates) => {
        setBehaviorRecords(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r));
    };

    const deleteBehaviorRecord = (id) => {
        setBehaviorRecords(prev => prev.filter(r => r.id !== id));
    };

    // Student categories (start empty)
    const [categories, setCategories] = useState([]);

    const addCategory = (cat) => {
        const c = { id: `C${Math.floor(Math.random()*9000)+1000}`, ...cat };
        setCategories(prev => [c, ...prev]);
        return c;
    };

    const updateCategory = (id, updates) => {
        setCategories(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
    };

    const deleteCategory = (id) => {
        setCategories(prev => prev.filter(c => c.id !== id));
    };

    // Disabled students management
    const [disabledStudents, setDisabledStudents] = useState([]);
    const [disablingIds, setDisablingIds] = useState([]);
    const [enablingIds, setEnablingIds] = useState([]);

    const disableStudent = async (studentId, reason) => {
        // Idempotency: don't disable if already disabled or in-flight
        if (disabledStudents.find(s => s.id === studentId)) return false;
        if (disablingIds.includes(studentId)) return false;

        const studentToDisable = students.find(s => s.id === studentId) || null;
        if (!studentToDisable) return false;

        setDisablingIds(prev => [...prev, studentId]);

        // Remove from active students
        setStudents(prev => prev.filter(s => s.id !== studentId));

        const ds = { ...studentToDisable, disabledAt: new Date().toISOString(), reason };

        // Add to disabled list if not already present
        setDisabledStudents(prev => (prev.find(s => s.id === studentId) ? prev : [ds, ...prev]));

        setDisablingIds(prev => prev.filter(id => id !== studentId));
        return true;
    };

    const enableStudent = async (studentId) => {
        if (enablingIds.includes(studentId)) return false;
        setEnablingIds(prev => [...prev, studentId]);

        const studentToEnable = disabledStudents.find(s => s.id === studentId) || null;
        if (!studentToEnable) {
            setEnablingIds(prev => prev.filter(id => id !== studentId));
            return false;
        }

        // Remove disabled fields
        const restored = { ...studentToEnable };
        delete restored.disabledAt;
        delete restored.reason;

        // Add back to active students and remove from disabled list
        setStudents(prevStudents => [restored, ...prevStudents]);
        setDisabledStudents(prev => prev.filter(s => s.id !== studentId));

        setEnablingIds(prev => prev.filter(id => id !== studentId));
        return true;
    };

    return (
        <StudentContext.Provider value={{
            students,
            addStudent,
            staff,
            behaviorRecords,
            addBehaviorRecord,
            updateBehaviorRecord,
            deleteBehaviorRecord,
            categories,
            addCategory,
            updateCategory,
            deleteCategory,
            disabledStudents,
            disableStudent,
            enableStudent,
            disablingIds,
            enablingIds
        }}>
            {children}
        </StudentContext.Provider>
    );
};
