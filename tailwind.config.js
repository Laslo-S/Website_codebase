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
    extend: {},
  },
  plugins: [],
} 