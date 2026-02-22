import { createContext, useState, useEffect } from 'react';

import { TicketData } from 'src/api/ticket/ticket-data';















export const TicketContext = createContext({});

export const TicketProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);
  const [ticketSearch, setTicketSearch] = useState('');
  const [filter, setFilter] = useState('total_tickets');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize tickets
  useEffect(() => {
    try {
      setTickets(TicketData);
    } catch (err) {
      setError(err instanceof Error ? err : String(err));
    } finally {
      setLoading(false);
    }
  }, []);

  // Add ticket
  const addTicket = (newTicket) => {
    // Push to TicketData array
    TicketData.push(newTicket);
    setTickets([...TicketData]);
  };

  // Edit ticket
  const editTicket = (updatedTicket) => {
    const index = TicketData.findIndex((t) => t.Id === updatedTicket.Id);
    if (index !== -1) {
      TicketData[index] = updatedTicket;
      setTickets([...TicketData]);
    }
  };

  // Delete ticket
  const deleteTicket = (id) => {
    const index = TicketData.findIndex((t) => t.Id === id);
    if (index !== -1) {
      TicketData.splice(index, 1); // remove from array
      setTickets([...TicketData]);
    }
  };

  const searchTickets = (searchTerm) => {
    setTicketSearch(searchTerm);
  };

  return (
    <TicketContext.Provider
      value={{
        tickets,
        error,
        loading,
        deleteTicket,
        setTicketSearch,
        searchTickets,
        ticketSearch,
        filter,
        setFilter,
        addTicket,
        editTicket
      }}>
      
      {children}
    </TicketContext.Provider>);

};