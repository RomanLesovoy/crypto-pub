/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}', // Более широкий паттерн
  ],
  theme: {
    extend: {
      colors: {
        // Основные цвета темы
        background: {
          DEFAULT: '#121212', // Почти черный
          lighter: '#1E1E1E', // Немного светлее для карточек/элементов
          dark: '#0A0A0A',    // Еще темнее для некоторых элементов
        },
        primary: {
          DEFAULT: '#10B981', // Основной зеленый (emerald-500)
          light: '#34D399',   // Светло-зеленый (emerald-400) 
          dark: '#059669',    // Темно-зеленый (emerald-600)
          hover: '#047857',   // При наведении (emerald-700)
        },
        text: {
          primary: '#F3F4F6',    // Почти белый для основного текста
          secondary: '#9CA3AF',  // Серый для второстепенного текста
          muted: '#6B7280',      // Приглушенный цвет текста
        },
        accent: {
          DEFAULT: '#10B981', // Тот же зеленый для акцентов
          secondary: '#60A5FA', // Синий для дополнительных акцентов
        },
        // Дополнительные вспомогательные цвета
        success: '#10B981', // Зеленый
        warning: '#F59E0B', // Оранжевый/Янтарный
        danger: '#EF4444',  // Красный
        info: '#3B82F6',    // Синий
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'sm': '0.25rem',
        DEFAULT: '0.375rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
      },
      boxShadow: {
        'subtle': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'DEFAULT': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'glow': '0 0 15px rgba(16, 185, 129, 0.5)',
      },
    },
  },
  plugins: [],
}

