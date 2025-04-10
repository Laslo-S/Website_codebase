/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable class-based dark mode
  content: [
    './templates/**/*.html', // Scan root templates directory
    './apps/**/*.html',    // Scan all HTML files within apps
    './apps/**/*.py',      // Scan Python files within apps
    // Add other file types or paths if needed, e.g., JS files
    './static/js/**/*.js',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border-hsl, 214.3 31.8% 91.4%))', // Added fallback
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background-hsl, 0 0% 100%))', // Added fallback
        foreground: 'hsl(var(--foreground-hsl, 222.2 84% 4.9%))', // Added fallback
        primary: {
          DEFAULT: 'hsl(var(--primary-hsl, 222.2 47.4% 11.2%))', // Added fallback
          foreground: 'hsl(var(--primary-foreground-hsl, 210 40% 98%))', // Added fallback
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary-hsl, 210 40% 96.1%))', // Added fallback
          foreground: 'hsl(var(--secondary-foreground-hsl, 222.2 47.4% 11.2%))', // Added fallback
        },
        muted: {
          DEFAULT: 'hsl(var(--muted-hsl, 210 40% 96.1%))', // Added fallback
          foreground: 'hsl(var(--muted-foreground-hsl, 215.4 16.3% 46.9%))', // Added fallback
        },
        accent: {
          DEFAULT: 'hsl(var(--accent-hsl, 210 40% 96.1%))', // Added fallback
          foreground: 'hsl(var(--accent-foreground-hsl, 222.2 47.4% 11.2%))', // Added fallback
        },
        popover: {
          DEFAULT: 'hsl(var(--background-hsl, 0 0% 100%))', // Use background
          foreground: 'hsl(var(--foreground-hsl, 222.2 84% 4.9%))', // Use foreground
        },
        card: {
          DEFAULT: 'hsl(var(--background-hsl, 0 0% 100%))', // Use background
          foreground: 'hsl(var(--foreground-hsl, 222.2 84% 4.9%))', // Use foreground
        },
        // Add custom v0 colors if needed, mapping to CSS vars
        cyan: { // Example assuming you want cyan colors from v0
          50: '#ecfeff', 
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
        },
        slate: { // Example adding slate colors
           50: '#f8fafc',
           100: '#f1f5f9',
           200: '#e2e8f0',
           300: '#cbd5e1',
           400: '#94a3b8',
           500: '#64748b',
           600: '#475569',
           700: '#334155',
           800: '#1e293b',
           900: '#0f172a',
        }
      },
      borderRadius: {
        lg: 'var(--radius, 0.5rem)', // Added fallback
        md: 'calc(var(--radius, 0.5rem) - 2px)',
        sm: 'calc(var(--radius, 0.5rem) - 4px)',
      },
      fontFamily: {
        sans: ['var(--font-body, Inter)', 'sans-serif'], // Added fallback
        heading: ['var(--font-heading, Inter)', 'sans-serif'], // Added fallback
      },
      // Add keyframes or other extensions if needed
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'), // Add aspect ratio plugin
    require('@tailwindcss/typography'), // Assuming needed for blog/prose
    // require('@tailwindcss/forms'), // Add if needed
  ],
} 