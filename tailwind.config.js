/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './templates/**/*.html', // Scan root templates directory
    './apps/**/*.html',    // Scan all HTML files within apps
    './apps/**/*.py',      // Scan Python files within apps
    // Add other file types or paths if needed, e.g., JS files
    // './static/js/**/*.js' 
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
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
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      // Add font family if specified in globals/design
      // fontFamily: {
      //   heading: ['YourHeadingFont', 'sans-serif'],
      //   sans: ['YourBodyFont', 'sans-serif'],
      // },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'), // Add aspect ratio plugin
  ],
} 