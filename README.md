# Architectural Visualization Platform

Website project showcasing architectural visualizations (3D embeds, videos, images) using Django and Tailwind CSS. Developed collaboratively with AI assistance via Cursor.

## Project Goal

To build an efficient and maintainable web platform for displaying various architectural visualization project types, including 3D scans, video renderings, and still images. The site includes user authentication for potential future client-specific features and utilizes a Django backend with Tailwind CSS for styling.

## Current Features

*   **Public Portfolio:**
    *   Separate admin sections for managing public items by type (`AA Public 3D Scans`, `AB Public Videos`, `AC Public Stills`) using Proxy Models.
    *   Public-facing list pages (`/scans/`, `/videos/`, `/images/`) display these items.
*   **Client Deliverables:**
    *   Dedicated admin section (`Client Deliverables`) for managing private client content, filterable by client (from 'Active Clients' group).
    *   User-specific pages (`/accounts/user/<username>/`) display assigned deliverables (access restricted).
*   **News/Blog:**
    *   Admin section for `News Posts`.
    *   List/detail views and API endpoint remain the same.
*   **User Authentication & Management:**
    *   Standard login/logout/profile.
    *   Admin section for managing `Users` and `Groups` (including the 'Active Clients' group).
*   **Admin Interface:**
    *   Restructured sidebar with clearer sections: `Authentication and Authorization`, `Public Portfolio & Site Core`, `Client Accounts & Auth`, `News`.
    *   Custom filters and proxy models provide content-centric workflows.
*   **Styling:** Tailwind CSS.

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
│   ├── core/          # Main site functionality, project display
│   └── news/          # Blog/News posts functionality
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

## Features

*   **Visualization Display:** Separate pages for 3D Scans, Video Visualizations, and Still Images, showcasing projects managed via the Django Admin.
*   **User Accounts:** Basic user login/logout and profile pages.
*   **User-Specific Pages:** Dynamically generated pages for logged-in users (e.g., `/accounts/user/<username>/`), potentially showing user-specific content.
*   **News/Blog:** A simple blog section (`/news/`) for posts managed via the Django Admin, featuring rich text editing and featured images. Latest posts are displayed on the homepage.
*   **Django Admin:** Customized admin interface for managing users, visualization projects (including owner assignment via inlines), and news posts.

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

## Admin Workflow

*   **Adding Public Items:** Go to the specific type under "Public Portfolio & Site Core" (e.g., "AA Public 3D Scans") and click "Add".
*   **Managing Client Deliverables:** Go to "Public Portfolio & Site Core" -> "Client Deliverables". Use the "Client" filter on the right to select a user (only users in the 'Active Clients' group are shown). Then Add/Edit deliverables for that client. The `Client` field on the Add/Edit form must still be manually selected.
*   **Managing Users/Groups:** Use the "Client Accounts & Auth" section.
*   **Designating Clients:** Add users to the 'Active Clients' group under "Client Accounts & Auth" -> "Groups".

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

## Potential Future Enhancements

*   **Client-Specific Features:** Implement client-specific features such as client-specific dashboards or client-specific project management tools.
*   **Advanced Search Capabilities:** Add advanced search capabilities to help users find specific projects or information quickly.
*   **AI Integration:** Integrate AI assistants for more personalized and efficient project management and visualization.