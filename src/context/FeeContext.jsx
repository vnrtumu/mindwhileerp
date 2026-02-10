import React, { createContext, useState } from 'react';

export const FeeContext = createContext();

export const FeeProvider = ({ children }) => {
  const [feeTypes, setFeeTypes] = useState([
    { id: 1, name: 'Tuition', code: 'TUI001', group: 'Academic Fees', description: 'Monthly tuition fees', status: 'Active' },
    { id: 2, name: 'Transport', code: 'TRN001', group: 'Miscellaneous', description: 'Monthly transport charges', status: 'Active' },
    { id: 3, name: 'Library', code: 'LIB001', group: 'Academic Fees', description: 'Library membership fee', status: 'Inactive' },
    { id: 4, name: 'Activities', code: 'ACT001', group: 'Miscellaneous', description: 'Co-curricular activities fee', status: 'Active' },
    { id: 5, name: 'Examination', code: 'EXM001', group: 'Academic Fees', description: 'Examination and test fees', status: 'Active' },
  ]);

  const [feeGroups, setFeeGroups] = useState([
    { id: 1, name: 'Academic Fees', status: 'Active' },
    { id: 2, name: 'Miscellaneous', status: 'Active' },
    { id: 3, name: 'Extra Curricular', status: 'Active' }
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Simulate API delay
  const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

  // Get all fee types
  const getFeeTypes = async () => {
    setLoading(true);
    setError(null);
    try {
      await delay();
      return feeTypes;
    } catch {
      const errorMsg = 'Failed to fetch fee types';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Get single fee type by ID
  const getFeeTypeById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await delay();
      const feeType = feeTypes.find(ft => ft.id === id);
      if (!feeType) {
        throw new Error('Fee type not found');
      }
      return feeType;
    } catch (err) {
      const errorMsg = err.message || 'Failed to fetch fee type';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Add new fee type
  const addFeeType = async (feeTypeData) => {
    setLoading(true);
    setError(null);
    try {
      if (!feeTypeData.name || !feeTypeData.group) {
        throw new Error('Name and Group are required');
      }
      
      await delay();
      
      const newId = Math.max(...feeTypes.map(ft => ft.id), 0) + 1;
      const codeNum = Math.max(...feeTypes.map(ft => parseInt(ft.code.slice(3)) || 0), 0) + 1;
      
      const newFeeType = {
        id: newId,
        name: feeTypeData.name,
        code: `FEE${String(codeNum).padStart(3, '0')}`,
        group: feeTypeData.group,
        description: feeTypeData.description || '',
        status: feeTypeData.status || 'Active'
      };

      setFeeTypes(prev => [newFeeType, ...prev]);
      return newFeeType;
    } catch (err) {
      const errorMsg = err.message || 'Failed to add fee type';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Update fee type
  const updateFeeType = async (id, updates) => {
    setLoading(true);
    setError(null);
    try {
      if (updates.name && !updates.name.trim()) {
        throw new Error('Name cannot be empty');
      }
      if (updates.group && !updates.group.trim()) {
        throw new Error('Group cannot be empty');
      }

      await delay();

      const feeTypeExists = feeTypes.find(ft => ft.id === id);
      if (!feeTypeExists) {
        throw new Error('Fee type not found');
      }

      setFeeTypes(prev =>
        prev.map(ft =>
          ft.id === id ? { ...ft, ...updates } : ft
        )
      );

      return { ...feeTypeExists, ...updates };
    } catch (err) {
      const errorMsg = err.message || 'Failed to update fee type';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Delete fee type
  const deleteFeeType = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await delay();

      const feeTypeExists = feeTypes.find(ft => ft.id === id);
      if (!feeTypeExists) {
        throw new Error('Fee type not found');
      }

      setFeeTypes(prev => prev.filter(ft => ft.id !== id));
      return true;
    } catch (err) {
      const errorMsg = err.message || 'Failed to delete fee type';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Update fee type status
  const updateFeeTypeStatus = async (id, status) => {
    setLoading(true);
    setError(null);
    try {
      if (!['Active', 'Inactive'].includes(status)) {
        throw new Error('Invalid status');
      }

      await delay();

      const feeTypeExists = feeTypes.find(ft => ft.id === id);
      if (!feeTypeExists) {
        throw new Error('Fee type not found');
      }

      setFeeTypes(prev =>
        prev.map(ft =>
          ft.id === id ? { ...ft, status } : ft
        )
      );

      return { ...feeTypeExists, status };
    } catch (err) {
      const errorMsg = err.message || 'Failed to update status';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Get fee groups
  const getFeeGroups = async () => {
    setLoading(true);
    setError(null);
    try {
      await delay();
      return feeGroups;
    } catch {
      const errorMsg = 'Failed to fetch fee groups';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Add new fee group
  const addFeeGroup = async (groupName) => {
    setLoading(true);
    setError(null);
    try {
      if (!groupName || !groupName.trim()) {
        throw new Error('Group name is required');
      }

      await delay();

      const newGroup = {
        id: Math.max(...feeGroups.map(g => g.id), 0) + 1,
        name: groupName.trim(),
        status: 'Active'
      };

      setFeeGroups(prev => [newGroup, ...prev]);
      return newGroup;
    } catch (err) {
      const errorMsg = err.message || 'Failed to add fee group';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Update fee group
  const updateFeeGroup = async (id, updates) => {
    setLoading(true);
    setError(null);
    try {
      if (updates.name && !updates.name.trim()) {
        throw new Error('Name cannot be empty');
      }

      await delay();

      const feeGroupExists = feeGroups.find(fg => fg.id === id);
      if (!feeGroupExists) {
        throw new Error('Fee group not found');
      }

      setFeeGroups(prev =>
        prev.map(fg =>
          fg.id === id ? { ...fg, ...updates } : fg
        )
      );

      return { ...feeGroupExists, ...updates };
    } catch (err) {
      const errorMsg = err.message || 'Failed to update fee group';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Delete fee group
  const deleteFeeGroup = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await delay();

      const feeGroupExists = feeGroups.find(fg => fg.id === id);
      if (!feeGroupExists) {
        throw new Error('Fee group not found');
      }

      setFeeGroups(prev => prev.filter(fg => fg.id !== id));
      return true;
    } catch (err) {
      const errorMsg = err.message || 'Failed to delete fee group';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Update fee group status
  const updateFeeGroupStatus = async (id, status) => {
    setLoading(true);
    setError(null);
    try {
      if (!['Active', 'Inactive'].includes(status)) {
        throw new Error('Invalid status');
      }

      await delay();

      const feeGroupExists = feeGroups.find(fg => fg.id === id);
      if (!feeGroupExists) {
        throw new Error('Fee group not found');
      }

      setFeeGroups(prev =>
        prev.map(fg =>
          fg.id === id ? { ...fg, status } : fg
        )
      );

      return { ...feeGroupExists, status };
    } catch (err) {
      const errorMsg = err.message || 'Failed to update status';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    feeTypes,
    feeGroups,
    loading,
    error,
    getFeeTypes,
    getFeeTypeById,
    addFeeType,
    updateFeeType,
    deleteFeeType,
    updateFeeTypeStatus,
    getFeeGroups,
    addFeeGroup,
    updateFeeGroup,
    deleteFeeGroup,
    updateFeeGroupStatus,
    setError // Allow clearing errors
  };

  return (
    <FeeContext.Provider value={value}>
      {children}
    </FeeContext.Provider>
  );
};
