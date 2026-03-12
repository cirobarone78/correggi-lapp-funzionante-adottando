/**
 * Storage Module - Handles all localStorage operations
 * Manages notes and theme persistence with error handling
 */

const StorageModule = (() => {
    // Storage keys
    const KEYS = {
        NOTES: 'notes',
        THEME: 'theme'
    };

    // Default color palette for notes
    const DEFAULT_COLORS = [
        '#ffffff', // white
        '#fef3c7', // yellow
        '#dbeafe', // blue
        '#dcfce7', // green
        '#fce7f3', // pink
        '#f3e8ff', // purple
        '#ffedd5'  // orange
    ];

    /**
     * Check if localStorage is available
     * @returns {boolean}
     */
    const isLocalStorageAvailable = () => {
        try {
            const test = '__localStorage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            console.warn('localStorage is not available:', e);
            return false;
        }
    };

    /**
     * Safely parse JSON from localStorage
     * @param {string} key
     * @param {*} defaultValue
     * @returns {*}
     */
    const getItem = (key, defaultValue = null) => {
        if (!isLocalStorageAvailable()) return defaultValue;
        
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.error(`Error parsing localStorage key "${key}":`, e);
            return defaultValue;
        }
    };

    /**
     * Safely set JSON to localStorage
     * @param {string} key
     * @param {*} value
     * @returns {boolean}
     */
    const setItem = (key, value) => {
        if (!isLocalStorageAvailable()) return false;
        
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error(`Error setting localStorage key "${key}":`, e);
            return false;
        }
    };

    /**
     * Get all notes from localStorage
     * @returns {Array}
     */
    const getNotes = () => {
        const notes = getItem(KEYS.NOTES, []);
        
        // Validate notes structure
        if (!Array.isArray(notes)) {
            console.warn('Invalid notes data, resetting to empty array');
            return [];
        }
        
        // Ensure all notes have required fields
        return notes.map(note => ({
            id: note.id || Date.now(),
            title: note.title || 'Untitled Note',
            content: note.content || '',
            createdAt: note.createdAt || new Date().toISOString(),
            updatedAt: note.updatedAt || new Date().toISOString(),
            color: note.color || DEFAULT_COLORS[0]
        }));
    };

    /**
     * Save all notes to localStorage
     * @param {Array} notes
     * @returns {boolean}
     */
    const saveNotes = (notes) => {
        if (!Array.isArray(notes)) {
            console.error('saveNotes expects an array');
            return false;
        }
        
        return setItem(KEYS.NOTES, notes);
    };

    /**
     * Get a single note by ID
     * @param {number} id
     * @returns {Object|null}
     */
    const getNote = (id) => {
        const notes = getNotes();
        return notes.find(note => note.id === id) || null;
    };

    /**
     * Create a new note
     * @param {Object} noteData
     * @returns {Object|null}
     */
    const createNote = (noteData) => {
        const notes = getNotes();
        const timestamp = Date.now();
        
        const newNote = {
            id: timestamp,
            title: noteData.title?.trim() || 'Untitled Note',
            content: noteData.content?.trim() || '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            color: noteData.color || DEFAULT_COLORS[0]
        };
        
        notes.unshift(newNote); // Add to beginning
        
        if (saveNotes(notes)) {
            return newNote;
        }
        
        return null;
    };

    /**
     * Update an existing note
     * @param {number} id
     * @param {Object} updates
     * @returns {Object|null}
     */
    const updateNote = (id, updates) => {
        const notes = getNotes();
        const index = notes.findIndex(note => note.id === id);
        
        if (index === -1) {
            console.error(`Note with id ${id} not found`);
            return null;
        }
        
        // Update note with new data
        notes[index] = {
            ...notes[index],
            ...updates,
            id, // Ensure ID doesn't change
            updatedAt: new Date().toISOString()
        };
        
        if (saveNotes(notes)) {
            return notes[index];
        }
        
        return null;
    };

    /**
     * Delete a note by ID
     * @param {number} id
     * @returns {boolean}
     */
    const deleteNote = (id) => {
        const notes = getNotes();
        const filteredNotes = notes.filter(note => note.id !== id);
        
        if (filteredNotes.length === notes.length) {
            console.warn(`Note with id ${id} not found`);
            return false;
        }
        
        return saveNotes(filteredNotes);
    };

    /**
     * Get theme preference
     * @returns {string} 'light' or 'dark'
     */
    const getTheme = () => {
        const theme = getItem(KEYS.THEME, 'light');
        return ['light', 'dark'].includes(theme) ? theme : 'light';
    };

    /**
     * Save theme preference
     * @param {string} theme
     * @returns {boolean}
     */
    const saveTheme = (theme) => {
        if (!['light', 'dark'].includes(theme)) {
            console.error('Invalid theme value');
            return false;
        }
        return setItem(KEYS.THEME, theme);
    };

    /**
     * Export all notes as JSON
     * @returns {string}
     */
    const exportNotes = () => {
        const notes = getNotes();
        const exportData = {
            version: '1.0',
            exportDate: new Date().toISOString(),
            notes: notes
        };
        return JSON.stringify(exportData, null, 2);
    };

    /**
     * Import notes from JSON string
     * @param {string} jsonString
     * @returns {boolean}
     */
    const importNotes = (jsonString) => {
        try {
            const data = JSON.parse(jsonString);
            
            if (!data.notes || !Array.isArray(data.notes)) {
                throw new Error('Invalid import format');
            }
            
            // Merge with existing notes, avoiding duplicates
            const existingNotes = getNotes();
            const existingIds = new Set(existingNotes.map(n => n.id));
            
            const newNotes = data.notes.filter(note => !existingIds.has(note.id));
            const allNotes = [...existingNotes, ...newNotes];
            
            return saveNotes(allNotes);
        } catch (e) {
            console.error('Error importing notes:', e);
            return false;
        }
    };

    /**
     * Clear all notes (with confirmation)
     * @returns {boolean}
     */
    const clearAllNotes = () => {
        return saveNotes([]);
    };

    /**
     * Get storage statistics
     * @returns {Object}
     */
    const getStats = () => {
        const notes = getNotes();
        
        return {
            totalNotes: notes.length,
            totalSize: new Blob([JSON.stringify(notes)]).size,
            oldestNote: notes.length > 0 ? notes[notes.length - 1] : null,
            newestNote: notes.length > 0 ? notes[0] : null
        };
    };

    // Public API
    return {
        // Notes operations
        getNotes,
        getNote,
        createNote,
        updateNote,
        deleteNote,
        saveNotes,
        
        // Theme operations
        getTheme,
        saveTheme,
        
        // Import/Export
        exportNotes,
        importNotes,
        clearAllNotes,
        
        // Utilities
        getStats,
        isAvailable: isLocalStorageAvailable,
        
        // Constants
        DEFAULT_COLORS
    };
})();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StorageModule;
}