# Technology Stack & Context

This document outlines the specific technologies, versions, and setup details for the ArchViz Platform project.

## Backend

*   **Framework:** Django (Version 5.2)
*   **Language:** Python (Version ~3.12)
*   **Database:**
    *   Development: SQLite (via `db.sqlite3` file)
    *   Production: PostgreSQL (intended, configured via `DATABASE_URL`)
*   **Environment Variables:** Managed via `django-environ`, loaded from `.env` file.
*   **Key Libraries:**
    *   `psycopg[binary, pool]`: PostgreSQL adapter.
    *   `Pillow`: Image processing (used for ImageFields).
    *   `django-ckeditor-5`: Rich Text Editor integration for admin fields (e.g., `NewsPost.content`).

## Frontend

*   **Approach:** Server-Side Rendering (SSR) via Django Templates.
*   **Styling:** Tailwind CSS (v3.x likely, check `package.json`).
    *   Build Process: Uses Node.js, `npm`, `postcss-cli`, `tailwindcss`, `autoprefixer`. Compiled via `npm run build:css` script.
    *   Configuration: `tailwind.config.js`, `postcss.config.js`, `static/css/input.css` -> `static/css/output.css`.
    *   Plugins: `@tailwindcss/aspect-ratio` (used for embeds), `@tailwindcss/typography` (used for blog content styling).
*   **JavaScript:** Vanilla JavaScript for minimal interactions (e.g., mobile menu toggle).

## AI Assistant Integration

*   **Memory Bank:** Persistent context stored in `memory-bank/`.
*   **Rules:** Development guided by rules in `.cursor/rules/`.
*   **MCP Tools:**
    *   GitHub MCP: Configured for repo interaction (requires `GITHUB_TOKEN`).
    *   Browser Tools MCP: Configured for browser interaction (requires AgentDesk extension/server).

## Development Environment

*   **Virtual Env:** Python dependencies managed via `.venv` created with `venv`.
*   **Node Env:** Frontend build dependencies managed via `node_modules` installed with `npm`. 