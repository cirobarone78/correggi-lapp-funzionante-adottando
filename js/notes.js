<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Notes App - Modern Note Taking</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="app-container">
        <aside class="sidebar" id="sidebar">
            <div class="sidebar-header">
                <div class="logo">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                    <h1>Notes</h1>
                </div>
                <button class="icon-btn" id="sidebarToggle" aria-label="Toggle sidebar">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                </button>
            </div>

            <button class="btn-primary" id="newNoteBtn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                New Note
            </button>

            <div class="search-container">
                <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                </svg>
                <input type="text" id="searchInput" placeholder="Search notes..." class="search-input">
            </div>

            <div class="sidebar-section">
                <h3 class="section-title">Sort By</h3>
                <div class="filter-group">
                    <button class="filter-btn active" data-sort="updated" role="radio" aria-checked="true">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        Last Modified
                    </button>
                    <button class="filter-btn" data-sort="created" role="radio" aria-checked="false">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        Date Created
                    </button>
                    <button class="filter-btn" data-sort="title" role="radio" aria-checked="false">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="21" y1="10" x2="3" y2="10"></line>
                            <line x1="21" y1="6" x2="3" y2="6"></line>
                            <line x1="21" y1="14" x2="3" y2="14"></line>
                            <line x1="21" y1="18" x2="3" y2="18"></line>
                        </svg>
                        Title (A-Z)
                    </button>
                </div>
            </div>

            <div class="sidebar-footer">
                <div class="stats">
                    <div class="stat-item">
                        <span class="stat-label">Total Notes</span>
                        <span class="stat-value" id="totalNotes">0</span>
                    </div>
                </div>
                <button class="icon-btn theme-toggle" id="themeToggle" aria-label="Toggle dark mode">
                    <svg class="sun-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="5"></circle>
                        <line x1="12" y1="1" x2="12" y2="3"></line>
                        <line x1="12" y1="21" x2="12" y2="23"></line>
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                        <line x1="1" y1="12" x2="3" y2="12"></line>
                        <line x1="21" y1="12" x2="23" y2="12"></line>
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                    </svg>
                    <svg class="moon-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                </button>
            </div>
        </aside>

        <main class="main-content">
            <header class="top-bar">
                <button class="icon-btn mobile-menu-btn" id="mobileMenuBtn" aria-label="Open menu">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                </button>
                <h2 class="page-title">All Notes</h2>
            </header>

            <div class="notes-grid" id="notesContainer"></div>

            <div class="empty-state" id="emptyState" style="display: none;">
                <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                </svg>
                <h3>No notes yet</h3>
                <p>Create your first note to get started</p>
                <button class="btn-primary" id="emptyStateNewNoteBtn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    Create Note
                </button>
            </div>

            <div class="empty-state" id="noResultsState" style="display: none;">
                <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                </svg>
                <h3>No results found</h3>
                <p>Try adjusting your search query</p>
            </div>
        </main>
    </div>

    <div class="modal" id="noteModal" style="display: none;">
        <div class="modal-overlay" id="modalOverlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h2 id="modalTitle">New Note</h2>
                <button class="icon-btn" id="modalClose" aria-label="Close">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label for="noteTitle">Title</label>
                    <input type="text" id="noteTitle" placeholder="Enter note title..." maxlength="100">
                </div>
                <div class="form-group">
                    <label for="noteContent">Content</label>
                    <textarea id="noteContent" placeholder="Write your note content..." rows="12"></textarea>
                </div>
                <div class="form-group">
                    <label>Color</label>
                    <div class="color-picker">
                        <button class="color-option active" data-color="#ffffff" style="background-color: #ffffff;" aria-label="White"></button>
                        <button class="color-option" data-color="#fef3c7" style="background-color: #fef3c7;" aria-label="Yellow"></button>
                        <button class="color-option" data-color="#dbeafe" style="background-color: #dbeafe;" aria-label="Blue"></button>
                        <button class="color-option" data-color="#dcfce7" style="background-color: #dcfce7;" aria-label="Green"></button>
                        <button class="color-option" data-color="#fce7f3" style="background-color: #fce7f3;" aria-label="Pink"></button>
                        <button class="color-option" data-color="#e0e7ff" style="background-color: #e0e7ff;" aria-label="Indigo"></button>
                        <button class="color-option" data-color="#fed7aa" style="background-color: #fed7aa;" aria-label="Orange"></button>
                        <button class="color-option" data-color="#f3e8ff" style="background-color: #f3e8ff;" aria-label="Purple"></button>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn-danger" id="deleteNoteBtn" style="display: none;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                    Delete
                </button>
                <button class="btn-primary" id="saveNoteBtn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Save Note
                </button>
            </div>
        </div>
    </div>

    <div class="notification" id="notification" style="display: none;">
        <svg class="notification-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span class="notification-text"></span>
    </div>

    <script src="storage.js"></script>
    <script src="ui.js"></script>
    <script src="notes.js"></script>
    <script src="app.js"></script>
