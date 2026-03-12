/**
 * Search Module
 * Handles search functionality with debouncing and filtering
 * Integrates with NotesManager for real-time search
 */

const SearchManager = (() => {
    // Private state
    let searchTimeout = null;
    let currentQuery = '';
    const DEBOUNCE_DELAY = 300; // milliseconds

    // DOM elements
    let searchInput = null;
    let searchClear = null;

    /**
     * Initialize search manager
     */
    function init() {
        setupElements();
        setupEventListeners();
        console.log('✓ Search Manager initialized');
    }

    /**
     * Setup DOM element references
     */
    function setupElements() {
        searchInput = document.getElementById('searchInput');
        searchClear = document.getElementById('searchClear');

        if (!searchInput) {
            console.warn('Search input element not found');
        }
        if (!searchClear) {
            console.warn('Search clear button not found');
        }
    }

    /**
     * Setup event listeners
     */
    function setupEventListeners() {
        if (searchInput) {
            // Search input with debouncing
            searchInput.addEventListener('input', handleSearchInput);

            // Search on Enter key
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    performSearch(searchInput.value);
                }
            });

            // Focus/blur effects
            searchInput.addEventListener('focus', handleSearchFocus);
            searchInput.addEventListener('blur', handleSearchBlur);
        }

        if (searchClear) {
            searchClear.addEventListener('click', clearSearch);
        }

        // Keyboard shortcut: Ctrl/Cmd + F
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
                e.preventDefault();
                if (searchInput) {
                    searchInput.focus();
                    searchInput.select();
                }
            }
        });
    }

    /**
     * Handle search input with debouncing
     */
    function handleSearchInput(e) {
        const query = e.target.value;

        // Show/hide clear button
        updateClearButton(query);

        // Clear existing timeout
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }

        // Set new timeout for debounced search
        searchTimeout = setTimeout(() => {
            performSearch(query);
        }, DEBOUNCE_DELAY);
    }

    /**
     * Perform the actual search
     */
    function performSearch(query) {
        currentQuery = query.trim();

        // Update UI state
        updateSearchState();

        // Trigger search in NotesManager
        if (window.NotesManager) {
            NotesManager.setSearchQuery(currentQuery);
        }

        // Log search activity
        if (currentQuery) {
            console.log('Search performed:', currentQuery);
        }
    }

    /**
     * Clear search
     */
    function clearSearch() {
        if (searchInput) {
            searchInput.value = '';
            searchInput.focus();
        }

        currentQuery = '';
        updateClearButton('');
        updateSearchState();

        // Clear search in NotesManager
        if (window.NotesManager) {
            NotesManager.setSearchQuery('');
        }

        console.log('Search cleared');
    }

    /**
     * Update clear button visibility
     */
    function updateClearButton(query) {
        if (searchClear) {
            searchClear.style.display = query.length > 0 ? 'flex' : 'none';
        }
    }

    /**
     * Update search UI state
     */
    function updateSearchState() {
        const container = document.querySelector('.search-container');
        if (container) {
            if (currentQuery) {
                container.classList.add('searching');
            } else {
                container.classList.remove('searching');
            }
        }

        // Update content title to show search state
        const contentTitle = document.getElementById('contentTitle');
        if (contentTitle) {
            if (currentQuery) {
                contentTitle.textContent = `Search: "${currentQuery}"`;
            } else {
                contentTitle.textContent = 'All Notes';
            }
        }
    }

    /**
     * Handle search input focus
     */
    function handleSearchFocus() {
        const container = document.querySelector('.search-container');
        if (container) {
            container.classList.add('focused');
        }
    }

    /**
     * Handle search input blur
     */
    function handleSearchBlur() {
        const container = document.querySelector('.search-container');
        if (container) {
            container.classList.remove('focused');
        }
    }

    /**
     * Get current search query
     */
    function getCurrentQuery() {
        return currentQuery;
    }

    /**
     * Set search query programmatically
     */
    function setQuery(query) {
        if (searchInput) {
            searchInput.value = query;
            performSearch(query);
        }
    }

    /**
     * Check if search is active
     */
    function isSearching() {
        return currentQuery.length > 0;
    }

    /**
     * Highlight search terms in text (utility function)
     */
    function highlightSearchTerms(text, query) {
        if (!query || !text) return text;

        const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    /**
     * Escape special regex characters
     */
    function escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    /**
     * Filter array of items based on search query
     * Generic utility that can be used with any data
     */
    function filterItems(items, query, searchFields = ['title', 'content']) {
        if (!query || !query.trim()) {
            return items;
        }

        const lowerQuery = query.toLowerCase().trim();
        return items.filter(item => {
            return searchFields.some(field => {
                const value = item[field];
                if (typeof value === 'string') {
                    return value.toLowerCase().includes(lowerQuery);
                }
                return false;
            });
        });
    }

    /**
     * Get search suggestions based on existing notes
     */
    function getSearchSuggestions(query, limit = 5) {
        if (!query || !window.NotesManager) return [];

        const notes = NotesManager.getAllNotes();
        const suggestions = new Set();

        const lowerQuery = query.toLowerCase();

        // Extract unique words from matching notes
        notes.forEach(note => {
            const titleWords = note.title.toLowerCase().split(/\s+/);
            const contentWords = note.content.toLowerCase().split(/\s+/);

            [...titleWords, ...contentWords].forEach(word => {
                if (word.startsWith(lowerQuery) && word.length > query.length) {
                    suggestions.add(word);
                }
            });
        });

        return Array.from(suggestions).slice(0, limit);
    }

    /**
     * Reset search state
     */
    function reset() {
        clearSearch();
        if (searchTimeout) {
            clearTimeout(searchTimeout);
            searchTimeout = null;
        }
    }

    // Public API
    return {
        init,
        performSearch,
        clearSearch,
        getCurrentQuery,
        setQuery,
        isSearching,
        highlightSearchTerms,
        filterItems,
        getSearchSuggestions,
        reset
    };
})();

// Make available globally
window.SearchManager = SearchManager;