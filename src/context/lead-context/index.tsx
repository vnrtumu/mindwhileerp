import { createContext, useState, useEffect } from 'react';
import { LeadType } from 'src/types/lead';
import { LeadData } from 'src/api/lead/lead-data';

export interface LeadContextType {
    leads: LeadType[];
    deleteLead: (id: number) => void;
    setLeadSearch: (searchTerm: string) => void;
    searchLeads: (searchTerm: string) => void;
    leadSearch: string;
    filter: string;
    error: string | Error | null;
    loading: boolean;
    setFilter: (filter: string) => void;
    addLead: (lead: LeadType) => void;
    editLead: (lead: LeadType) => void;
}

export const LeadContext = createContext<LeadContextType>({} as LeadContextType);

export const LeadProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [leads, setLeads] = useState<LeadType[]>([]);
    const [leadSearch, setLeadSearch] = useState<string>('');
    const [filter, setFilter] = useState<string>('total_leads');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | Error | null>(null);

    // Initialize leads
    useEffect(() => {
        try {
            setLeads(LeadData);
        } catch (err: unknown) {
            setError(err instanceof Error ? err : String(err));
        } finally {
            setLoading(false);
        }
    }, []);

    // Add lead
    const addLead = (newLead: LeadType) => {
        LeadData.push(newLead);
        setLeads([...LeadData]);
    };

    // Edit lead
    const editLead = (updatedLead: LeadType) => {
        const index = LeadData.findIndex((l) => l.Id === updatedLead.Id);
        if (index !== -1) {
            LeadData[index] = updatedLead;
            setLeads([...LeadData]);
        }
    };

    // Delete lead
    const deleteLead = (id: number) => {
        const index = LeadData.findIndex((l) => l.Id === id);
        if (index !== -1) {
            LeadData.splice(index, 1);
            setLeads([...LeadData]);
        }
    };

    const searchLeads = (searchTerm: string) => {
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
                editLead,
            }}
        >
            {children}
        </LeadContext.Provider>
    );
};
