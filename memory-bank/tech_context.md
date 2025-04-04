# Technology Context

*   **Backend Framework:** Django (Version: Check `requirements.txt`)
*   **Language:** Python (Version: User's environment)
*   **Frontend Styling:** Tailwind CSS (Version: Check `package.json`)
    *   Build via `npm run build:css` or `npm run watch:css`.
    *   Config: `tailwind.config.js`, `postcss.config.js`
    *   Input: `static/css/input.css`
    *   Output: `static/css/output.css`
*   **Frontend Scripting:** Vanilla JavaScript (Minimal, e.g., mobile menu toggle).
*   **Database (Dev):** SQLite (`db.sqlite3`)
*   **Database (Prod):** PostgreSQL (Planned)
*   **Version Control:** Git
*   **Environment Variables:** `django-environ` loading from `.env` file (see `.env.example`).
*   **Python Dependencies:** See @file:requirements.txt
*   **Node Dependencies:** See @file:package.json 