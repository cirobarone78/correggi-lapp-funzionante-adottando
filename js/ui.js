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
                <div class="app-logo">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                    <h1>Notes</h1>
                </div>
                <button class="icon-btn mobile-close" id="mobileSidebarClose" aria-label="Close sidebar">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>

            <button class="btn btn-primary new-note-btn" id="newNoteBtn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                New Note
            </button>

            <div class="search-box">
                <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                </svg>
                <input type="text" id="searchInput" placeholder="Search notes..." aria-label="Search notes">
                <button class="search-clear" id="searchClear" aria-label="Clear search" style="display: none;">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>

            <nav class="sidebar-nav">
                <a href="#" class="nav-item active" data-filter="all" id="allNotesNav">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                    All Notes
                    <span class="count" id="allNotesCount">0</span>
                </a>
            </nav>

            <div class="sidebar-footer">
                <div class="stats">
                    <div class="stat-item">
                        <span class="stat-label">Total Notes</span>
                        <span class="stat-value" id="totalNotesCount">0</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Last Updated</span>
                        <span class="stat-value" id="lastUpdated">Never</span>
                    </div>
                </div>
                <button class="theme-toggle" id="themeToggle" aria-label="Toggle dark mode">
                    <svg class="sun-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
                    <svg class="moon-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                    <span>Dark Mode</span>
                </button>
            </div>
        </aside>

        <main class="main-content">
            <header class="main-header">
                <button class="icon-btn mobile-menu-toggle" id="mobileMenuToggle" aria-label="Open sidebar" aria-expanded="false">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                </button>
                <h2 class="content-title" id="contentTitle">All Notes</h2>
                <div class="view-controls">
                    <button class="view-btn active" data-view="grid" aria-label="Grid view" aria-pressed="true" title="Grid view">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="3" y="3" width="7" height="7"></rect>
                            <rect x="14" y="3" width="7" height="7"></rect>
                            <rect x="14" y="14" width="7" height="7"></rect>
                            <rect x="3" y="14" width="7" height="7"></rect>
                        </svg>
                    </button>
                    <button class="view-btn" data-view="list" aria-label="List view" aria-pressed="false" title="List view">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="8" y1="6" x2="21" y2="6"></line>
                            <line x1="8" y1="12" x2="21" y2="12"></line>
                            <line x1="8" y1="18" x2="21" y2="18"></line>
                            <line x1="3" y1="6" x2="3.01" y2="6"></line>
                            <line x1="3" y1="12" x2="3.01" y2="12"></line>
                            <line x1="3" y1="18" x2="3.01" y2="18"></line>
                        </svg>
                    </button>
                </div>
            </header>

            <div class="notes-container" id="notesContainer" data-view="grid">
            </div>

            <div class="empty-state" id="emptyState">
                <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                <h3>No notes yet</h3>
                <p>Create your first note to get started</p>
                <button class="btn btn-primary" id="emptyStateBtn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    Create Note
                </button>
            </div>

            <div class="empty-state" id="noResultsState" style="display: none;">
                <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                </svg>
                <h3>No notes found</h3>
                <p>Try searching with different keywords</p>
            </div>
        </main>
    </div>

    <div class="modal" id="noteModal" style="display: none;">
        <div class="modal-overlay" id="modalOverlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3 id="modalTitle">New Note</h3>
                <button class="modal-close" id="modalClose" aria-label="Close modal">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
                    <textarea id="noteContent" placeholder="Start writing your note..." rows="12"></textarea>
                </div>
                <div class="form-group">
                    <label>Color</label>
                    <div class="color-picker">
                        <div class="color-option active" data-color="#6366f1" style="background-color: #6366f1;" title="Indigo"></div>
                        <div class="color-option" data-color="#8b5cf6" style="background-color: #8b5cf6;" title="Purple"></div>
                        <div class="color-option" data-color="#ec4899" style="background-color: #ec4899;" title="Pink"></div>
                        <div class="color-option" data-color="#f43f5e" style="background-color: #f43f5e;" title="Rose"></div>
                        <div class="color-option" data-color="#f59e0b" style="background-color: #f59e0b;" title="Amber"></div>
                        <div class="color-option" data-color="#10b981" style="background-color: #10b981;" title="Emerald"></div>
                        <div class="color-option" data-color="#06b6d4" style="background-color: #06b6d4;" title="Cyan"></div>
                        <div class="color-option" data-color="#64748b" style="background-color: #64748b;" title="Slate"></div>
                    </div>
                    <input type="hidden" id="noteColor" value="#6366f1">
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-danger" id="deleteNoteBtn" style="display: none;">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                    Delete
                </button>
                <div class="modal-actions">
                    <button class="btn btn-secondary" id="cancelNoteBtn">Cancel</button>
                    <button class="btn btn-primary" id="saveNoteBtn">Save Note</button>
                </div>
            </div>
        </div>
    </div>

    <div class="toast-container" id="toastContainer"></div>

    <script src="storage.js"></script>
    <script src="ui.js"></script>
    <script src="app.js"></script>
