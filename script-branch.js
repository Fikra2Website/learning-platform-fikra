
    tailwind.config = {
        darkMode: 'class',
        theme: {
            extend: {
                screens: { xs: '420px' },
                height: { dvh: '100dvh', app: 'var(--app-height, 100dvh)' },
                minHeight: { dvh: '100dvh', app: 'var(--app-height, 100dvh)' },
                colors: { customBg: 'var(--bg-color)', customCard: 'var(--card-color)', customPrimary: 'var(--primary-color)', customSidebar: 'var(--sidebar-color)', customText: 'var(--text-color)' },
                fontFamily: { sans: ['Cairo', 'Inter', 'sans-serif'] }
            }
        }
    }
    