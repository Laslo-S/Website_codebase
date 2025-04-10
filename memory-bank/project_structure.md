# Project Structure Overview

This document provides a detailed overview of the main directories and their purpose in the ArchViz Platform project, based on exploration up to Phase 20.

```plaintext
.
├── .cursor/           # Cursor IDE AI configuration and rules
│   └── rules/         # AI Assistant rules by category (core, backend, frontend, api, apps, tools)
├── apps/              # Django application modules (contains core business logic)
│   ├── accounts/      # Handles User authentication, profiles, user-specific pages, JWT API auth, and admin config for users & client deliverables
│   │   ├── migrations/    # Database migrations for accounts app (if any models defined here)
│   │   ├── templates/     # Templates specific to the accounts app
│   │   │   ├── accounts/    # Main templates (profile.html, user_page.html)
│   │   │   └── partials/    # Reusable snippets for accounts (_deliverable_card.html)
│   │   ├── admin.py       # Registers ClientDeliverable proxy, defines CustomUserAdmin
│   │   ├── api_urls.py    # Defines API URLs for JWT token obtain/refresh
│   │   ├── apps.py        # App configuration (sets verbose_name for admin)
│   │   ├── models.py      # Defines proxy model for ClientDeliverable admin placement
│   │   ├── urls.py        # Defines web URLs for login, logout, profile, user pages
│   │   └── views.py       # Contains views like CustomLoginView, UserProfileView, UserPageView (with dynamic template loading)
│   ├── core/          # Core site functionality: public views, main data models, preview mode logic
│   │   ├── migrations/    # Database migrations for core models (PublicPortfolioItem, ClientDeliverable)
│   │   ├── templates/     # Templates specific to the core app
│   │   │   ├── core/        # Main templates (home.html, about.html, contact.html, project lists/detail)
│   │   │   └── partials/    # Reusable snippets for core (_project_card.html)
│   │   ├── admin.py       # Defines admin logic for PublicPortfolioItem (via proxies) and ClientDeliverable (logic only, not registered here)
│   │   ├── apps.py        # App configuration (sets verbose_name for admin)
│   │   ├── context_processors.py # Adds preview_context to templates
│   │   ├── middleware.py  # Defines PreviewModeMiddleware
│   │   ├── models.py      # Defines PublicPortfolioItem, ClientDeliverable, and related Proxy Models/Managers
│   │   ├── urls.py        # Defines web URLs for home, about, contact, project lists/detail, admin preview toggle
│   │   └── views.py       # Contains views like HomePageView, static pages, project list/detail views (BaseProjectListView, ScanListView, etc.)
│   ├── news/          # Handles news/blog posts, including web views, admin, and API endpoint
│   │   ├── migrations/    # Database migrations for NewsPost model
│   │   ├── templates/     # Templates specific to the news app
│   │   │   ├── news/        # Main templates (news_list.html, news_detail.html)
│   │   │   └── partials/    # Reusable snippets for news (_news_card.html, _news_card_home.html)
│   │   ├── admin.py       # Defines NewsPostAdmin with CKEditor integration
│   │   ├── api_urls.py    # Defines API URL for news post creation
│   │   ├── apps.py        # App configuration
│   │   ├── models.py      # Defines NewsPost model with CKEditor field
│   │   ├── permissions.py # Defines IsNewsAgent custom DRF permission
│   │   ├── serializers.py # Defines NewsPostCreateSerializer for the API
│   │   ├── urls.py        # Defines web URLs for news list/detail and API creation endpoint
│   │   └── views.py       # Contains NewsListView, NewsDetailView, NewsPostCreateAPIView
│   └── slideshow/     # Manages images and order for the homepage slideshow/gallery
│       ├── migrations/    # Database migrations for SlideshowImage model
│       ├── admin.py       # Defines SlideshowImageAdmin with thumbnail preview
│       ├── apps.py        # App configuration (sets verbose_name for admin)
│       └── models.py      # Defines SlideshowImage model (used by core.views.HomePageView)
├── config/            # Django project-level configuration and entry points
│   ├── __init__.py    # Makes config a Python package
│   ├── asgi.py        # ASGI entry point for deployment
│   ├── settings.py    # Main Django settings (INSTALLED_APPS, MIDDLEWARE, DATABASES, STATIC_URL, MEDIA_ROOT, TEMPLATES, AUTH_*, REST_FRAMEWORK, SIMPLE_JWT, CKEDITOR_5_CONFIGS, etc.)
│   ├── urls.py        # Root URL configuration (includes admin, app URLs, API URLs, dev static/media serving)
│   └── wsgi.py        # WSGI entry point for deployment
├── docs/              # Archived project documentation (e.g., old tasks)
├── memory-bank/       # AI assistant persistent context files (project_brief.md, active_context.md, progress.md, system_patterns.md, tech_context.md, project_structure.mdc)
├── media/             # User-uploaded media files (e.g., news images, portfolio images) (Git ignored)
├── node_modules/      # Installed Node.js frontend dependencies (Tailwind, PostCSS, etc.) (Git ignored)
├── static/            # Project-wide static assets (served directly in development)
│   ├── css/           # CSS related files (organized into base/, components/, utils/)
│   ├── js/            # Custom JavaScript files (interactive-hero-background.js, services-background.js, css_gallery_init.js)
│   ├── images/        # Static site images (.keep placeholder)
│   ├── lottie/        # Lottie animation JSON files (footer icons, scroll indicator)
│   └── svg/           # SVG asset files
│       ├── general/       # General purpose SVGs (Logo_Avem3D.svg, potentially arrows etc.)
│       ├── footer/        # SVGs used in the footer (facebook.svg, instagram.svg, etc.)
│       └── services/      # SVGs specific to service cards (3d.svg, video.svg, image.svg)
├── templates/         # Django HTML templates (base, partials, app-specific)
│   ├── accounts/      # Accounts app specific templates dir (contains accounts/, partials/)
│   ├── admin/         # Admin interface overrides (base_site.html for adding preview toggle)
│   ├── core/          # Core app specific templates dir (contains core/, partials/)
│   ├── news/          # News app specific templates dir (contains news/, partials/)
│   ├── partials/      # Global reusable template snippets (_header.html, _footer.html, _pagination.html, _service_card.html, etc.)
│   ├── registration/  # Standard Django auth templates (login.html, logged_out.html)
│   └── base.html      # Main site base template (HTML structure, loads output.css, core JS, defines blocks)
├── .venv/             # Python virtual environment directory (Git ignored)
├── .env               # Local environment variables (secrets, keys, passwords) (Git ignored)
├── .env.example       # Example environment variables file structure (safe to commit)
├── .gitignore         # Specifies files/directories for Git to ignore
├── db.sqlite3         # Development SQLite database file (Git ignored)
├── manage.py          # Django command-line utility interface (runserver, migrate, etc.)
├── package.json       # Node.js project manifest (defines scripts like build:css, devDependencies like tailwindcss)
├── package-lock.json  # Records exact versions of Node.js dependencies installed
├── postcss.config.js  # PostCSS configuration (loads tailwindcss, autoprefixer plugins)
├── README.md          # Project overview, features, technology stack, setup, and usage guide
├── requirements.txt   # Python package dependencies list (for pip install)
├── tailwind.config.js # Tailwind CSS configuration (content paths, theme extensions, plugins like aspect-ratio/typography)
└── TASKS.mdc          # AI-driven project task tracking file (Markdown Checklist format)
``` 