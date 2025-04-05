# Architectural Visualization Platform

Website project showcasing architectural visualizations (3D embeds, videos, images) using Django and Tailwind CSS. Developed collaboratively with AI assistance via Cursor.

## Project Goal

To build an efficient and maintainable web platform for displaying various architectural visualization project types, including 3D scans, video renderings, and still images. The site includes user authentication for potential future client-specific features and utilizes a Django backend with Tailwind CSS for styling.

## Current Features (As of Phase 6 Completion)

*   **Homepage:** Basic landing page introducing the platform.
*   **Visualization Showcase:** Separate pages listing projects by type (`/scans/`, `/videos/`, `/images/`).
*   **Core Navigation:** Header and footer with links to main sections (Showcase pages, About, Contact).
*   **User Authentication:**
    *   Login/Logout functionality using Django's auth system.
    *   User registration (via Django Admin initially).
    *   Custom login view redirecting users to their specific page upon login.
*   **User-Specific Pages:**
    *   Basic user profile page (`/accounts/profile/`).
    *   Dynamically generated user pages (`/user/<username>/`) with basic access control (owner or staff).
*   **Admin Interface:**
    *   Standard Django admin for managing users and `VisualizationProject` models.
    *   Customized admin header.
*   **Styling:** Basic layout and styling implemented using Tailwind CSS.

## Technology Stack

*   **Backend:** Python / Django
*   **Frontend:** Django Templates / Tailwind CSS
*   **Database:** SQLite (Development)
*   **Build Tools:** Node.js / npm (for Tailwind CSS compilation)
*   **AI Development:** Cursor IDE
*   **Version Control:** Git

## Project Structure

The project follows a standard Django structure with specific customizations:

```
.
├── .cursor/           # Cursor AI configuration (rules, MCP servers)
├── apps/              # Core Django application modules
│   ├── accounts/      # User authentication, profiles, user-specific pages
│   └── core/          # Main site functionality, project display
├── config/            # Django project configuration (settings, root URLs)
├── media/             # User-uploaded media files (e.g., project images)
├── memory-bank/       # AI assistant persistent memory files (Markdown)
├── static/            # Static assets (CSS, JS, images)
│   ├── css/           # Compiled Tailwind CSS (output.css)
│   ├── images/
│   └── js/
├── templates/         # Django HTML templates
│   ├── accounts/      # Templates for the accounts app
│   ├── admin/         # Admin interface overrides
│   ├── core/          # Templates for the core app
│   ├── partials/      # Reusable template snippets (_header, _footer, etc.)
│   ├── registration/  # Auth-related templates (login, logout)
│   └── base.html      # Base template for site structure
├── .env               # Local environment variables (SECRET_KEY, DB, etc. - DO NOT COMMIT)
├── .env.example       # Example environment file
├── .gitignore         # Git ignore configuration
├── db.sqlite3         # Development SQLite database
├── manage.py          # Django management script
├── package.json       # Node.js dependencies (for Tailwind)
├── postcss.config.js  # PostCSS configuration (for Tailwind)
├── README.md          # This file
├── requirements.txt   # Python dependencies
├── tailwind.config.js # Tailwind CSS configuration
└── TASKS.mdc          # Project task tracking
```

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd Website_CodeBase
    ```
2.  **Create and activate a virtual environment:**
    ```bash
    python -m venv .venv
    # Windows
    .venv\Scripts\activate
    # macOS/Linux
    # source .venv/bin/activate
    ```
3.  **Install Python dependencies:**
    ```bash
    pip install -r requirements.txt
    ```
4.  **Install Node.js dependencies:**
    ```bash
    npm install
    ```
5.  **Set up environment variables:**
    *   Copy `.env.example` to `.env`.
    *   Fill in required values (e.g., `SECRET_KEY`). For GitHub MCP write access, add a `GITHUB_TOKEN` (Personal Access Token with repo scope).
6.  **Run initial database migrations:**
    ```bash
    python manage.py migrate
    ```
7.  **Create a superuser (optional but recommended for admin access):**
    ```bash
    python manage.py createsuperuser
    ```

## Running Locally

To run the development server, you need **three separate terminals**:

1.  **Terminal 1: Django Development Server**
    ```bash
    python manage.py runserver
    ```
    (Access the site at http://127.0.0.1:8000/)

2.  **Terminal 2: Tailwind CSS Watcher**
    ```bash
    npm run watch:css
    ```
    (Automatically recompiles Tailwind CSS on changes)

3.  **Terminal 3: AgentDesk Browser Tools Server (Required for AI Browser Tools)**
    ```bash
    npx @agentdeskai/browser-tools-server@latest
    ```
    (Allows the AI assistant to interact with your browser via MCP)

## Conventions

*   **Version Control:** Commits follow the [Conventional Commits](https://www.conventionalcommits.org/) standard.
*   **Python:** Code generally adheres to PEP 8 style guidelines.
*   **Django:**
    *   Class-Based Views (CBVs) are preferred over function-based views where appropriate.
    *   URL patterns are named and referenced using `{% url %}` in templates and `reverse()`/`reverse_lazy()` in views.
*   **Frontend:**
    *   Mobile-first design principles are applied.
    *   Styling is primarily handled by Tailwind CSS utility classes.
    *   Reusable template sections (header, footer, cards) are extracted into the `templates/partials/` directory.