# System Architectural Patterns & Conventions

This document records key architectural decisions and established conventions for the ArchViz Platform project.

## Core Architecture

*   **Framework:** Django (Python)
*   **Approach:** Modular Monolith - Functionality is separated into distinct Django Apps within the `apps/` directory (e.g., `core`, `accounts`, `news`, `slideshow`).
*   **Rendering:** Server-Side Rendering (SSR) using Django Templates.
*   **Database:** SQLite for development, planned PostgreSQL for production (via environment variable `DATABASE_URL`).
*   **Project Structure:** For a detailed view of the project directory layout, see @file:memory-bank/project_structure.mdc.

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
*   **Styling:** Utility-first CSS via Tailwind CSS. Custom CSS variables and component/utility styles organized into `static/css/base/`, `static/css/components/`, `static/css/utils/` and imported via `static/css/main.css`.
*   **Layout Container:** Site width and padding controlled centrally via `--layout-*` CSS variables defined in `static/css/base/variables.css` and applied using the `.layout-container` utility class defined in `static/css/base/layout.css`.
*   **Client-Specific Pages:** Achieved via dynamic template selection in `UserPageView`.
*   **Admin Organization:** Uses Proxy Models for type-specific views (`Public...Item` admins) and cross-app grouping (`ClientDeliverableAdminView`). Uses a dedicated app (`slideshow`) with a simple model (`SlideshowImage`) and admin for managing specific UI elements like the homepage gallery.
*   **Content Preview:** Session-based preview mode activated by staff via admin toggle, affecting querysets in views and displaying a banner.
*   **API Authentication:** JWT via `djangorestframework-simplejwt` for external agents.
*   **Configuration:** Uses `django-environ` loading from `.env`.
*   **Memory Bank:** Persistent context maintained via files in `memory-bank/`.
*   **Static JS:** Custom JavaScript, like `interactive-hero-background.js`, resides in `static/js/`.

## Frontend Patterns

### JS-Driven Dynamic Element Sizing
*   **Purpose:** To achieve responsive element dimensions (e.g., width, aspect ratio) that scale smoothly based on viewport size relative to defined thresholds, rather than relying solely on CSS breakpoints.
*   **Implementation (Gallery Example):**
    1.  Define configuration parameters as CSS custom properties (`:root` variables) in `base.html` (e.g., `--gallery-slide-height`, `--gallery-min-aspect-threshold`, `--gallery-full-aspect-threshold`, `--gallery-aspect-ratio-variance`).
    2.  In JavaScript (`gallery-swiper-init.js`):
        *   Read the CSS variables using `getComputedStyle`.
        *   Read the current `window.innerWidth`.
        *   Calculate minimum and maximum target element dimensions based on fixed dimension (height) and desired aspect ratios (e.g., 9:16 derived from variance, 16:9 max).
        *   Calculate an interpolation factor (`viewportFactor`) between 0 and 1 based on where `window.innerWidth` falls between the min and max thresholds.
        *   Calculate the target dimension (e.g., `targetSlideWidth`) using linear interpolation: `minDimension + (maxDimension - minDimension) * viewportFactor`.
        *   Select the target HTML elements (`.swiper-slide`).
        *   Apply the calculated dimension directly via inline style: `element.style.width = \`{targetSlideWidthPx}px\`;`.
    3.  Add `resize` event listener (throttled with `requestAnimationFrame`) to re-run the calculation function.
    4.  Run calculation function once on `DOMContentLoaded`.
    5.  If interacting with a library (like Swiper), call its update method (e.g., `swiper.update()`) after modifying element sizes.
*   **Benefits:** Smooth scaling, precise control via thresholds, configuration through CSS.
*   **Considerations:** Requires JavaScript, relies on correct CSS variable reading and unit conversions, needs careful throttling on resize.

