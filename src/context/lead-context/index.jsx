import { createContext, useState, useEffect } from 'react';

import { LeadData } from 'src/api/lead/lead-data';















export const LeadContext = createContext({});

export const LeadProvider = ({ children }) => {
  const [leads, setLeads] = useState([]);
  const [leadSearch, setLeadSearch] = useState('');
  const [filter, setFilter] = useState('total_leads');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize leads
  useEffect(() => {
    try {
      setLeads(LeadData);
    } catch (err) {
      setError(err instanceof Error ? err : String(err));
    } finally {
      setLoading(false);
    }
  }, []);

  // Add lead
  const addLead = (newLead) => {
    LeadData.push(newLead);
    setLeads([...LeadData]);
  };

  // Edit lead
  const editLead = (updatedLead) => {
    const index = LeadData.findIndex((l) => l.Id === updatedLead.Id);
    if (index !== -1) {
      LeadData[index] = updatedLead;
      setLeads([...LeadData]);
    }
  };

  // Delete lead
  const deleteLead = (id) => {
    const index = LeadData.findIndex((l) => l.Id === id);
    if (index !== -1) {
      LeadData.splice(index, 1);
      setLeads([...LeadData]);
    }
  };

  const searchLeads = (searchTerm) => {
    setLeadSearch(searchTerm);
  };

  return (
    <LeadContext.Provider
      value={{
        leads,
        error,
        loading,
        deleteLead,
        setLeadSearch,
        searchLeads,
        leadSearch,
        filter,
        setFilter,
        addLead,
        editLead
      }}>
      
            {children}
        </LeadContext.Provider>);

};