import { createContext, useState, useEffect } from 'react';
import React from 'react';

import { NotesData } from 'src/api/notes/notes-data';












const initialContext = {
  notes: [],
  loading: true,
  error: null,
  selectedNoteId: 1,
  selectNote: () => {},
  addNote: async () => {},
  updateNote: async () => {},
  deleteNote: async () => {}
};

export const NotesContext = createContext(initialContext);

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState(initialContext.notes);
  const [loading, setLoading] = useState(initialContext.loading);
  const [error, setError] = useState(initialContext.error);
  const [selectedNoteId, setSelectedNoteId] = useState(initialContext.selectedNoteId);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      setNotes(NotesData);
    } catch (err) {
      setError(err instanceof Error ? err : String(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const selectNote = (id) => {
    setSelectedNoteId(id);
  };

  const addNote = async (newNote) => {
    try {
      const noteToAdd = {
        id: Date.now(),
        title: newNote.title || '',
        color: newNote.color || 'primary',
        datef: new Date().toISOString(),
        deleted: false
      };
      setNotes((prev) => [...prev, noteToAdd]);
    } catch (err) {
      console.error('Error adding note:', err);
    }
  };

  // Update a note
  const updateNote = async (id, title, color) => {
    try {
      setNotes((prev) => prev.map((note) => note.id === id ? { ...note, title, color } : note));
    } catch (err) {
      console.error('Error updating note:', err);
    }
  };

  // Delete a note
  const deleteNote = async (id) => {
    try {
      setNotes((prev) => prev.filter((note) => note.id !== id));
    } catch (err) {
      console.error('Error deleting note:', err);
    }
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        loading,
        error,
        selectedNoteId,
        selectNote,
        addNote,
        updateNote,
        deleteNote
      }}>
      
      {children}
    </NotesContext.Provider>);

};