### Layered Section Backgrounds
*   **Purpose:** To create complex background effects by layering different elements (colors, patterns, animations).
*   **Implementation (Services Section Example):**
    1.  **Base Section:** Apply base padding (`py-20`), positioning context (`relative`), overflow control (`overflow-hidden`), and potentially a fallback background color (`bg-slate-50`) to the main `<section>` tag.
    2.  **Static Pattern:** Add complex backgrounds like SVG patterns or gradients directly to the section via inline `style` or CSS classes. Use CSS gradient overlays (e.g., `linear-gradient` in `style`) for effects like fading the pattern from an edge.
    3.  **Animated Canvas:** Place an absolutely positioned `<canvas>` element (`absolute inset-0 w-full h-full`) *inside* the section, *before* the main content containers.
    4.  **Z-Indexing:** Assign a lower z-index (`z-0` or `z-[-1]`) to the canvas to place it behind the content.
    5.  **Content:** Place the main content containers (`div`, etc.) *after* the canvas within the section. Give the content container `position: relative` and a higher z-index (e.g., `z-10`) to ensure it sits above the canvas and base background.
    6.  **JS Animation:** Use JavaScript (e.g., Three.js) to draw onto the canvas.
*   **Benefits:** Allows combining static and dynamic background elements. Clear separation of layers using positioning and z-index.
*   **Considerations:** Requires careful management of `position` and `z-index`. Performance of JS animation needs monitoring.

### CSS Variables for JS Configuration
*   **Purpose:** To allow easy configuration and tweaking of JavaScript behavior (animation physics, thresholds, colors, opacity) without modifying the JS source code.
*   **Implementation:**
    1.  Define configuration parameters as CSS custom properties in a global scope (`:root` in `base.html`), using descriptive names (e.g., `--sphere-damping`, `--gallery-full-aspect-threshold`).
    2.  In the relevant JavaScript file, use `getComputedStyle(document.documentElement).getPropertyValue(\'--variable-name\')` to read the value.
    3.  Parse the retrieved string value to the appropriate type (float, integer, color). Provide sensible default values in the JS in case the CSS variable is missing or invalid.
    4.  Use the parsed value within the JavaScript logic.
*   **Benefits:** Centralized configuration, easy tweaking by modifying CSS, separation of configuration from logic.
*   **Considerations:** Requires careful parsing and type conversion in JS, providing fallbacks is essential.

### CSS Filter for Icon Recoloring
*   **Purpose:** To change the apparent color of embedded SVG or Lottie animations where internal colors are hardcoded and cannot be easily targeted by standard CSS color properties (like `text-color`).
*   **Implementation (Footer Icons Example):**
    1.  Apply a CSS `filter` property to the container element (`.lottie-icon-container`).
    2.  Use `invert(1)` to swap dark colors to light (and vice-versa).
    3.  Optionally chain `brightness()` (e.g., `brightness(1.5)`) or `contrast()` filters to adjust the resulting color if simple inversion results in undesired tones (like grey instead of bright white).
*   **Benefits:** Can force color changes on complex embedded graphics.
*   **Considerations:** Can be imprecise, might affect all colors within the graphic, exact filter values may require tweaking, browser performance impact is usually minimal but possible.

