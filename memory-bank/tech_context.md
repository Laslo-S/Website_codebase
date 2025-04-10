# Technology Stack & Context

This document outlines the specific technologies, versions, and setup details for the ArchViz Platform project.

## Backend

*   **Framework:** Django 5.x
*   **Language:** Python 3.x
*   **Database (Dev):** SQLite (default)
*   **Database (Prod):** PostgreSQL (planned)
*   **Environment Vars:** `django-environ`
*   **Core Libraries:**
    *   `django-crispy-forms` & `crispy-tailwind`: Form rendering with Tailwind CSS.
    *   `django-ckeditor-5`: Rich text editing for model fields.
    *   `Pillow`: Image processing (required by ImageField, CKEditor).
    *   `python-dotenv`: Loading environment variables from `.env`.
    *   `dj-database-url`: Parsing database URLs (useful for production).
    *   `psycopg2-binary` (or `psycopg`): PostgreSQL adapter (for production).
    *   `whitenoise`: Serving static files efficiently in production.

## Frontend

*   **Approach:** Server-Side Rendering (SSR) via Django Templates.
*   **Styling:** Tailwind CSS v3.x.
    *   Config: `tailwind.config.js`, `postcss.config.js`.
    *   Source Files: Organized under `static/css/` with `main.css` as the entry point, importing from `base/`, `components/`, `utils/` subdirectories. See @file:memory-bank/system_patterns.md.
    *   Variables: All CSS custom properties (layout, components, colors, fonts) centralized in `static/css/base/variables.css`.
    *   Build Output: `static/css/output.css` (generated via `npm run build:css`, gitignored).
*   **UI Components:** Primarily custom styled HTML.
*   **JavaScript:**
    *   Vanilla JS for basic interactions (e.g., mobile menu toggle).
    *   **Swiper.js (v11 via CDN):** Used for the homepage services gallery. Configured with `slidesPerView: 'auto'` and dynamic slide widths calculated by custom JS (`gallery-swiper-init.js`) based on viewport thresholds and CSS variables.
    *   **Lottie (via CDN):** Used for footer social icons and hero scroll indicator. Initialized via global script in `base.html`. Footer icon color adjusted via CSS `filter`.
    *   **Three.js (v0.160.0 via CDN module):** Used for interactive wireframe sphere background animation in the "Our Services" section (`services-background.js`). Animation physics and appearance configured via CSS variables.
*   **Build Process:** Tailwind CLI (`npx tailwindcss ... --watch`).

## AI Assistant Integration

*   **Memory Bank:** Persistent context stored in `memory-bank/`.
*   **Rules:** Development guided by rules in `.cursor/rules/`.
*   **MCP Tools:**
    *   GitHub MCP: Configured for repo interaction (requires `GITHUB_TOKEN`).
    *   Browser Tools MCP: Configured for browser interaction (requires AgentDesk extension/server).

## Development Environment

*   **Virtual Env:** Uses `.venv` managed by `pip`.
*   **Requirements:** `requirements.txt`.
*   **Package Manager (Python):** `pip` (using `requirements.txt`).
*   **Package Manager (JS):** `npm` (for Tailwind CLI and dependencies).
*   **Version Control:** Git.
*   **Environment Variables:** Managed via `.env` file (using `python-dotenv`).

## Deployment (Planned)
*   **Platform:** TBD (e.g., Heroku, Render, Docker setup)
*   **Web Server:** TBD (e.g., Gunicorn)
*   **Static Files:** Served by Whitenoise or dedicated service (e.g., S3)
*   **Database:** Managed PostgreSQL service.

## Key Libraries

*   `psycopg[binary, pool]`: PostgreSQL adapter.
*   `@tailwindcss/aspect-ratio`: Used for embeds.
*   `@tailwindcss/typography`: Used for blog content styling.
*   `node_modules`: Frontend build dependencies.
*   `npm`: Node.js package manager.
*   `postcss-cli`: PostCSS command line interface.
*   `venv`: Python virtual environment. 