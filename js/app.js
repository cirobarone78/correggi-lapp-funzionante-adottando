// Main Application Controller
(function() {
    'use strict';

    // Application State
    const AppState = {
        currentSort: 'updated',
        currentView: 'grid',
        isSearching: false,
        searchTerm: '',
        editingNoteId: null,
        notes: []
    };

    // Initialize app when DOM is ready
    function init() {
        console.log('Initializing Notes App...');
        
        // Initialize theme first
        if (window.ThemeManager) {
            window.ThemeManager.init();
        }

        // Load notes from storage
        loadNotes();

        // Setup event listeners
        setupEventListeners();

        // Initial render
        renderNotes();

        // Update stats
        updateStats();

        console.log('Notes App initialized successfully');
    }

    // Load notes from storage
    function loadNotes() {
        if (window.StorageManager) {
            AppState.notes = window.StorageManager.getAllNotes();
            console.log(`Loaded ${AppState.notes.length} notes from storage`);
        } else {
            console.error('StorageManager not available');
            AppState.notes = [];
        }
    }

    // Setup all event listeners
    function setupEventListeners() {
        // New note buttons
        const newNoteBtn = document.getElementById('newNoteBtn');
        const emptyStateNewNoteBtn = document.getElementById('emptyStateNewNoteBtn');
        
        if (newNoteBtn) {
            newNoteBtn.addEventListener('click', handleNewNote);
        }
        if (emptyStateNewNoteBtn) {
            emptyStateNewNoteBtn.addEventListener('click', handleNewNote);
        }

        // Modal controls
        const modalClose = document.getElementById('modalClose');
        const modalOverlay = document.getElementById('modalOverlay');
        const cancelBtn = document.getElementById('cancelBtn');
        const saveBtn = document.getElementById('saveBtn');

        if (modalClose) modalClose.addEventListener('click', closeModal);
        if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
        if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
        if (saveBtn) saveBtn.addEventListener('click', handleSaveNote);

        // Delete modal controls
        const deleteModalClose = document.getElementById('deleteModalClose');
        const deleteModalOverlay = document.getElementById('deleteModalOverlay');
        const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
        const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');

        if (deleteModalClose) deleteModalClose.addEventListener('click', closeDeleteModal);
        if (deleteModalOverlay) deleteModalOverlay.addEventListener('click', closeDeleteModal);
        if (cancelDeleteBtn) cancelDeleteBtn.addEventListener('click', closeDeleteModal);
        if (confirmDeleteBtn) confirmDeleteBtn.addEventListener('click', confirmDelete);

        // Color picker
        const colorPicker = document.getElementById('colorPicker');
        if (colorPicker) {
            colorPicker.addEventListener('click', handleColorSelect);
        }

        // Sort filters
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', handleSortChange);
        });

        // View toggle
        const viewButtons = document.querySelectorAll('.view-btn');
        viewButtons.forEach(btn => {
            btn.addEventListener('click', handleViewChange);
        });

        // Search
        const searchInput = document.getElementById('searchInput');
        const searchClear = document.getElementById('searchClear');
        
        if (searchInput) {
            searchInput.addEventListener('input', handleSearch);
        }
        if (searchClear) {
            searchClear.addEventListener('click', clearSearch);
        }

        // Export
        const exportBtn = document.getElementById('exportBtn');
        if (exportBtn) {
            exportBtn.addEventListener('click', handleExport);
        }

        // Mobile menu
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', toggleMobileMenu);
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', handleKeyboardShortcuts);

        // Close modal on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeModal();
                closeDeleteModal();
            }
        });
    }

    // Handle new note creation
    function handleNewNote() {
        AppState.editingNoteId = null;
        const modal = document.getElementById('noteModal');
        const modalTitle = document.getElementById('modalTitle');
        const noteTitle = document.getElementById('noteTitle');
        const noteContent = document.getElementById('noteContent');

        if (modalTitle) modalTitle.textContent = 'New Note';
        if (noteTitle) noteTitle.value = '';
        if (noteContent) noteContent.value = '';

        // Reset color selection
        const colorOptions = document.querySelectorAll('.color-option');
        colorOptions.forEach(opt => opt.classList.remove('active'));
        const defaultColor = document.querySelector('.color-option[data-color="default"]');
        if (defaultColor) defaultColor.classList.add('active');

        if (modal) {
            modal.style.display = 'flex';
            setTimeout(() => modal.classList.add('active'), 10);
            if (noteTitle) noteTitle.focus();
        }
    }

    // Handle edit note
    window.handleEditNote = function(noteId) {
        const note = AppState.notes.find(n => n.id === noteId);
        if (!note) return;

        AppState.editingNoteId = noteId;
        const modal = document.getElementById('noteModal');
        const modalTitle = document.getElementById('modalTitle');
        const noteTitle = document.getElementById('noteTitle');
        const noteContent = document.getElementById('noteContent');

        if (modalTitle) modalTitle.textContent = 'Edit Note';
        if (noteTitle) noteTitle.value = note.title || '';
        if (noteContent) noteContent.value = note.content || '';

        // Set color selection
        const colorOptions = document.querySelectorAll('.color-option');
        colorOptions.forEach(opt => {
            opt.classList.toggle('active', opt.dataset.color === note.color);
        });

        if (modal) {
            modal.style.display = 'flex';
            setTimeout(() => modal.classList.add('active'), 10);
            if (noteTitle) noteTitle.focus();
        }
    };

    // Handle delete note
    window.handleDeleteNote = function(noteId) {
        AppState.editingNoteId = noteId;
        const modal = document.getElementById('deleteModal');
        if (modal) {
            modal.style.display = 'flex';
            setTimeout(() => modal.classList.add('active'), 10);
        }
    };

    // Confirm delete
    function confirmDelete() {
        if (AppState.editingNoteId && window.StorageManager) {
            window.StorageManager.deleteNote(AppState.editingNoteId);
            loadNotes();
            renderNotes();
            updateStats();
            closeDeleteModal();
            
            // Show success message
            if (window.UIManager) {
                window.UIManager.showToast('Note deleted successfully', 'success');
            }
        }
    }

    // Handle save note
    function handleSaveNote() {
        const noteTitle = document.getElementById('noteTitle');
        const noteContent = document.getElementById('noteContent');
        const activeColor = document.querySelector('.color-option.active');

        const title = noteTitle ? noteTitle.value.trim() : '';
        const content = noteContent ? noteContent.value.trim() : '';

        if (!title && !content) {
            if (window.UIManager) {
                window.UIManager.showToast('Please enter a title or content', 'error');
            }
            return;
        }

        const color = activeColor ? activeColor.dataset.color : 'default';

        if (window.StorageManager) {
            if (AppState.editingNoteId) {
                // Update existing note
                window.StorageManager.updateNote(AppState.editingNoteId, {
                    title: title || 'Untitled',
                    content,
                    color
                });
                if (window.UIManager) {
                    window.UIManager.showToast('Note updated successfully', 'success');
                }
            } else {
                // Create new note
                window.StorageManager.saveNote({
                    title: title || 'Untitled',
                    content,
                    color
                });
                if (window.UIManager) {
                    window.UIManager.showToast('Note created successfully', 'success');
                }
            }

            loadNotes();
            renderNotes();
            updateStats();
            closeModal();
        }
    }

    // Close modal
    function closeModal() {
        const modal = document.getElementById('noteModal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }
        AppState.editingNoteId = null;
    }

    // Close delete modal
    function closeDeleteModal() {
        const modal = document.getElementById('deleteModal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }
        AppState.editingNoteId = null;
    }

    // Handle color selection
    function handleColorSelect(e) {
        if (e.target.classList.contains('color-option')) {
            const colorOptions = document.querySelectorAll('.color-option');
            colorOptions.forEach(opt => opt.classList.remove('active'));
            e.target.classList.add('active');
        }
    }

    // Handle sort change
    function handleSortChange(e) {
        const sortType = e.currentTarget.dataset.sort;
        if (!sortType) return;

        AppState.currentSort = sortType;

        // Update active state
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            const isActive = btn.dataset.sort === sortType;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-checked', isActive);
        });

        renderNotes();
    }

    // Handle view change
    function handleViewChange(e) {
        const viewType = e.currentTarget.dataset.view;
        if (!viewType) return;

        AppState.currentView = viewType;

        // Update active state
        const viewButtons = document.querySelectorAll('.view-btn');
        viewButtons.forEach(btn => {
            const isActive = btn.dataset.view === viewType;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', isActive);
        });

        // Update container view
        const notesContainer = document.getElementById('notesContainer');
        if (notesContainer) {
            notesContainer.dataset.view = viewType;
        }
    }

    // Handle search with debounce
    let searchTimeout;
    function handleSearch(e) {
        clearTimeout(searchTimeout);
        const searchTerm = e.target.value.trim();

        searchTimeout = setTimeout(() => {
            AppState.searchTerm = searchTerm;
            AppState.isSearching = searchTerm.length > 0;

            // Show/hide clear button
            const searchClear = document.getElementById('searchClear');
            if (searchClear) {
                searchClear.style.display = searchTerm ? 'flex' : 'none';
            }

            renderNotes();
        }, 300);
    }

    // Clear search
    function clearSearch() {
        const searchInput = document.getElementById('searchInput');
        const searchClear = document.getElementById('searchClear');

        if (searchInput) searchInput.value = '';
        if (searchClear) searchClear.style.display = 'none';

        AppState.searchTerm = '';
        AppState.isSearching = false;
        renderNotes();
    }

    // Render notes
    function renderNotes() {
        let notesToRender = [...AppState.notes];

        // Apply search filter
        if (AppState.isSearching && window.SearchManager) {
            notesToRender = window.SearchManager.searchNotes(notesToRender, AppState.searchTerm);
        }

        // Apply sort
        if (window.NotesManager) {
            notesToRender = window.NotesManager.sortNotes(notesToRender, AppState.currentSort);
        }

        const notesContainer = document.getElementById('notesContainer');
        const emptyState = document.getElementById('emptyState');
        const noResultsState = document.getElementById('noResultsState');

        if (!notesContainer) return;

        // Clear container
        notesContainer.innerHTML = '';

        // Show appropriate state
        if (notesToRender.length === 0) {
            if (AppState.isSearching) {
                // Show no results
                if (emptyState) emptyState.style.display = 'none';
                if (noResultsState) noResultsState.style.display = 'flex';
            } else {
                // Show empty state
                if (emptyState) emptyState.style.display = 'flex';
                if (noResultsState) noResultsState.style.display = 'none';
            }
        } else {
            if (emptyState) emptyState.style.display = 'none';
            if (noResultsState) noResultsState.style.display = 'none';

            // Render note cards
            if (window.UIManager) {
                notesToRender.forEach((note, index) => {
                    const noteCard = window.UIManager.createNoteCard(note);
                    noteCard.style.animationDelay = `${index * 0.05}s`;
                    notesContainer.appendChild(noteCard);
                });
            }
        }
    }

    // Update statistics
    function updateStats() {
        const totalNotesCount = document.getElementById('totalNotesCount');
        const lastUpdated = document.getElementById('lastUpdated');

        if (totalNotesCount) {
            totalNotesCount.textContent = AppState.notes.length;
        }

        if (lastUpdated && AppState.notes.length > 0) {
            const latest = AppState.notes.reduce((latest, note) => {
                return new Date(note.updatedAt) > new Date(latest.updatedAt) ? note : latest;
            });
            lastUpdated.textContent = window.UIManager ? 
                window.UIManager.formatDate(latest.updatedAt) : 'Just now';
        } else if (lastUpdated) {
            lastUpdated.textContent = 'Never';
        }
    }

    // Handle export
    function handleExport() {
        if (AppState.notes.length === 0) {
            if (window.UIManager) {
                window.UIManager.showToast('No notes to export', 'error');
            }
            return;
        }

        const dataStr = JSON.stringify(AppState.notes, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `notes-export-${Date.now()}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        if (window.UIManager) {
            window.UIManager.showToast('Notes exported successfully', 'success');
        }
    }

    // Toggle mobile menu
    function toggleMobileMenu() {
        const sidebar = document.getElementById('sidebar');
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');

        if (sidebar) {
            const isOpen = sidebar.classList.toggle('mobile-open');
            if (mobileMenuToggle) {
                mobileMenuToggle.setAttribute('aria-expanded', isOpen);
            }
        }
    }

    // Keyboard shortcuts
    function handleKeyboardShortcuts(e) {
        // Ctrl/Cmd + N: New note
        if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
            e.preventDefault();
            handleNewNote();
        }

        // Ctrl/Cmd + F: Focus search
        if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
            e.preventDefault();
            const searchInput = document.getElementById('searchInput');
            if (searchInput) searchInput.focus();
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();