</body>
</html>
```css
:root {
    --primary-color: #3b82f6;
    --primary-hover: #2563eb;
    --danger-color: #ef4444;
    --danger-hover: #dc2626;
    --success-color: #10b981;
    --warning-color: #f59e0b;
    --bg-primary: #ffffff;
    --bg-secondary: #f9fafb;
    --bg-tertiary: #f3f4f6;
    --text-primary: #111827;
    --text-secondary: #6b7280;
    --text-tertiary: #9ca3af;
    --border-color: #e5e7eb;
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    --sidebar-width: 280px;
    --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

[data-theme="dark"] {
    --bg-primary: #111827;
    --bg-secondary: #1f2937;
    --bg-tertiary: #374151;
    --text-primary: #f9fafb;
    --text-secondary: #d1d5db;
    --text-tertiary: #9ca3af;
    --border-color: #374151;
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.4);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    background-color: var(--bg-secondary);
    color: var(--text-primary);
    line-height: 1.6;
    transition: var(--transition);
}

.app-container {
    display: flex;
    height: 100vh;
    overflow: hidden;
}

.sidebar {
    width: var(--sidebar-width);
    background-color: var(--bg-primary);
    border-right: 1px solid var(--border-color);
    display: flex;
    flex-direction: column;
    transition: var(--transition);
    z-index: 100;
}

.sidebar-header {
    padding: 1.5rem;
    border-bottom: 1px solid var(--border-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: var(--primary-color);
}

.logo svg {
    flex-shrink: 0;
}

.logo h1 {
    font-size: 1.5rem;
    font-weight: 700;
}

.sidebar .btn-primary {
    margin: 1.5rem;
    margin-bottom: 1rem;
}

.search-container {
    margin: 0 1.5rem 1.5rem;
    position: relative;
}

.search-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-tertiary);
    pointer-events: none;
}

.search-input {
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 2.75rem;
    border: 1px solid var(--border-color);
    border-radius: 0.5rem;
    background-color: var(--bg-secondary);
    color: var(--text-primary);
    font-size: 0.875rem;
    transition: var(--transition);
}

.search-input:focus {
    outline: none;
    border-color: var(--primary-color);
    background-color: var(--bg-primary);
}

.sidebar-section {
    padding: 0 1.5rem 1.5rem;
}

.section-title {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-tertiary);
    margin-bottom: 0.75rem;
}

.filter-group {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.filter-btn {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    border: none;
    border-radius: 0.5rem;
    background-color: transparent;
    color: var(--text-secondary);
    font-size: 0.875rem;
    cursor: pointer;
    transition: var(--transition);
    text-align: left;
}

.filter-btn:hover {
    background-color: var(--bg-secondary);
    color: var(--text-primary);
}

.filter-btn.active {
    background-color: var(--primary-color);
    color: white;
}

.sidebar-footer {
    margin-top: auto;
    padding: 1.5rem;
    border-top: 1px solid var(--border-color);
}

.stats {
    margin-bottom: 1rem;
}

.stat-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0;
}

.stat-label {
    font-size: 0.875rem;
    color: var(--text-secondary);
}

.stat-value {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--primary-color);
}

.theme-toggle {
    width: 100%;
    justify-content: center;
}

.theme-toggle .moon-icon {
    display: none;
}

[data-theme="dark"] .theme-toggle .sun-icon {
    display: none;
}

[data-theme="dark"] .theme-toggle .moon-icon {
    display: block;
}

.main-content {
    flex: 1;
    overflow-y: auto;
    padding: 2rem;
}

.top-bar {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
}

.mobile-menu-btn {
    display: none;
}

.page-title {
    font-size: 2rem;
    font-weight: 700;
    color: var(--text-primary);
}

.notes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.note-card {
    background-color: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: 0.75rem;
    padding: 1.5rem;
    cursor: pointer;
    transition: var(--transition);
    box-shadow: var(--shadow-sm);
}

.note-card:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
}

.note-card-header {
    margin-bottom: 1rem;
}

.note-card-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.note-card-date {
    font-size: 0.75rem;
    color: var(--text-tertiary);
}

.note-card-content {
    font-size: 0.875rem;
    color: var(--text-secondary);
    line-height: 1.5;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
}

.empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 400px;
    text-align: center;
    color: var(--text-tertiary);
}

.empty-state svg {
    margin-bottom: 1.5rem;
    opacity: 0.5;
}

.empty-state h3 {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--text-secondary);
    margin-bottom: 0.5rem;
}

.empty-state p {
    font-size: 1rem;
    margin-bottom: 2rem;
}

.btn-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background-color: var(--primary-color);
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition);
    box-shadow: var(--shadow-sm);
}

.btn-primary:hover {
    background-color: var(--primary-hover);
    box-shadow: var(--shadow-md);
}

.btn-primary:active {
    transform: scale(0.98);
}

.btn-danger {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background-color: var(--danger-color);
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition);
}

.btn-danger:hover {
    background-color: var(--danger-hover);
}

.icon-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border: none;
    border-radius: 0.5rem;
    background-color: transparent;
    color: var(--text-secondary);
    cursor: pointer;
    transition: var(--transition);
}

.icon-btn:hover {
    background-color: var(--bg-secondary);
    color: var(--text-primary);
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.modal.active {
    opacity: 1;
}

.modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
    position: relative;
    background-color: var(--bg-primary);
    border-radius: 0.75rem;
    width: 90%;
    max-width: 600px;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    box-shadow: var(--shadow-lg);
    animation: slideUp 0.3s ease;
}

@keyframes slideUp {
    from {
        transform: translateY(20px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    border-bottom: 1px solid var(--border-color);
}

.modal-header h2 {
    font-size: 1.5rem;
    font-weight: 600;
}

.modal-body {
    padding: 1.5rem;
    overflow-y: auto;
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-group label {
    display: block;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text-secondary);
    margin-bottom: 0.5rem;
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: 0.5rem;
    background-color: var(--bg-secondary);
    color: var(--text-primary);
    font-size: 0.875rem;
    font-family: inherit;
    transition: var(--transition);
}

.form-group input:focus,
.form-group textarea:focus {
    outline: none;
    border-color: var(--primary-color);
    background-color: var(--bg-primary);
}

.form-group textarea {
    resize: vertical;
    min-height: 200px;
}

.color-picker {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
}

.color-option {
    width: 2.5rem;
    height: 2.5rem;
    border: 2px solid var(--border-color);
    border-radius: 0.5rem;
    cursor: pointer;
    transition: var(--transition);
}

.color-option:hover {
    transform: scale(1.1);
}

.color-option.active {
    border-color: var(--primary-color);
    border-width: 3px;
    transform: scale(1.1);
}

.modal-footer {
    display: flex;
    justify-content: space-between;
    padding: 1.5rem;
    border-top: 1px solid var(--border-color);
    gap: 1rem;
}

.notification {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background-color: var(--bg-primary);
    color: var(--text-primary);
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    box-shadow: var(--shadow-lg);
    display: flex;
    align-items: center;
    gap: 0.75rem;
    z-index: 2000;
    animation: slideIn 0.3s ease;
}

@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

.notification.success {
    border-left: 4px solid var(--success-color);
}

.notification.error {
    border-left: 4px solid var(--danger-color);
}

.notification.warning {
    border-left: 4px solid var(--warning-color);
}

.notification-icon {
    flex-shrink: 0;
}

.notification.success .notification-icon {
    color: var(--success-color);
}

.notification.error .notification-icon {
    color: var(--danger-color);
}

.notification.warning .notification-icon {
    color: var(--warning-color);
}

@media (max-width: 768px) {
    .sidebar {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        transform: translateX(-100%);
    }

    .sidebar.active {
        transform: translateX(0);
    }

    .main-content {
        padding: 1rem;
    }

    .mobile-menu-btn {
        display: flex;
    }

    .notes-grid {
        grid-template-columns: 1fr;
    }

    .notification {
        bottom: 1rem;
        right: 1rem;
        left: 1rem;
    }
}

@media (max-width: 480px) {
    .logo h1 {
        font-size: 1.25rem;
    }

    .page-title {
        font-size: 1.5rem;
    }

    .modal-content {
        width: 95%;
        max-height: 95vh;
    }

    .modal-footer {
        flex-direction: column;
    }

    .modal-footer button {
        width: 100%;
    }
}
```

