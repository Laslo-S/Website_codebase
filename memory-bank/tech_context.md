# Technology Stack & Context

This document outlines the specific technologies, versions, and setup details for the ArchViz Platform project.

## Backend

*   **Framework:** Django 5.2
*   **Language:** Python 3.12
*   **Database (Dev):** SQLite (via `DATABASE_URL` in `.env`)
*   **Database (Prod):** PostgreSQL (Planned, via `DATABASE_URL`)
*   **Environment Vars:** `django-environ`
*   **Core Libraries:**
    *   `django-ckeditor-5`: Rich text editing.
    *   `djangorestframework` (DRF): For building REST APIs.
    *   `djangorestframework-simplejwt`: For JWT authentication (used for API agent).
    *   `Pillow`: Image processing (dependency for ImageField).

## Frontend

*   **Approach:** Server-Side Rendering (SSR) via Django Templates.
*   **Styling:** Tailwind CSS v3 (via PostCSS/npm build process).
    *   Config: `tailwind.config.js`, `postcss.config.js`
    *   Input: `static/css/input.css`
    *   Output: `static/css/output.css`
*   **JavaScript:** Vanilla JavaScript for minimal interactions (e.g., mobile menu toggle).

## AI Assistant Integration

*   **Memory Bank:** Persistent context stored in `memory-bank/`.
*   **Rules:** Development guided by rules in `.cursor/rules/`.
*   **MCP Tools:**
    *   GitHub MCP: Configured for repo interaction (requires `GITHUB_TOKEN`).
    *   Browser Tools MCP: Configured for browser interaction (requires AgentDesk extension/server).

## Development Environment

*   **Virtual Env:** Uses `.venv` managed by `pip`.
*   **Requirements:** `requirements.txt`.

## Deployment (Planned)
*   TBD (Likely standard Django deployment with Gunicorn/Nginx or similar).

## Key Libraries

*   `psycopg[binary, pool]`: PostgreSQL adapter.
*   `@tailwindcss/aspect-ratio`: Used for embeds.
*   `@tailwindcss/typography`: Used for blog content styling.
*   `node_modules`: Frontend build dependencies.
*   `npm`: Node.js package manager.
*   `postcss-cli`: PostCSS command line interface.
*   `venv`: Python virtual environment. 