</body>
</html>
```css
:root {
    --bg-primary: #ffffff;
    --bg-secondary: #f8fafc;
    --bg-tertiary: #f1f5f9;
    --text-primary: #0f172a;
    --text-secondary: #475569;
    --text-tertiary: #94a3b8;
    --border-color: #e2e8f0;
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    --primary-color: #6366f1;
    --primary-hover: #4f46e5;
    --danger-color: #ef4444;
    --danger-hover: #dc2626;
    --success-color: #10b981;
    --sidebar-width: 280px;
    --header-height: 64px;
    --transition: all 0.2s ease;
    --radius-sm: 6px;
    --radius-md: 8px;
    --radius-lg: 12px;
}

[data-theme="dark"] {
    --bg-primary: #0f172a;
    --bg-secondary: #1e293b;
    --bg-tertiary: #334155;
    --text-primary: #f1f5f9;
    --text-secondary: #cbd5e1;
    --text-tertiary: #64748b;
    --border-color: #334155;
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.4);
    --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.6), 0 10px 10px -5px rgba(0, 0, 0, 0.5);
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
    overflow-x: hidden;
    transition: background-color 0.3s ease, color 0.3s ease;
}

.app-container {
    display: flex;
    min-height: 100vh;
}

.sidebar {
    width: var(--sidebar-width);
    background-color: var(--bg-primary);
    border-right: 1px solid var(--border-color);
    display: flex;
    flex-direction: column;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 100;
    transition: var(--transition);
}

.sidebar-header {
    padding: 24px 20px;
    border-bottom: 1px solid var(--border-color);
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.app-logo {
    display: flex;
    align-items: center;
    gap: 12px;
}

.app-logo svg {
    color: var(--primary-color);
}

.app-logo h1 {
    font-size: 24px;
    font-weight: 700;
    color: var(--text-primary);
}

.mobile-close {
    display: none;
}

.new-note-btn {
    margin: 20px 20px 16px 20px;
    width: calc(100% - 40px);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
}

.search-box {
    margin: 0 20px 20px 20px;
    position: relative;
}

.search-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-tertiary);
    pointer-events: none;
}

.search-box input {
    width: 100%;
    padding: 10px 36px 10px 40px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    background-color: var(--bg-secondary);
    color: var(--text-primary);
    font-size: 14px;
    transition: var(--transition);
}

.search-box input:focus {
    outline: none;
    border-color: var(--primary-color);
    background-color: var(--bg-primary);
}

.search-clear {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: var(--text-tertiary);
    cursor: pointer;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-sm);
    transition: var(--transition);
}

.search-clear:hover {
    color: var(--text-primary);
    background-color: var(--bg-tertiary);
}

.sidebar-nav {
    flex: 1;
    padding: 0 20px;
    overflow-y: auto;
}

.nav-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    color: var(--text-secondary);
    text-decoration: none;
    border-radius: var(--radius-md);
    transition: var(--transition);
    margin-bottom: 4px;
    position: relative;
}

.nav-item:hover {
    background-color: var(--bg-secondary);
    color: var(--text-primary);
}

.nav-item.active {
    background-color: var(--bg-secondary);
    color: var(--primary-color);
    font-weight: 500;
}

.nav-item .count {
    margin-left: auto;
    font-size: 12px;
    font-weight: 600;
    color: var(--text-tertiary);
    background-color: var(--bg-tertiary);
    padding: 2px 8px;
    border-radius: 12px;
}

.nav-item.active .count {
    background-color: var(--primary-color);
    color: white;
}

.sidebar-footer {
    padding: 20px;
    border-top: 1px solid var(--border-color);
}

.stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 16px;
}

.stat-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.stat-label {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--text-tertiary);
    font-weight: 600;
}

.stat-value {
    font-size: 18px;
    font-weight: 700;
    color: var(--text-primary);
}

.theme-toggle {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 16px;
    background-color: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    color: var(--text-secondary);
    cursor: pointer;
    transition: var(--transition);
    font-size: 14px;
    font-weight: 500;
}

.theme-toggle:hover {
    background-color: var(--bg-tertiary);
    color: var(--text-primary);
}

.theme-toggle .sun-icon {
    display: block;
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
    margin-left: var(--sidebar-width);
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.main-header {
    height: var(--header-height);
    background-color: var(--bg-primary);
    border-bottom: 1px solid var(--border-color);
    padding: 0 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 50;
}

.mobile-menu-toggle {
    display: none;
}

.content-title {
    font-size: 24px;
    font-weight: 700;
    color: var(--text-primary);
}

.view-controls {
    display: flex;
    gap: 4px;
    background-color: var(--bg-secondary);
    padding: 4px;
    border-radius: var(--radius-md);
}

.view-btn {
    padding: 8px 12px;
    background: none;
    border: none;
    color: var(--text-secondary);
    cursor: pointer;
    border-radius: var(--radius-sm);
    transition: var(--transition);
    display: flex;
    align-items: center;
    justify-content: center;
}

.view-btn:hover {
    color: var(--text-primary);
    background-color: var(--bg-tertiary);
}

.view-btn.active {
    background-color: var(--bg-primary);
    color: var(--primary-color);
    box-shadow: var(--shadow-sm);
}

.notes-container {
    padding: 32px;
    display: grid;
    gap: 20px;
    animation: fadeIn 0.3s ease;
}

.notes-container[data-view="grid"] {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

.notes-container[data-view="list"] {
    grid-template-columns: 1fr;
    max-width: 900px;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.note-card {
    background-color: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: 20px;
    cursor: pointer;
    transition: var(--transition);
    position: relative;
    overflow: hidden;
    animation: slideIn 0.3s ease forwards;
    opacity: 0;
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.note-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background-color: var(--note-color);
}

.note-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
    border-color: var(--note-color);
}

.notes-container[data-view="list"] .note-card:hover {
    transform: translateX(4px);
}

.note-card-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 12px;
}

.note-card-title {
    font-size: 18px;
    font-weight: 600;
    color: var(--text-primary);
    line-height: 1.4;
    word-break: break-word;
}

.note-card-actions {
    display: flex;
    gap: 4px;
    opacity: 0;
    transition: var(--transition);
}

.note-card:hover .note-card-actions {
    opacity: 1;
}

.note-action-btn {
    padding: 6px;
    background-color: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    color: var(--text-secondary);
    cursor: pointer;
    transition: var(--transition);
    display: flex;
    align-items: center;
    justify-content: center;
}

.note-action-btn:hover {
    background-color: var(--bg-tertiary);
    color: var(--text-primary);
}

.note-action-btn.delete-note:hover {
    background-color: var(--danger-color);
    color: white;
    border-color: var(--danger-color);
}

.note-card-content {
    margin-bottom: 16px;
}

.note-card-content p {
    color: var(--text-secondary);
    font-size: 14px;
    line-height: 1.6;
    word-break: break-word;
}

.note-card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 12px;
    border-top: 1px solid var(--border-color);
}

.note-date,
.note-word-count {
    font-size: 12px;
    color: var(--text-tertiary);
}

.empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 80px 20px;
    text-align: center;
}

.empty-state svg {
    color: var(--text-tertiary);
    margin-bottom: 24px;
    opacity: 0.5;
}

.empty-state h3 {
    font-size: 24px;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 8px;
}

.empty-state p {
    font-size: 16px;
    color: var(--text-secondary);
    margin-bottom: 24px;
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
    padding: 20px;
    opacity: 0;
    transition: opacity 0.2s ease;
}

.modal.modal-open {
    opacity: 1;
}

.modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
}

.modal-content {
    position: relative;
    background-color: var(--bg-primary);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-xl);
    width: 100%;
    max-width: 600px;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    transform: scale(0.9);
    transition: transform 0.2s ease;
}

.modal.modal-open .modal-content {
    transform: scale(1);
}

.modal-header {
    padding: 24px 24px 20px 24px;
    border-bottom: 1px solid var(--border-color);
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.modal-header h3 {
    font-size: 20px;
    font-weight: 700;
    color: var(--text-primary);
}

.modal-close {
    padding: 8px;
    background: none;
    border: none;
    color: var(--text-secondary);
    cursor: pointer;
    border-radius: var(--radius-sm);
    transition: var(--transition);
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-close:hover {
    background-color: var(--bg-secondary);
    color: var(--text-primary);
}

.modal-body {
    padding: 24px;
    overflow-y: auto;
    flex: 1;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    font-size: 14px;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 8px;
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    background-color: var(--bg-secondary);
    color: var(--text-primary);
    font-size: 14px;
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
    line-height: 1.6;
}

.color-picker {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
}

.color-option {
    width: 40px;
    height: 40px;
    border-radius: var(--radius-md);
    cursor: pointer;
    border: 3px solid transparent;
    transition: var(--transition);
    position: relative;
}

.color-option:hover {
    transform: scale(1.1);
}

.color-option.active {
    border-color: var(--bg-primary);
    box-shadow: 0 0 0 2px var(--border-color);
}

.color-option.active::after {
    content: '✓';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-weight: bold;
    font-size: 18px;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.modal-footer {
    padding: 20px 24px 24px 24px;
    border-top: 1px solid var(--border-color);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
}

.modal-actions {
    display: flex;
    gap: 12px;
}

.btn {
    padding: 10px 20px;
    border: none;
    border-radius: var(--radius-md);
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition);
    display: flex;
    align-items: center;
    gap: 8px;
    white-space: nowrap;
}

.btn-primary {
    background-color: var(--primary-color);
    color: white;
}

.btn-primary:hover {
    background-color: var(--primary-hover);
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
}

.btn-secondary {
    background-color: var(--bg-secondary);
    color: var(--text-primary);
    border: 1px solid var(--border-color);
}

.btn-secondary:hover {
    background-color: var(--bg-tertiary);
}

.btn-danger {
    background-color: var(--danger-color);
    color: white;
}

.btn-danger:hover {
    background-color: var(--danger-hover);
}

.icon-btn {
    padding: 8px;
    background-color: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    color: var(--text-secondary);
    cursor: pointer;
    transition: var(--transition);
    display: flex;
    align-items: center;
    justify-content: center;
}

.icon-btn:hover {
    background-color: var(--bg-tertiary);
    color: var(--text-primary);
}

.toast-container {
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 2000;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.toast {
    background-color: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    padding: 16px 20px;
    box-shadow: var(--shadow-lg);
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 300px;
    animation: slideInRight 0.3s ease;
}

@keyframes slideInRight {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

.toast.success {
    border-left: 4px solid var(--success-color);
}

.toast.error {
    border-left: 4px solid var(--danger-color);
}

.toast.info {
    border-left: 4px solid var(--primary-color);
}

.toast-icon {
    flex-shrink: 0;
}

.toast-icon svg {
    width: 20px;
    height: 20px;
}

.toast.success .toast-icon svg {
    color: var(--success-color);
}

.toast.error .toast-icon svg {
    color: var(--danger-color);
}

.toast.info .toast-icon svg {
    color: var(--primary-color);
}

.toast-message {
    flex: 1;
    color: var(--text-primary);
    font-size: 14px;
    font-weight: 500;
}

.toast-close {
    padding: 4px;
    background: none;
    border: none;
    color: var(--text-tertiary);
    cursor: pointer;
    border-radius: var(--radius-sm);
    transition: var(--transition);
    display: flex;
    align-items: center;
    justify-content: center;
}

.toast-close:hover {
    color: var(--text-primary);
    background-color: var(--bg-secondary);
}

@media (max-width: 768px) {
    .sidebar {
        transform: translateX(-100%);
    }

    .sidebar.mobile-open {
        transform: translateX(0);
    }

    .mobile-close {
        display: flex;
    }

    .main-content {
        margin-left: 0;
    }

    .mobile-menu-toggle {
        display: flex;
    }

    .main-header {
        padding: 0 16px;
    }

    .content-title {
        font-size: 20px;
    }

    .notes-container {
        padding: 20px 16px;
    }

    .notes-container[data-view="grid"] {
        grid-template-columns: 1fr;
    }

    .modal-content {
        max-width: 100%;
        margin: 0;
        border-radius: var(--radius-lg) var(--radius-lg) 0 0;
        max-height: 95vh;
    }

    .modal {
        padding: 0;
        align-items: flex-end;
    }

    .toast-container {
        left: 16px;
        right: 16px;
        bottom: 16px;
    }

    .toast {
        min-width: auto;
    }

    .modal-footer {
        flex-direction: column-reverse;
    }

    .modal-actions {
        width: 100%;
    }

    .modal-actions .btn {
        flex: 1;
    }

    .btn-danger {
        width: 100%;
        justify-content: center;
    }
}

@media (max-width: 480px) {
    .view-controls {
        display: none;
    }

    .app-logo h1 {
        font-size: 20px;
    }

    .stats {
        grid-template-columns: 1fr;
    }
}
```