```javascript
const StorageManager = (() => {
    const STORAGE_KEY = 'notesApp_notes';
    const SETTINGS_KEY = 'notesApp_settings';

    function init() {
        console.log('✓ Storage Manager initialized');
    }

    function getAllNotes() {
        try {
            const data = localStorage.getItem(STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return [];
        }
    }

    function saveNote(note) {
        try {
            const notes = getAllNotes();
            const existingIndex = notes.findIndex(n => n.id === note.id);
            
            if (existingIndex !== -1) {
                notes[existingIndex] = note;
            } else {
                notes.push(note);
            }
            
            localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
            return note;
        } catch (error) {
            console.error('Error saving note:', error);
            throw error;
        }
    }

    function updateNote(note) {
        return saveNote(note);
    }

    function deleteNote(id) {
        try {
            const notes = getAllNotes();
            const filtered = notes.filter(n => n.id !== id);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
            return true;
        } catch (error) {
            console.error('Error deleting note:', error);
            throw error;
        }
    }

    function getSettings() {
        try {
            const data = localStorage.getItem(SETTINGS_KEY);
            return data ? JSON.parse(data) : { theme: 'light' };
        } catch (error) {
            console.error('Error reading settings:', error);
            return { theme: 'light' };
        }
    }

    function saveSettings(settings) {
        try {
            localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
            return settings;
        } catch (error) {
            console.error('Error saving settings:', error);
            throw error;
        }
    }

    return {
        init,
        getAllNotes,
        saveNote,
        updateNote,
        deleteNote,
        getSettings,
        saveSettings
    };
})();
```

