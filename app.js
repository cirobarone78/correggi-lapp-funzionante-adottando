/**
 * Notes App - Alternative JavaScript Entry Point
 * This file serves as an alternative entry point that loads all modules
 * Use this instead of individual script tags for a single-file load
 */

(function() {
    'use strict';

    // Configuration object
    const CONFIG = {
        APP_NAME: 'Notes App',
        VERSION: '1.0.0',
        STORAGE_KEY: 'notes',
        THEME_KEY: 'theme',
        DEBUG: false,
        AUTO_SAVE_DELAY: 2000,
        SEARCH_DEBOUNCE: 300,
        ANIMATION_DURATION: 300,
        MAX_NOTE_TITLE_LENGTH: 100,
        MAX_NOTE_CONTENT_LENGTH: 10000,
        DEFAULT_THEME: 'light',
        DATE_FORMAT: 'en-US',
        COLORS: [
            '#667eea', // Primary
            '#764ba2', // Purple
            '#f093fb', // Pink
            '#4facfe', // Blue
            '#43e97b', // Green
            '#fa709a', // Rose
            '#fee140', // Yellow
            '#30cfd0'  // Cyan
        ]
    };

    // Utility functions
    const utils = {
        /**
         * Generate unique ID based on timestamp
         */
        generateId: function() {
            return Date.now() + Math.random().toString(36).substr(2, 9);
        },

        /**
         * Debounce function execution
         */
        debounce: function(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },

        /**
         * Throttle function execution
         */
        throttle: function(func, limit) {
            let inThrottle;
            return function(...args) {
                if (!inThrottle) {
                    func.apply(this, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        },

        /**
         * Format date to readable string
         */
        formatDate: function(dateString) {
            const date = new Date(dateString);
            const now = new Date();
            const diffMs = now - date;
            const diffMins = Math.floor(diffMs / 60000);
            const diffHours = Math.floor(diffMs / 3600000);
            const diffDays = Math.floor(diffMs / 86400000);

            if (diffMins < 1) return 'Just now';
            if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
            if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
            if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;

            return date.toLocaleDateString(CONFIG.DATE_FORMAT, {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        },

        /**
         * Sanitize HTML to prevent XSS
         */
        sanitizeHTML: function(str) {
            const temp = document.createElement('div');
            temp.textContent = str;
            return temp.innerHTML;
        },

        /**
         * Truncate text to specified length
         */
        truncate: function(str, length) {
            if (str.length <= length) return str;
            return str.substring(0, length) + '...';
        },

        /**
         * Get random color from palette
         */
        getRandomColor: function() {
            return CONFIG.COLORS[Math.floor(Math.random() * CONFIG.COLORS.length)];
        },

        /**
         * Deep clone object
         */
        deepClone: function(obj) {
            return JSON.parse(JSON.stringify(obj));
        },

        /**
         * Check if value is empty
         */
        isEmpty: function(value) {
            if (value === null || value === undefined) return true;
            if (typeof value === 'string') return value.trim().length === 0;
            if (Array.isArray(value)) return value.length === 0;
            if (typeof value === 'object') return Object.keys(value).length === 0;
            return false;
        },

        /**
         * Show notification toast
         */
        showToast: function(message, type = 'info', duration = 3000) {
            const toast = document.createElement('div');
            toast.className = `toast ${type} fade-in`;
            toast.textContent = message;
            document.body.appendChild(toast);

            setTimeout(() => {
                toast.classList.remove('fade-in');
                toast.classList.add('fade-out');
                setTimeout(() => toast.remove(), CONFIG.ANIMATION_DURATION);
            }, duration);
        },

        /**
         * Log debug message
         */
        log: function(message, data) {
            if (CONFIG.DEBUG) {
                console.log(`[${CONFIG.APP_NAME}] ${message}`, data || '');
            }
        },

        /**
         * Log error message
         */
        error: function(message, error) {
            console.error(`[${CONFIG.APP_NAME}] ${message}`, error || '');
        }
    };

    // Export utilities to global scope
    window.NotesApp = {
        config: CONFIG,
        utils: utils,
        version: CONFIG.VERSION,

        /**
         * Initialize the application
         */
        init: function() {
            utils.log('Initializing Notes App', CONFIG.VERSION);

            // Check for required dependencies
            if (!window.Storage) {
                utils.error('localStorage is not available');
                utils.showToast('Your browser does not support local storage', 'error');
                return false;
            }

            // Load external modules if they exist
            const modules = ['storage', 'notes', 'ui', 'search', 'theme', 'app'];
            const loadedModules = [];

            modules.forEach(module => {
                const modulePath = `js/${module}.js`;
                if (window[module] || window[module.charAt(0).toUpperCase() + module.slice(1)]) {
                    loadedModules.push(module);
                    utils.log(`Module loaded: ${module}`);
                }
            });

            utils.log('Loaded modules', loadedModules);

            // If main app module is loaded, initialize it
            if (window.app && typeof window.app.init === 'function') {
                window.app.init();
            }

            return true;
        },

        /**
         * Export all notes as JSON
         */
        exportNotes: function() {
            try {
                const notes = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY) || '[]');
                const dataStr = JSON.stringify(notes, null, 2);
                const dataBlob = new Blob([dataStr], { type: 'application/json' });
                const url = URL.createObjectURL(dataBlob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `notes-backup-${Date.now()}.json`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
                utils.showToast('Notes exported successfully', 'success');
                utils.log('Notes exported');
            } catch (error) {
                utils.error('Failed to export notes', error);
                utils.showToast('Failed to export notes', 'error');
            }
        },

        /**
         * Import notes from JSON file
         */
        importNotes: function(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = function(e) {
                    try {
                        const importedNotes = JSON.parse(e.target.result);
                        if (!Array.isArray(importedNotes)) {
                            throw new Error('Invalid notes format');
                        }
                        localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(importedNotes));
                        utils.showToast(`Imported ${importedNotes.length} notes`, 'success');
                        utils.log('Notes imported', importedNotes.length);
                        resolve(importedNotes);
                    } catch (error) {
                        utils.error('Failed to import notes', error);
                        utils.showToast('Failed to import notes', 'error');
                        reject(error);
                    }
                };
                reader.onerror = function() {
                    utils.error('Failed to read file');
                    utils.showToast('Failed to read file', 'error');
                    reject(new Error('Failed to read file'));
                };
                reader.readAsText(file);
            });
        },

        /**
         * Clear all notes (with confirmation)
         */
        clearAllNotes: function() {
            if (confirm('Are you sure you want to delete all notes? This action cannot be undone.')) {
                try {
                    localStorage.removeItem(CONFIG.STORAGE_KEY);
                    utils.showToast('All notes deleted', 'success');
                    utils.log('All notes cleared');
                    return true;
                } catch (error) {
                    utils.error('Failed to clear notes', error);
                    utils.showToast('Failed to delete notes', 'error');
                    return false;
                }
            }
            return false;
        },

        /**
         * Get app statistics
         */
        getStats: function() {
            try {
                const notes = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY) || '[]');
                const totalNotes = notes.length;
                const totalCharacters = notes.reduce((sum, note) => {
                    return sum + (note.title?.length || 0) + (note.content?.length || 0);
                }, 0);
                const lastUpdated = notes.length > 0
                    ? Math.max(...notes.map(n => new Date(n.updatedAt).getTime()))
                    : null;

                return {
                    totalNotes,
                    totalCharacters,
                    lastUpdated: lastUpdated ? new Date(lastUpdated) : null,
                    storageUsed: new Blob([localStorage.getItem(CONFIG.STORAGE_KEY) || '']).size
                };
            } catch (error) {
                utils.error('Failed to get stats', error);
                return null;
            }
        },

        /**
         * Reset app to default state
         */
        reset: function() {
            if (confirm('Reset the app to default settings? All notes will be deleted.')) {
                try {
                    localStorage.clear();
                    location.reload();
                } catch (error) {
                    utils.error('Failed to reset app', error);
                    utils.showToast('Failed to reset app', 'error');
                }
            }
        }
    };

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            window.NotesApp.init();
        });
    } else {
        window.NotesApp.init();
    }

    // Expose utilities globally for console access
    window.notesUtils = utils;

    // Log welcome message
    if (CONFIG.DEBUG) {
        console.log(
            `%c${CONFIG.APP_NAME} v${CONFIG.VERSION}`,
            'color: #667eea; font-size: 16px; font-weight: bold;'
        );
        console.log('Access utilities via window.NotesApp.utils or window.notesUtils');
    }

})();