```javascript
const StorageModule = (() => {
    const STORAGE_KEY = 'notesApp_notes';
    const THEME_KEY = 'notesApp_theme';
    const VIEW_KEY = 'notesApp_view';
    
    const DEFAULT_COLORS = [
        '#6366f1',
        '#8b5cf6',
        '#ec4899',
        '#f43f5e',
        '#f59e0b',
        '#10b981',
        '#06b6d4',
        '#64748b'
    ];

    const loadNotes = () => {
        try {
            const data = localStorage.getItem(STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error loading notes:', error);
            return [];
        }
    };

    const saveNotes = (notes) => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
            return true;
        } catch (error) {
            console.error('Error saving notes:', error);
            return false;
        }
    };

    const loadTheme = () => {
        try {
            return localStorage.getItem(THEME_KEY) || 'light';
        } catch (error) {
            return 'light';
        }
    };

    const saveTheme = (theme) => {
        try {
            localStorage.setItem(THEME_KEY, theme);
            return true;
        } catch (error) {
            return false;
        }
    };

    const loadViewMode = () => {
        try {
            return localStorage.getItem(VIEW_KEY) || 'grid';
        } catch (error) {
            return 'grid';
        }
    };

    const saveViewMode = (view) => {
        try {
            localStorage.setItem(VIEW_KEY, view);
            return true;
        } catch (error) {
            return false;
        }
    };

    return {
        DEFAULT_COLORS,
        loadNotes,
        saveNotes,
        loadTheme,
        saveTheme,
        loadViewMode,
        saveViewMode
    };
})();
```