```javascript
const UIManager = (() => {
    let notificationTimeout = null;

    function init() {
        setupTheme();
        setupMobileMenu();
        setupSearchHandler();
        console.log('✓ UI Manager initialized');
    }

    function setupTheme() {
        const themeToggle = document.getElementById('themeToggle');
        const settings = StorageManager.getSettings();
        
        if (settings.theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        }

        if (themeToggle) {
            themeToggle.addEventListener('click', toggleTheme);
        }
    }

    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        StorageManager.saveSettings({ theme: newTheme });
        
        showNotification(`${newTheme === 'dark' ? 'Dark' : 'Light'} mode enabled`, 'success');
    }

    function setupMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const sidebar = document.getElementById('sidebar');
        const sidebarToggle = document.getElementById('sidebarToggle');

        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                sidebar.classList.toggle('active');
            });
        }

        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => {
                sidebar.classList.toggle('active');
            });
        }

        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 && sidebar.classList.contains('active')) {
                if (!sidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                    sidebar.classList.remove('active');
                }
            }
        });
    }

    function setupSearchHandler() {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            let searchTimeout;
            searchInput.addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    NotesManager.setSearchQuery(e.target.value);
                }, 300);
            });
        }
    }

    function showNotification(message, type = 'success') {
        const notification = document.getElementById('notification');
        if (!notification) return;

        if (notificationTimeout) {
            clearTimeout(notificationTimeout);
        }

        const textElement = notification.querySelector('.notification-text');
        if (textElement) {
            textElement.textContent = message;
        }

        notification.className = 'notification ' + type;
        notification.style.display = 'flex';

        notificationTimeout = setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    }

    function updateStats(totalNotes) {
        const totalNotesElement = document.getElementById('totalNotes');
        if (totalNotesElement) {
            totalNotesElement.textContent = totalNotes;
        }
    }

    return {
        init,
        showNotification,
        updateStats,
        toggleTheme
    };
})();
```

