/**
 * Theme Manager Module
 * Handles dark/light mode toggle with localStorage persistence
 * Smooth transitions and system preference detection
 */

const ThemeManager = (() => {
    // Private state
    let currentTheme = 'light';
    const THEME_KEY = 'theme';
    const THEMES = {
        LIGHT: 'light',
        DARK: 'dark'
    };

    // DOM elements
    let themeToggle = null;
    let body = null;

    /**
     * Initialize theme manager
     */
    function init() {
        setupElements();
        loadTheme();
        setupEventListeners();
        console.log('✓ Theme Manager initialized with theme:', currentTheme);
    }

    /**
     * Setup DOM element references
     */
    function setupElements() {
        themeToggle = document.getElementById('themeToggle');
        body = document.body;

        if (!themeToggle) {
            console.warn('Theme toggle button not found');
        }
        if (!body) {
            console.error('Body element not found');
        }
    }

    /**
     * Load theme from storage or detect system preference
     */
    function loadTheme() {
        try {
            // Try to load from localStorage
            const savedTheme = localStorage.getItem(THEME_KEY);

            if (savedTheme && (savedTheme === THEMES.LIGHT || savedTheme === THEMES.DARK)) {
                currentTheme = savedTheme;
            } else {
                // Detect system preference
                currentTheme = detectSystemTheme();
            }

            applyTheme(currentTheme, false); // Apply without animation on load
        } catch (error) {
            console.error('Error loading theme:', error);
            currentTheme = THEMES.LIGHT;
            applyTheme(currentTheme, false);
        }
    }

    /**
     * Detect system theme preference
     */
    function detectSystemTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return THEMES.DARK;
        }
        return THEMES.LIGHT;
    }

    /**
     * Setup event listeners
     */
    function setupEventListeners() {
        if (themeToggle) {
            themeToggle.addEventListener('click', toggleTheme);
        }

        // Listen for system theme changes
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                // Only auto-switch if user hasn't manually set a preference
                const hasManualPreference = localStorage.getItem(THEME_KEY);
                if (!hasManualPreference) {
                    const newTheme = e.matches ? THEMES.DARK : THEMES.LIGHT;
                    setTheme(newTheme);
                    console.log('System theme changed to:', newTheme);
                }
            });
        }

        // Keyboard shortcut: Ctrl/Cmd + Shift + L
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'L') {
                e.preventDefault();
                toggleTheme();
            }
        });
    }

    /**
     * Toggle between light and dark theme
     */
    function toggleTheme() {
        const newTheme = currentTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
        setTheme(newTheme);
    }

    /**
     * Set specific theme
     */
    function setTheme(theme, animate = true) {
        if (theme !== THEMES.LIGHT && theme !== THEMES.DARK) {
            console.warn('Invalid theme:', theme);
            return;
        }

        currentTheme = theme;
        applyTheme(theme, animate);
        saveTheme(theme);

        console.log('Theme changed to:', theme);
    }

    /**
     * Apply theme to DOM
     */
    function applyTheme(theme, animate = true) {
        if (!body) return;

        // Add transition class for smooth animation
        if (animate) {
            body.classList.add('theme-transition');
        }

        // Set data-theme attribute
        body.setAttribute('data-theme', theme);

        // Update toggle button state
        updateToggleButton(theme);

        // Update meta theme-color for mobile browsers
        updateMetaThemeColor(theme);

        // Remove transition class after animation
        if (animate) {
            setTimeout(() => {
                body.classList.remove('theme-transition');
            }, 300);
        }
    }

    /**
     * Update theme toggle button appearance
     */
    function updateToggleButton(theme) {
        if (!themeToggle) return;

        const sunIcon = themeToggle.querySelector('.sun-icon');
        const moonIcon = themeToggle.querySelector('.moon-icon');

        if (theme === THEMES.DARK) {
            themeToggle.classList.add('dark-mode');
            themeToggle.setAttribute('aria-label', 'Switch to light mode');
            themeToggle.setAttribute('title', 'Light mode');
            if (sunIcon) sunIcon.style.display = 'none';
            if (moonIcon) moonIcon.style.display = 'block';
        } else {
            themeToggle.classList.remove('dark-mode');
            themeToggle.setAttribute('aria-label', 'Switch to dark mode');
            themeToggle.setAttribute('title', 'Dark mode');
            if (sunIcon) sunIcon.style.display = 'block';
            if (moonIcon) moonIcon.style.display = 'none';
        }
    }

    /**
     * Update meta theme-color for mobile browsers
     */
    function updateMetaThemeColor(theme) {
        let metaThemeColor = document.querySelector('meta[name="theme-color"]');

        if (!metaThemeColor) {
            metaThemeColor = document.createElement('meta');
            metaThemeColor.name = 'theme-color';
            document.head.appendChild(metaThemeColor);
        }

        // Set color based on theme
        const color = theme === THEMES.DARK ? '#1a1a1a' : '#ffffff';
        metaThemeColor.content = color;
    }

    /**
     * Save theme to localStorage
     */
    function saveTheme(theme) {
        try {
            localStorage.setItem(THEME_KEY, theme);
        } catch (error) {
            console.error('Error saving theme:', error);
        }
    }

    /**
     * Get current theme
     */
    function getCurrentTheme() {
        return currentTheme;
    }

    /**
     * Check if dark mode is active
     */
    function isDarkMode() {
        return currentTheme === THEMES.DARK;
    }

    /**
     * Get theme colors for current theme
     */
    function getThemeColors() {
        const root = document.documentElement;
        const computedStyle = getComputedStyle(root);

        return {
            primary: computedStyle.getPropertyValue('--color-primary').trim(),
            background: computedStyle.getPropertyValue('--color-background').trim(),
            surface: computedStyle.getPropertyValue('--color-surface').trim(),
            text: computedStyle.getPropertyValue('--color-text').trim(),
            textSecondary: computedStyle.getPropertyValue('--color-text-secondary').trim(),
            border: computedStyle.getPropertyValue('--color-border').trim()
        };
    }

    /**
     * Reset theme to default (light)
     */
    function reset() {
        try {
            localStorage.removeItem(THEME_KEY);
            setTheme(THEMES.LIGHT);
        } catch (error) {
            console.error('Error resetting theme:', error);
        }
    }

    /**
     * Export theme settings
     */
    function exportSettings() {
        return {
            theme: currentTheme,
            timestamp: new Date().toISOString()
        };
    }

    /**
     * Import theme settings
     */
    function importSettings(settings) {
        if (settings && settings.theme) {
            setTheme(settings.theme);
            return true;
        }
        return false;
    }

    // Public API
    return {
        init,
        toggleTheme,
        setTheme,
        getCurrentTheme,
        isDarkMode,
        getThemeColors,
        reset,
        exportSettings,
        importSettings,
        THEMES
    };
})();

// Make available globally
window.ThemeManager = ThemeManager;