```javascript
const UIModule = (() => {
    const elements = {};
    let currentView = 'grid';
    let currentEditingNoteId = null;

    const initElements = () => {
        elements.notesContainer = document.getElementById('notesContainer');
        elements.emptyState = document.getElementById('emptyState');
        elements.noResultsState = document.getElementById('noResultsState');
        elements.contentTitle = document.getElementById('contentTitle');
        elements.totalNotesCount = document.getElementById('totalNotesCount');
        elements.lastUpdated = document.getElementById('lastUpdated');
        elements.modal = document.getElementById('noteModal');
        elements.modalTitle = document.getElementById('modalTitle');
        elements.modalOverlay = document.getElementById('modalOverlay');
        elements.modalClose = document.getElementById('modalClose');
        elements.noteTitle = document.getElementById('noteTitle');
        elements.noteContent = document.getElementById('noteContent');
        elements.noteColor = document.getElementById('noteColor');
        elements.saveNoteBtn = document.getElementById('saveNoteBtn');
        elements.deleteNoteBtn = document.getElementById('deleteNoteBtn');
        elements.viewBtns = document.querySelectorAll('.view-btn');
        elements.sidebar = document.getElementById('sidebar');
        elements.mobileMenuToggle = document.getElementById('mobileMenuToggle');
        elements.toastContainer = document.getElementById('toastContainer');
    };

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);
        
        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
        if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
        
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined 
        });
    };

    const truncateText = (text, maxLength = 150) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength).trim() + '...';
    };

    const countWords = (text) => {
        return text.trim().split(/\s+/).filter(word => word.length > 0).length;
    };

    const escapeHTML = (text) => {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    };

    const createNoteCardHTML = (note) => {
        const truncatedContent = truncateText(note.content, 150);
        const formattedDate = formatDate(note.updatedAt);
        
        return `
            <div class="note-card" data-note-id="${note.id}" style="--note-color: ${note.color}">
                <div class="note-card-header">
                    <h3 class="note-card-title">${escapeHTML(note.title)}</h3>
                    <div class="note-card-actions">
                        <button class="note-action-btn edit-note" data-note-id="${note.id}" aria-label="Edit note" title="Edit">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                        </button>
                        <button class="note-action-btn delete-note" data-note-id="${note.id}" aria-label="Delete note" title="Delete">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                <line x1="14" y1="11" x2="14" y2="17"></line>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="note-card-content">
                    <p>${escapeHTML(truncatedContent)}</p>
                </div>
                <div class="note-card-footer">
                    <span class="note-date">${formattedDate}</span>
                    <span class="note-word-count">${countWords(note.content)} words</span>
                </div>
            </div>
        `;
    };

    const renderNotes = (notes, messageTitle = 'All Notes') => {
        if (!elements.notesContainer) return;
        
        if (elements.contentTitle) {
            elements.contentTitle.textContent = messageTitle;
        }
        
        if (notes.length === 0) {
            elements.notesContainer.style.display = 'none';
            elements.emptyState.style.display = 'none';
            elements.noResultsState.style.display = 'flex';
            return;
        }
        
        elements.emptyState.style.display = 'none';
        elements.noResultsState.style.display = 'none';
        elements.notesContainer.style.display = 'grid';
        
        const notesHTML = notes.map(note => createNoteCardHTML(note)).join('');
        elements.notesContainer.innerHTML = notesHTML;
        
        requestAnimationFrame(() => {
            const cards = elements.notesContainer.querySelectorAll('.note-card');
            cards.forEach((card, index) => {
                card.style.animationDelay = `${index * 0.05}s`;
            });
        });
        
        attachNoteCardListeners();
    };

    const showEmptyState = () => {
        if (!elements.notesContainer) return;
        
        elements.notesContainer.style.display = 'none';
        elements.noResultsState.style.display = 'none';
        elements.emptyState.style.display = 'flex';
        
        if (elements.contentTitle) {
            elements.contentTitle.textContent = 'All Notes';
        }
    };

    const updateStats = (totalNotes, lastUpdatedDate) => {
        if (elements.totalNotesCount) {
            elements.totalNotesCount.textContent = totalNotes;
        }
        
        if (elements.lastUpdated) {
            elements.lastUpdated.textContent = lastUpdatedDate ? formatDate(lastUpdatedDate) : 'Never';
        }
        
        const allNotesCount = document.getElementById('allNotesCount');
        if (allNotesCount) {
            allNotesCount.textContent = totalNotes;
        }
    };

    const openModal = (note = null) => {
        if (!elements.modal) return;
        
        currentEditingNoteId = note ? note.id : null;
        
        elements.modalTitle.textContent = note ? 'Edit Note' : 'New Note';
        
        elements.noteTitle.value = note ? note.title : '';
        elements.noteContent.value = note ? note.content : '';
        elements.noteColor.value = note ? note.color : StorageModule.DEFAULT_COLORS[0];
        
        updateColorPickerPreview(elements.noteColor.value);
        
        if (elements.deleteNoteBtn) {
            elements.deleteNoteBtn.style.display = note ? 'flex' : 'none';
        }
        
        elements.modal.style.display = 'flex';
        
        requestAnimationFrame(() => {
            elements.modal.classList.add('modal-open');
            elements.noteTitle.focus();
        });
        
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        if (!elements.modal) return;
        
        elements.modal.classList.remove('modal-open');
        
        setTimeout(() => {
            elements.modal.style.display = 'none';
            currentEditingNoteId = null;
            
            elements.noteTitle.value = '';
            elements.noteContent.value = '';
            elements.noteColor.value = StorageModule.DEFAULT_COLORS[0];
            
            document.body.style.overflow = '';
        }, 200);
    };

    const getModalNoteData = () => {
        return {
            title: elements.noteTitle.value.trim(),
            content: elements.noteContent.value.trim(),
            color: elements.noteColor.value
        };
    };

    const getCurrentEditingNoteId = () => {
        return currentEditingNoteId;
    };

    const updateColorPickerPreview = (color) => {
        const colorOptions = document.querySelectorAll('.color-option');
        colorOptions.forEach(option => {
            if (option.dataset.color === color) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });
    };

    const setViewMode = (view) => {
        if (!['grid', 'list'].includes(view)) return;
        
        currentView = view;
        elements.notesContainer.dataset.view = view;
        
        elements.viewBtns.forEach(btn => {
            const btnView = btn.dataset.view;
            const isActive = btnView === view;
            
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', isActive);
        });
    };

    const getViewMode = () => {
        return currentView;
    };

    const toggleMobileSidebar = () => {
        const isOpen = elements.sidebar.classList.toggle('mobile-open');
        elements.mobileMenuToggle.setAttribute('aria-expanded', isOpen);
        
        if (window.innerWidth < 768) {
            document.body.style.overflow = isOpen ? 'hidden' : '';
        }
    };

    const closeMobileSidebar = () => {
        elements.sidebar.classList.remove('mobile-open');
        elements.mobileMenuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    };

    const attachNoteCardListeners = () => {
        const editBtns = elements.notesContainer.querySelectorAll('.edit-note');
        editBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const noteId = parseInt(btn.dataset.noteId);
                const event = new CustomEvent('editNote', { detail: { noteId } });
                document.dispatchEvent(event);
            });
        });
        
        const deleteBtns = elements.notesContainer.querySelectorAll('.delete-note');
        deleteBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const noteId = parseInt(btn.dataset.noteId);
                const event = new CustomEvent('deleteNote', { detail: { noteId } });
                document.dispatchEvent(event);
            });
        });
        
        const cards = elements.notesContainer.querySelectorAll('.note-card');
        cards.forEach(card => {
            card.addEventListener('click', () => {
                const noteId = parseInt(card.dataset.noteId);
                const event = new CustomEvent('editNote', { detail: { noteId } });
                document.dispatchEvent(event);
            });
        });
    };

    const showToast = (message, type = 'info') => {
        if (!elements.toastContainer) return;
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icons = {
            success: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',
            error: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>',
            info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'
        };
        
        toast.innerHTML = `
            <div class="toast-icon">${icons[type] || icons.info}</div>
            <div class="toast-message">${escapeHTML(message)}</div>
            <button class="toast-close" aria-label="Close">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        `;
        
        elements.toastContainer.appendChild(toast);
        
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => {
            removeToast(toast);
        });
        
        setTimeout(() => {
            removeToast(toast);
        }, 5000);
    };

    const removeToast = (toast) => {
        toast.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => {
            if (toast.parentElement) {
                toast.parentElement.removeChild(toast);
            }
        }, 300);
    };

    return {
        initElements,
        renderNotes,
        showEmptyState,
        updateStats,
        openModal,
        closeModal,
        getModalNoteData,
        getCurrentEditingNoteId,
        updateColorPickerPreview,
        setViewMode,
        getViewMode,
        toggleMobileSidebar,
        closeMobileSidebar,
        showToast
    };
})();
```

```javascript
const NotesApp = (() => {
    let notes = [];
    let currentSearchQuery = '';
    let currentTheme = 'light';

    const init = () => {
        UIModule.initElements();
        
        notes = StorageModule.loadNotes();
        currentTheme = StorageModule.loadTheme();
        const savedView = StorageModule.loadViewMode();
        
        applyTheme(currentTheme);
        UIModule.setViewMode(savedView);
        
        if (notes.length === 0) {
            UIModule.showEmptyState();
        } else {
            UIModule.renderNotes(notes);
        }
        
        updateStats();
        attachEventListeners();
    };

    const attachEventListeners = () => {
        const newNoteBtn = document.getElementById('newNoteBtn');
        const emptyStateBtn = document.getElementById('emptyStateBtn');
        const saveNoteBtn = document.getElementById('saveNoteBtn');
        const deleteNoteBtn = document.getElementById('deleteNoteBtn');
        const cancelNoteBtn = document.getElementById('cancelNoteBtn');
        const modalClose = document.getElementById('modalClose');
        const modalOverlay = document.getElementById('modalOverlay');
        const searchInput = document.getElementById('searchInput');
        const searchClear = document.getElementById('searchClear