```javascript
const NotesManager = (() => {
    let currentNotes = [];
    let currentSort = 'updated';
    let currentEditingId = null;
    let autoSaveTimeout = null;
    let currentSearchQuery = '';

    const NOTE_COLORS = [
        '#ffffff',
        '#fef3c7',
        '#dbeafe',
        '#dcfce7',
        '#fce7f3',
        '#e0e7ff',
        '#fed7aa',
        '#f3e8ff'
    ];

    function init() {
        loadNotes();
        setupEventListeners();
        renderNotes();
        console.log('✓ Notes Manager initialized');
    }

    function loadNotes() {
        try {
            currentNotes = StorageManager.getAllNotes();
            console.log(`Loaded ${currentNotes.length} notes from storage`);
        } catch (error) {
            console.error('Error loading notes:', error);
            currentNotes = [];
            UIManager.showNotification('Error loading notes', 'error');
        }
    }

    function setupEventListeners() {
        const newNoteBtn = document.getElementById('newNoteBtn');
        const emptyStateNewNoteBtn = document.getElementById('emptyStateNewNoteBtn');
        
        if (newNoteBtn) {
            newNoteBtn.addEventListener('click', () => openNoteModal());
        }
        if (emptyStateNewNoteBtn) {
            emptyStateNewNoteBtn.addEventListener('click', () => openNoteModal());
        }

        const modalClose = document.getElementById('modalClose');
        const modalOverlay = document.getElementById('modalOverlay');
        const saveNoteBtn = document.getElementById('saveNoteBtn');
        const deleteNoteBtn = document.getElementById('deleteNoteBtn');

        if (modalClose) {
            modalClose.addEventListener('click', closeNoteModal);
        }
        if (modalOverlay) {
            modalOverlay.addEventListener('click', closeNoteModal);
        }
        if (saveNoteBtn) {
            saveNoteBtn.addEventListener('click', saveNote);
        }
        if (deleteNoteBtn) {
            deleteNoteBtn.addEventListener('click', () => {
                if (currentEditingId && confirm('Are you sure you want to delete this note?')) {
                    deleteNote(currentEditingId);
                    closeNoteModal();
                }
            });
        }

        const noteTitle = document.getElementById('noteTitle');
        const noteContent = document.getElementById('noteContent');
        
        if (noteTitle) {
            noteTitle.addEventListener('input', handleAutoSave);
        }
        if (noteContent) {
            noteContent.addEventListener('input', handleAutoSave);
        }

        const colorOptions = document.querySelectorAll('.color-option');
        colorOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                colorOptions.forEach(opt => opt.classList.remove('active'));
                e.target.classList.add('active');
            });
        });

        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const sortType = btn.dataset.sort;
                setSortType(sortType);
                
                filterButtons.forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-checked', 'false');
                });
                btn.classList.add('active');
                btn.setAttribute('aria-checked', 'true');
            });
        });

        document.addEventListener('keydown', handleKeyboardShortcuts);
    }

    function handleKeyboardShortcuts(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
            e.preventDefault();
            openNoteModal();
        }

        if (e.key === 'Escape') {
            const modal = document.getElementById('noteModal');
            if (modal && modal.style.display !== 'none') {
                closeNoteModal();
            }
        }

        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            const modal = document.getElementById('noteModal');
            if (modal && modal.style.display !== 'none') {
                e.preventDefault();
                saveNote();
            }
        }
    }

    function openNoteModal(noteId = null) {
        const modal = document.getElementById('noteModal');
        const modalTitle = document.getElementById('modalTitle');
        const titleInput = document.getElementById('noteTitle');
        const contentInput = document.getElementById('noteContent');
        const deleteBtn = document.getElementById('deleteNoteBtn');
        const colorOptions = document.querySelectorAll('.color-option');

        if (!modal) return;

        currentEditingId = noteId;

        if (noteId) {
            const note = currentNotes.find(n => n.id === noteId);
            if (note) {
                modalTitle.textContent = 'Edit Note';
                titleInput.value = note.title;
                contentInput.value = note.content;
                deleteBtn.style.display = 'flex';

                colorOptions.forEach(option => {
                    option.classList.remove('active');
                    if (option.dataset.color === note.color) {
                        option.classList.add('active');
                    }
                });
            }
        } else {
            modalTitle.textContent = 'New Note';
            titleInput.value = '';
            contentInput.value = '';
            deleteBtn.style.display = 'none';

            colorOptions.forEach(option => {
                option.classList.remove('active');
                if (option.dataset.color === NOTE_COLORS[0]) {
                    option.classList.add('active');
                }
            });
        }

        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('active');
            titleInput.focus();
        }, 10);

        document.body.style.overflow = 'hidden';
    }

    function closeNoteModal() {
        const modal = document.getElementById('noteModal');
        if (!modal) return;

        if (autoSaveTimeout) {
            clearTimeout(autoSaveTimeout);
            autoSaveTimeout = null;
        }

        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
            currentEditingId = null;
            document.body.style.overflow = '';
        }, 300);
    }

    function handleAutoSave() {
        if (!currentEditingId) return;

        if (autoSaveTimeout) {
            clearTimeout(autoSaveTimeout);
        }

        autoSaveTimeout = setTimeout(() => {
            saveNote(true);
        }, 2000);
    }

    function createNote(title, content, color = NOTE_COLORS[0]) {
        try {
            const note = {
                id: Date.now(),
                title: title.trim() || 'Untitled Note',
                content: content.trim(),
                color: color,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            const savedNote = StorageManager.saveNote(note);
            currentNotes.unshift(savedNote);
            
            console.log('Note created:', savedNote.id);
            return savedNote;
        } catch (error) {
            console.error('Error creating note:', error);
            throw error;
        }
    }

    function updateNote(id, title, content, color) {
        try {
            const index = currentNotes.findIndex(n => n.id === id);
            if (index === -1) {
                throw new Error('Note not found');
            }

            const updatedNote = {
                ...currentNotes[index],
                title: title.trim() || 'Untitled Note',
                content: content.trim(),
                color: color,
                updatedAt: new Date().toISOString()
            };

            const savedNote = StorageManager.updateNote(updatedNote);
            currentNotes[index] = savedNote;

            console.log('Note updated:', savedNote.id);
            return savedNote;
        } catch (error) {
            console.error('Error updating note:', error);
            throw error;
        }
    }

    function saveNote(silent = false) {
        const titleInput = document.getElementById('noteTitle');
        const contentInput = document.getElementById('noteContent');
        const activeColor = document.querySelector('.color-option.active');

        if (!titleInput || !contentInput) return;

        const title = titleInput.value;
        const content = contentInput.value;
        const color = activeColor ? activeColor.dataset.color : NOTE_COLORS[0];

        if (!title.trim() && !content.trim()) {
            if (!silent) {
                UIManager.showNotification('Please enter a title or content', 'warning');
            }
            return;
        }

        try {
            let note;
            if (currentEditingId) {
                note = updateNote(currentEditingId, title, content, color);
            } else {
                note = createNote(title, content, color);
            }

            renderNotes();

            if (!silent) {
                UIManager.showNotification(
                    currentEditingId ? 'Note updated successfully' : 'Note created successfully',
                    'success'
                );
                closeNoteModal();
            }
        } catch (error) {
            if (!silent) {
                UIManager.showNotification('Error saving note', 'error');
            }
        }
    }

    function deleteNote(id) {
        try {
            const index = currentNotes.findIndex(n => n.id === id);
            if (index === -1) {
                throw new Error('Note not found');
            }

            StorageManager.deleteNote(id);
            currentNotes.splice(index, 1);

            renderNotes();
            UIManager.showNotification('Note deleted successfully', 'success');
            console.log('Note deleted:', id);
        } catch (error) {
            console.error('Error deleting note:', error);
            UIManager.showNotification('Error deleting note', 'error');
        }
    }

    function setSortType(sortType) {
        currentSort = sortType;
        renderNotes();
    }

    function sortNotes(notes) {
        const sorted = [...notes];

        switch (currentSort) {
            case 'updated':
                sorted.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
                break;
            case 'created':
                sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                break;
            case 'title':
                sorted.sort((a, b) => a.title.localeCompare(b.title));
                break;
        }

        return sorted;
    }

    function filterNotes(notes, query) {
        if (!query || !query.trim()) {
            return notes;
        }

        const lowerQuery = query.toLowerCase().trim();
        return notes.filter(note => {
            return note.title.toLowerCase().includes(lowerQuery) ||
                   note.content.toLowerCase().includes(lowerQuery);
        });
    }

    function setSearchQuery(query) {
        currentSearchQuery = query;
        renderNotes();
    }

    function getDisplayNotes() {
        let notes = [...currentNotes];
        notes = filterNotes(notes, currentSearchQuery);
        notes = sortNotes(notes);
        return notes;
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins} min ago`;
        if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
        
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }

    function renderNotes() {
        const container = document.getElementById('notesContainer');
        const emptyState = document.getElementById('emptyState');
        const noResultsState = document.getElementById('noResultsState');

        if (!container) return;

        const displayNotes = getDisplayNotes();

        updateStats();

        if (currentNotes.length === 0) {
            container.innerHTML = '';
            emptyState.style.display = 'flex';
            noResultsState.style.display = 'none';
            return;
        }

        if (displayNotes.length === 0) {
            container.innerHTML = '';
            emptyState.style.display = 'none';
            noResultsState.style.display = 'flex';
            return;
        }

        emptyState.style.display = 'none';
        noResultsState.style.display = 'none';

        container.innerHTML = displayNotes.map(note => `
            <div class="note-card" data-id="${note.id}" style="background-color: ${note.color};">
                <div class="note-card-header">
                    <h3 class="note-card-title">${escapeHtml(note.title)}</h3>
                    <p class="note-card-date">${formatDate(note.updatedAt)}</p>
                </div>
                <p class="note-card-content">${escapeHtml(note.content)}</p>
            </div>
        `).join('');

        container.querySelectorAll('.note-card').forEach(card => {
            card.addEventListener('click', () => {
                const noteId = parseInt(card.dataset.id);
                openNoteModal(noteId);
            });
        });
    }

    function updateStats() {
        UIManager.updateStats(currentNotes.length);
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    return {
        init,
        setSearchQuery,
        openNoteModal
    };
})();
```

```javascript
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Notes App Starting...');
    
    StorageManager.init();
    UIManager.init();
    NotesManager.init();
    
    console.log('✅ Notes App Ready');
});
```