### Custom JS Infinite Scroll Gallery (CSS Transform)
*   **Purpose:** To create a horizontally scrolling gallery with seamless looping, interactive mouse control, idle scroll, dynamic item sizing, and full configuration via CSS variables.
*   **Implementation (`css_gallery_init.js` example):**
    1.  **HTML:** Container (`.css-gallery-container` with `overflow: hidden`), Track (`.css-gallery-track` with `display: flex`), Items (`.css-gallery-item` with `flex-shrink: 0`).
    2.  **Duplication:** JS duplicates all gallery items within the track to create enough content for looping.
    3.  **CSS Variables:** Define all control parameters (`--gallery-slide-height`, `--gallery-slide-spacing`, `--gallery-item-border-radius`, aspect ratio vars, physics vars, idle speed) in `:root` (`base.html`).
    4.  **Styling:** CSS (`input.css`) applies appearance vars (height, spacing, radius) to items and sets `flex` on the track. `will-change: transform` is added for performance.
    5.  **Dynamic Width:** JS function (`updateGalleryItemWidths`) reads aspect ratio vars, calculates item width based on viewport size and interpolation, and applies it via inline `style.width`. Runs on load and throttled resize.
    6.  **Loop Boundary:** JS calculates `originalContentWidth` (width of original items + spacing) on load and resize.
    7.  **Animation Loop:** JS `requestAnimationFrame` (`galleryJSScrollLoop`) runs continuously.
    8.  **Physics:** Loop calculates `currentVelocityPPS` based on mouse position (reading physics variables) or idle speed (`--gallery-idle-scroll-pps`), applying acceleration and damping.
    9.  **Position Update:** Loop updates an internal JS variable `currentTranslateX += currentVelocityPPS * deltaTime`.
    10. **CSS Transform:** Loop applies the position to the track: `galleryTrack.style.transform = \`translateX(${-currentTranslateX}px)\`;`.
    11. **Looping:** Loop checks if `currentTranslateX` exceeds `originalContentWidth` or goes below 0, resetting it using subtraction/addition of `originalContentWidth`.
    12. **Idle Scroll Fix:** When mouse is off, the scroll update uses `idlePPS * deltaTime` directly for `translateX`, bypassing `currentVelocityPPS` to avoid stalling at low speeds.
*   **Benefits:** Smooth animation via `transform`, unified JS logic, full CSS variable control, reliable low-speed idle scroll.
*   **Considerations:** Requires careful JS logic for physics and looping, relies on accurate width/spacing calculations for loop boundary.

### Base HTML CSS Variables for Specific Overrides -> Deprecated
*Note: This pattern has been superseded by centralizing ALL custom variables in `static/css/base/variables.css`.*

### Layout Container Utility Class
*   **Purpose:** To provide consistent maximum width and responsive horizontal padding for main content sections across the site, controlled by centralized CSS variables.
*   **Implementation:**
    1.  CSS variables defined in `static/css/base/variables.css`: `--layout-max-width`, `--layout-padding-base`, `--layout-padding-sm`, `--layout-padding-lg`.
    2.  Utility class `.layout-container` defined in `static/css/base/layout.css` using `@apply w-full mx-auto;` and applying the variables via `max-width` and `padding-left/right` properties.
    3.  Tailwind's `@screen` directives are used within the `.layout-container` definition to apply responsive padding variables.
    4.  Applied in templates (e.g., @file:templates/core/home.html) by replacing Tailwind container utilities (`max-w-*, mx-auto, px-*, sm:px-*, lg:px-*`) with the single `.layout-container` class.
*   **Benefits:** Centralized control over site width/padding via CSS variables. Cleaner HTML templates. Consistent layout application.
*   **Considerations:** Requires maintaining the variable definitions and the utility class definition. Changes require recompiling CSS.

### JS Hover State Toggle Pattern
*   **Purpose:** To trigger complex hover effects (animations, multiple element changes) reliably, avoiding potential conflicts with nested Tailwind `group-hover` utilities or complex transforms.
*   **Implementation (Service Card Example):**
    1.  **HTML:** Add a marker class (e.g., `.service-card-group`) to the parent hover target.
    2.  **CSS:** Define base styles and animation `@keyframes` in a component CSS file (e.g., @file:static/css/components/our_services_card.css). Create rules targeting descendant elements based on the parent having an `.is-hovered` class (e.g., `.service-card-group.is-hovered .learn-more-text { animation: ...; }`).
    3.  **JS:** Create a script (e.g., @file:static/js/service_card_hover.js) that selects the parent elements and uses `mouseenter`/`mouseleave` event listeners to add/remove the `.is-hovered` class.
*   **Benefits:** Decouples hover detection (JS) from animation/styling (CSS), reliable triggering, allows for sophisticated CSS animations not easily achievable with utility classes alone.
*   **Considerations:** Requires small amount of JS for state management. 