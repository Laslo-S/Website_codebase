# System Architectural Patterns & Conventions

This document records key architectural decisions and established conventions for the ArchViz Platform project.

## Core Architecture

*   **Framework:** Django (Python)
*   **Approach:** Modular Monolith - Functionality is separated into distinct Django Apps within the `apps/` directory (e.g., `core`, `accounts`, `news`, `slideshow`).
*   **Rendering:** Server-Side Rendering (SSR) using Django Templates.
*   **Database:** SQLite for development, planned PostgreSQL for production (via environment variable `DATABASE_URL`).

## Directory Structure Conventions

*   **Project Config:** Django project settings (`settings.py`), root URL configuration (`urls.py`), and WSGI/ASGI files reside in the `config/` directory.
*   **Applications:** Reusable Django applications are placed within the `apps/` directory (e.g., `core`, `accounts`, `news`, `slideshow`).
*   **Templates:**
    *   Base template (`base.html`) is at the root of the `templates/` directory.
    *   App-specific templates are organized within `templates/<app_name>/` (e.g., `templates/core/`, `templates/news/`).
    *   Reusable partial templates (e.g., header, footer, cards) are placed in `templates/partials/`.
        *   Includes: `_header.html`, `_footer.html`, `_pagination.html`, `_service_card.html`, `_client_portal_card.html`, `_news_card.html`, `_hero_showcase.html`.
    *   Standard Django auth templates reside in `templates/registration/`.
    *   Admin overrides are in `templates/admin/`.
    *   User-specific dynamic templates are in `templates/accounts/user_templates/`.
*   **Static Files:**
    *   Project-wide static files (compiled CSS, JS, images) are in the `static/` directory.
        *   JS Includes: `static/js/interactive-hero-background.js`.
    *   Tailwind input CSS is at `static/css/input.css`, output at `static/css/output.css`.
*   **Media Files:** User-uploaded content (e.g., project images) is stored in the `media/` directory (managed by `MEDIA_ROOT` and `MEDIA_URL` settings).
*   **AI Context:** Persistent AI memory files are stored in `memory-bank/`. AI guidance rules are in `.cursor/rules/`.

## Backend Conventions (Django)

*   **Naming:** Follow PEP 8 guidelines for variables, functions, classes.
*   **Views:** Class-Based Views (CBVs) are generally preferred over Function-Based Views (FBVs) for better structure and reusability, especially for standard CRUD or list/detail patterns.
*   **URLs:**
    *   Always use named URL patterns within `urls.py` files (e.g., `path(..., name='my_view')`).
    *   Use namespaces for apps (e.g., `app_name = 'core'`).
    *   Reference URLs using `reverse()` or `reverse_lazy()` in Python code and `{% url 'namespace:name' %}` in templates.
*   **Models:** Use `PublicPortfolioItem` (base), `ClientDeliverable` (defined in `apps.core`), `SlideshowImage` (defined in `apps.slideshow`) for homepage gallery.
*   **Proxy Models:**
    *   Use `PublicScanItem`, etc. (in `apps.core`) inheriting from `PublicPortfolioItem` for type-specific public admin views.
    *   Use `ClientDeliverableAdminView` (in `apps.accounts`) inheriting from `ClientDeliverable` (from `apps.core`) solely to place the admin interface under the "Client Management & Auth" section.
*   **Managers:** Attach custom managers to Public Portfolio Proxy Models.
*   **Admin:**
    *   Register Public Proxy Models (`PublicScanItem`, etc.) in `apps.core.admin`.
    *   Define `ClientDeliverableAdmin` logic in `apps.core.admin` but **do not register it there**.
    *   Register the `ClientDeliverableAdminView` proxy model (from `apps.accounts`) using the `ClientDeliverableAdmin` logic (from `apps.core`) within `apps.accounts.admin`.
    *   Register `SlideshowImage` model with `SlideshowImageAdmin` in `apps.slideshow.admin` to create a dedicated admin section.
    *   Use custom `SimpleListFilter` (`ClientFilter`) on `ClientDeliverableAdmin` logic.
    *   Use `AppConfig.verbose_name` to customize sidebar app labels (e.g., "Public Portfolio & Site Core", "Client Management & Auth").
    *   Hide fields on add forms using `get_fieldsets` override in proxy admins.
*   **Client Designation:** Via 'Active Clients' Group membership.

## Frontend Conventions

*   **Approach:** Mobile-First Design.
*   **Styling:** Primarily use Tailwind CSS utility classes. Custom CSS in `style.css` should be minimal.
*   **Structure:** Use semantic HTML5 elements (`header`, `nav`, `main`, `footer`, `section`, `article`).
*   **Partials:** Extract reusable HTML components (header, footer, cards, forms, pagination) into `templates/partials/` and use `{% include %}`.
*   **Accessibility:** Provide `alt` text for images, `title` attributes for iframes. Ensure sufficient color contrast (e.g., CKEditor admin fix).

## Version Control

*   **Commits:** Follow the [Conventional Commits](https://www.conventionalcommits.org/) standard (e.g., `feat:`, `fix:`, `refactor:`, `docs:`, `style:`, `test:`).

*   **Architecture:** Modular Monolith approach using Django Apps (e.g., `apps/core`, `apps/accounts`).
*   **Rendering:** Server-Side Rendering (SSR) via Django Templates is the primary method.
*   **Styling:** Tailwind CSS utility-first framework.
*   **User Pages:**
    *   Dedicated profile page (`/accounts/profile/`) for logged-in user dashboard.
    *   User-specific public-facing pages (`/accounts/user/<username>/`) with dynamic template loading (`templates/accounts/user_templates/<username>.html` overrides `templates/accounts/user_page.html`). Access restricted to owner or staff.
*   **Visualization Content:** Handled via `VisualizationProject` model. Types (`scan`, `video`, `still`) are hardcoded choices, displayed on dedicated list pages (`/scans/`, `/videos/`, `/images/`).

## Content Management Workflows (Admin)

*   **Public Portfolio:** Manage items via type-specific sections (e.g., "Public 3D Scans") under the "Public Portfolio & Site Core" app section.
*   **Homepage Slideshow:** Manage images via the "Homepage Slideshow" -> "Slideshow Images" section. Upload images, set status, and control order using `slideshow_order`.
*   **Client Deliverables:** Manage items via the "Client Deliverables" link under the "Client Management & Auth" app section. Use the "Client" filter.
*   **Users/Groups:** Manage via the "Client Management & Auth" app section. Add users to the 'Active Clients' group here.
*   **News Posts:** Manage via the "News" app section.

## Additional Features

*   **Authentication (Web):** Standard Django authentication system (`django.contrib.auth`) with custom templates and dynamic redirect logic.
*   **Authentication (API):** JWT (JSON Web Tokens) via `djangorestframework-simplejwt` for external clients (e.g., AI Agent).
    *   Agent obtains tokens via `/api/v1/accounts/token/` using dedicated user credentials.
    *   Tokens are refreshed via `/api/v1/accounts/token/refresh/`.
*   **Authorization (API):** Primarily role-based using Django Groups (e.g., `AI-Agents`) and custom DRF permission classes (`IsNewsAgent`).
*   **User-Specific Content:**
    *   Models use `owner` ForeignKey to `User` (e.g., `VisualizationProject`).
    *   Views filter content based on owner for user-specific pages.
    *   Admin uses inline models (`VisualizationProjectInline` on `CustomUserAdmin`) for management.
*   **Content Types (Visualizations):** Handled via `project_type` CharField with choices on `VisualizationProject` model, displayed via dedicated list views.
*   **Content Types (News):** Single `NewsPost` model used for both internal admin-created posts and external API-submitted posts (defaults to 'draft' status).
*   **Admin Customization:** Uses `CustomUserAdmin` (simplified), `NewsPostAdmin`.
*   **Template Structure:**
    *   Base Template: `templates/base.html` provides overall page structure.
    *   Partials: Reusable components (header, footer, cards) in `templates/partials/`.
        *   Includes: `_header.html`, `_footer.html`, `_pagination.html`, `_service_card.html`, `_client_portal_card.html`, `_news_card.html`, `_hero_showcase.html`.
    *   App-Specific Templates: In `apps/<app_name>/templates/<app_name>/`.
*   **Static Files:** Standard Django static file handling (`STATIC_URL`, `STATICFILES_DIRS`).
*   **Media Files:** Standard Django media file handling (`MEDIA_URL`, `MEDIA_ROOT`) for user uploads (e.g., `NewsPost.featured_image`).
*   **Configuration:** Uses environment variables via `django-environ` (`.env` file).
*   **API Design:** RESTful principles using Django REST Framework (DRF) generic views and ModelSerializers.

### Key System Patterns

*   **Modular Monolith (Django Apps):** Project organized into discrete Django apps within the `apps/` directory (`core`, `accounts`, `news`, `slideshow`).
*   **Server-Side Rendering (SSR):** Frontend primarily rendered using Django Templates.
*   **Template Structure:**
    *   Base Template: `templates/base.html` provides overall page structure.
    *   Partials: Reusable components (header, footer, cards) in `templates/partials/`.
        *   Includes: `_header.html`, `_footer.html`, `_pagination.html`, `_service_card.html`, `_client_portal_card.html`, `_news_card.html`, `_hero_showcase.html`.
    *   App-Specific Templates: In `apps/<app_name>/templates/<app_name>/`.
    *   Homepage Structure: Uses specific section IDs (`#hero`, `#services`, etc.) derived from v0.
*   **Styling:** Utility-first CSS via Tailwind CSS. Global styles/variables integrated from v0.
*   **Client-Specific Pages:** Achieved via dynamic template selection in `UserPageView`.
*   **Admin Organization:** Uses Proxy Models for type-specific views (`Public...Item` admins) and cross-app grouping (`ClientDeliverableAdminView`). Uses a dedicated app (`slideshow`) with a simple model (`SlideshowImage`) and admin for managing specific UI elements like the homepage gallery.
*   **Content Preview:** Session-based preview mode activated by staff via admin toggle, affecting querysets in views and displaying a banner.
*   **API Authentication:** JWT via `djangorestframework-simplejwt` for external agents.
*   **Configuration:** Uses `django-environ` loading from `.env`.
*   **Memory Bank:** Persistent context maintained via files in `memory-bank/`.
*   **Static JS:** Custom JavaScript, like `interactive-hero-background.js`, resides in `static/js/`. 