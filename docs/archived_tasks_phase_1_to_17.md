---
description: Tasks list
globs: 
alwaysApply: false
---

 # TASKS: Architectural Visualization Platform Build

**Project Goal:** Build a website to showcase architectural visualizations (3D scans, photogrammetry, AI imagery) using static embeds (Sketchfab, Vimeo) and image galleries. Plan for minimal client authentication later and potential future AI features (blog, chatbot). Low initial traffic expected.

**AI Assistant Guidance:** Please follow these tasks sequentially, adhering to all guidelines in @file:.cursor/rules/00_core_assistant_protocol.mdc and any technology-specific rules referenced or created. Await confirmation before proceeding to the next numbered task.

---

**Phase 1: Foundation & Backend Setup**

- [X] **1.1 Environment Verification:** (User confirmed completed) Confirm necessary tools (Python 3.x, pip, Node.js LTS, npm, Git) are installed and report versions.
- [X] **1.2 Backend Framework Decision & Scaffolding:**
    - [X] **1.2.1 Recommendation:** Based on project goals and reviewed blueprints, recommend **either Django or Node.js/Express**. Justify the choice referencing built-in features (auth, admin), development speed, security, maintainability, and suitability for potential AI integration. Reference @file:.cursor/rules/00_core_assistant_protocol.mdc.
    - [X] **1.2.2 Confirmation:** Await user confirmation.
    - [X] **1.2.3 Scaffolding:** Upon confirmation:
        - Scaffold the chosen framework's project structure (e.g., `django-admin startproject config .` & `python manage.py startapp core` potentially in an `apps/` dir for Django; standard Express setup for Node).
        - Use the activated `.venv` for Python package installs (`pip install ...`).
        - Create/update `requirements.txt` or `package.json` with core dependencies.
        - Report created files/folders.
- [X] **1.3 Configure Core Settings & Environment:**
    - [X] **1.3.1 Env Package:** Install and configure environment variable loading (`django-environ` or `dotenv`). Update @file:.gitignore if needed.
    - [X] **1.3.2 `.env.example` Check:** Ensure @file:.env.example contains placeholders for `SECRET_KEY`, `DEBUG=True`, `DATABASE_URL=sqlite:///db.sqlite3`.
    - [X] **1.3.3 Framework Settings:** Configure the main settings file (`config/settings/base.py` or similar) to load these variables. Set `DEBUG` and `ALLOWED_HOSTS` (`['localhost', '127.0.0.1']` for dev).
    - [X] **1.3.4 Database:** Configure the framework for SQLite dev database. Run initial migrations (e.g., `python manage.py migrate`). Verify success.
- [X] **1.4 Create Foundational Framework Rules:**
    - [X] **1.4.1 Create Rule File:** Create a *new* rule file in the appropriate subfolder, e.g., `.cursor/rules/backend/django_rules.mdc` or `.cursor/rules/backend/node_express_rules.mdc`.
    - [X] **1.4.2 Populate Basic Rules:** Add foundational rules to this *new file*, including:
        - Preferred project structure (e.g., Django apps in `apps/`, Node modules).
        - Naming conventions (files, variables, classes).
        - View/Controller patterns (e.g., Class-Based Views vs Functions).
        - Basic framework-specific security reminders (CSRF, input validation).
        - **Include a simple code example** demonstrating the preferred style (e.g., a basic Django view or Express route handler).
    - [X] **1.4.3 Reference Core Protocol:** Ensure this new rule file implicitly uses the core protocol (or add `@file:.cursor/rules/00_core_assistant_protocol.mdc` if needed, though broad globs might cover it).
- [X] **1.5 Version Control Checkpoint:** Add all new/modified files (framework code, `.env.example` updates, new rule file) to Git staging. Generate a Conventional Commit message (e.g., "feat: Scaffold [Django/Node] backend, configure settings, add initial framework rules"). Await user confirmation to commit.

---

**Phase 2: Foundational Frontend Layout & Structure (Mobile-First)**

*AI Assistant Guidance: This phase establishes the core HTML structure and basic frontend configuration, guided by mobile-first principles and insights from design blueprints. Styling will be minimal; focus is on structure and semantics.*

- [X] **2.1 Frontend Approach Decision & Validation:**
    - [X] **2.1.1 Recommendation:** Based on the goal of displaying embedded content simply and efficiently, confirm that **Server-Side Rendering (SSR) using the backend framework's templating engine** (e.g., Django Templates) is the most suitable initial approach. Justify why a complex SPA framework is not needed now. Reference mobile-first best practices.
    - [X] **2.1.2 Confirmation:** Await user confirmation.
- [X] **2.2 Scaffold Core Frontend Directories & Files:**
    - [X] **2.2.1 Create Directories:** Ensure the following standard directories exist: `templates/` (with a subdirectory for the core app, e.g., `templates/core/`), `static/`, `static/css/`, `static/js/`, `static/images/`.
    - [X] **2.2.2 Create Base Files:** Create:
        - `templates/base.html` (with HTML5 boilerplate, viewport meta tag for responsiveness).
        - `templates/core/home.html` (initially empty or just extending base).
        - `static/css/style.css` (empty or with basic resets/body styles).
        - `static/js/script.js` (empty).
- [X] **2.3 Implement Core Semantic Layout (`templates/base.html`):**
    - [X] **2.3.1 Structure:** Implement the main page structure within `<body>` using semantic HTML5 elements:
        - `<header>`: Placeholder for logo and main navigation.
        - `<main>`: Primary content area. Include a content block placeholder (e.g., `{% block content %}{% endblock %}` for Django). Structure inner divs anticipating a simple grid/column layout later.
        - `<footer>`: Placeholder for copyright and secondary links.
    - [X] **2.3.2 Mobile-First:** Ensure the structure is inherently mobile-friendly (e.g., linear flow, no fixed widths initially).
    - [X] **2.3.3 Accessibility:** Use appropriate landmarks (`<nav>` within header, etc.).
- [X] **2.4 Configure Static & Template File Serving:**
    - [X] **2.4.1 Settings:** Configure the backend framework's settings (`settings.py` or equivalent) to correctly locate the `templates/` directory and the `static/` directory (`STATIC_URL`, `STATICFILES_DIRS`).
    - [X] **2.4.2 Verification:** Briefly test if the development server can find and potentially serve `style.css` (even if empty) when linked from `base.html`. Report success or configuration needed.
- [X] **2.5 Create Foundational Frontend Rules:**
    - [X] **2.5.1 Create Rule File:** Create a *new* rule file: `.cursor/rules/frontend/01_layout_styling_base.mdc`.
    - [X] **2.5.2 Populate Basic Rules:** Add foundational rules to this file, referencing the design blueprints:
        - **Guideline:** Enforce **Mobile-First** design approach for all layouts and CSS.
        - **Guideline:** Mandate use of **semantic HTML5** elements (`header`, `nav`, `main`, `footer`, `section`, `article`).
        - **Guideline:** Specify basic CSS structure (e.g., recommend CSS resets, basic `box-sizing: border-box;`).
        - **Guideline:** Note preference for CSS Grid/Flexbox for layout (to be detailed later).
        - **Guideline:** Include placeholder for typography rules (font stack, base size - e.g., 16px).
        - **Guideline:** Reference @file:templates/base.html as the core layout structure.
        - **Example:** Include a small HTML snippet showing correct semantic structure for the header/main/footer.
- [X] **2.6 Version Control Checkpoint:** Stage all new/modified frontend files (templates, static files, settings changes) and the new frontend rule file. Generate a Conventional Commit message (e.g., "feat: Establish mobile-first frontend structure, base layout, static files config, and layout rules"). Await user confirmation to commit.

---

**Phase 3: Implement Homepage Content & Structure**

*AI Assistant Guidance: This phase focuses on structuring the homepage (`home.html`) and embedding the core placeholder content (3D models, videos, images). Apply semantic HTML and basic accessibility principles based on @file:.cursor/rules/frontend/01_layout_styling_base.mdc. Reference design blueprint concepts like Hero sections and F/Z patterns for logical placement.*

- [X] **3.1 Homepage Route & View Setup:** 
    - [X] **3.1.1 Create URL:** Ensure a URL pattern for the root path (`/`) exists in `apps/core/urls.py` (or the relevant app's `urls.py`) and that it's included in the main `config/urls.py`.
    - [X] **3.1.2 Create View:** Implement the corresponding view function/class (e.g., `HomePageView` in `apps/core/views.py`) that renders the `templates/core/home.html` template, ensuring it extends `templates/base.html`. Pass a basic page title in the context.
    - [X] **3.1.3 Verify Basic Rendering:** Run the dev server. Access the homepage (`/`). Confirm the base layout (Header/Footer from `base.html`) renders without errors, even with an empty content block. Report success or errors.
- [X] **3.2 Structure Homepage Content Area (`templates/core/home.html`):**
    - [X] **3.2.1 Define Sections:** Within the `{% block content %}` of `home.html`, create primary content sections using semantic tags, considering a typical landing page flow (e.g., Hero, Portfolio/Gallery).
    - [X] **3.2.2 Placement Logic:** Briefly explain placement choices based on F/Z patterns.
- [X] **3.3 Embed Sketchfab Model:**
    - [X] **3.3.1 Add Embed Code:** In the `#hero` section, insert the placeholder Sketchfab `<iframe>` embed code.
    - [X] **3.3.2 Accessibility:** Add a descriptive `title` attribute to the `<iframe>`.
- [X] **3.4 Embed Vimeo Video:**
    - [X] **3.4.1 Add Embed Code:** In an appropriate section, insert the placeholder Vimeo `<iframe>` embed code.
    - [X] **3.4.2 Accessibility:** Add a descriptive `title` attribute to the `<iframe>`.
    - [X] **3.4.3 Responsiveness (Basic):** Wrap the iframe in a `div` container and note the need for responsive CSS.
- [X] **3.5 Implement Static Image Gallery:**
    - [X] **3.5.1 Add Images:** Ensure 1-2 placeholder `.jpg` or `.png` images exist in `static/images/`.
    - [X] **3.5.2 Create HTML Structure:** In the `#image-gallery` section, implement the gallery using semantic HTML.
    - [X] **3.5.3 Display Images:** Use Django's `{% static %}` tag within `<img>` tags.
    - [X] **3.5.4 Accessibility:** Provide meaningful `alt` text for each `<img>` tag.
- [X] **3.6 Create Content Display Rules:**
    - [X] **3.6.1 Create Rule File:** Create a *new* rule file: `.cursor/rules/frontend/02_content_embeds.mdc`.
    - [X] **3.6.2 Populate Basic Rules:** Add rules to this file covering: `<iframe>` titles, `<img>` alt text, semantic structure for content blocks, placeholder for responsive embeds, placeholder for image optimization. Reference @file:.cursor/rules/frontend/01_layout_styling_base.mdc.
- [X] **3.7 Verification:**
    - [X] **3.7.1 Run Server:** Ensure dev server is running.
    - [X] **3.7.2 Check Homepage:** Access homepage (`/`). Verify layout structure, iframes appear, images display, alt/title attributes are present via inspection.
    - [X] **3.7.3 Report:** Confirm successful rendering and report any errors.
- [X] **3.8 Version Control Checkpoint:** Stage changes (views, urls, templates, static images, new rule file). Generate commit message (e.g., "feat: Implement homepage content structure with placeholders"). Await confirmation to commit.

---

**Phase 4: Initial Styling, Navigation & Auth Implementation**

*AI Assistant Guidance: This phase applies foundational styling using CSS (or optionally Tailwind CSS), makes navigation functional, and implements the Django authentication structure.*

- [X] **4.1 Styling Approach Decision:** (Tailwind chosen)
    - [X] **4.1.1 Recommendation:** Recommend **either** basic custom CSS using `static/css/style.css` **or** integrating **Tailwind CSS** now. Justify based on project simplicity vs. utility-first speed/consistency advantages highlighted in blueprints. Mention that Tailwind requires Node.js build steps.
    - [X] **4.1.2 Confirmation:** Await user confirmation.
- [X] **4.2 Basic Styling Implementation:**
    - [X] **4.2.1 CSS Setup:** (Skipped)
    - [X] **4.2.2 Tailwind Setup:**
        - [X] Integrate Tailwind: `tailwindcss`, `postcss`, `autoprefixer`, config files, `input.css`.
        - [X] Apply basic classes to `base.html`, `home.html`.
        - [X] Create `.cursor/rules/frontend/03_tailwind_config.mdc`.
- [X] **4.3 Implement Navigation:**
    - [X] **4.3.1 Create Placeholder Pages:** Create views, templates, and URLs for About/Contact.
    - [X] **4.3.2 Update Header:** Add links to About/Contact in `base.html` using `{% url %}`.
    - [X] **4.3.3 Verification:** Verify navigation links work.
- [X] **4.4 Prepare Authentication Structure:**
    - [X] **4.4.1 Create `accounts` App:** Create `apps/accounts` and add to `INSTALLED_APPS`.
    - [X] **4.4.2 Configure Auth URLs:** Include `apps.accounts.urls` and remove `django.contrib.auth.urls` from `config/urls.py` (handled within `apps.accounts.urls`).
    - [X] **4.4.3 Create Basic Auth Templates:** Create `templates/registration/login.html` and `templates/registration/logged_out.html`.
    - [X] **4.4.4 Create Auth Rules:** Create @file:.cursor/rules/auth_rules.mdc.
    - [X] **4.4.5 Verification:** Verify `/accounts/login/` loads.
- [X] **4.5 Create User Profile Page:**
    - [X] **4.5.1 Create Profile View:** Create `UserProfileView` in `apps/accounts/views.py` (requires login).
    - [X] **4.5.2 Create Profile URL:** Add `/profile/` URL in `apps/accounts/urls.py`.
    - [X] **4.5.3 Create Profile Template:** Create `templates/accounts/profile.html`.
    - [X] **4.5.4 Update Login Redirect URL:** Set `LOGIN_REDIRECT_URL = 'accounts:profile'` (initially).
- [X] **4.6 Customize Admin Header:**
    - [X] **4.6.1 Create Override Template:** Create `templates/admin/base_site.html`.
    - [X] **4.6.2 Override Header:** Modify `base_site.html` to change header text/link.
- [X] **4.7 Create User-Specific Pages (Initial):**
    - [X] **4.7.1 Create User Page View:** Add `UserPageView` to `apps/accounts/views.py`.
    - [X] **4.7.2 Create User Page URL Pattern:** Add `/user/<username>/` URL to `apps/accounts/urls.py`.
    - [X] **4.7.3 Create User Page Template:** Create `templates/accounts/user_page.html` (default).
- [X] **4.8 Implement Dynamic User Page Templates:**
    - [X] **4.8.1 Modify `UserPageView`:** Change `UserPageView` to use `get_template_names` to select `<username>.html` or fallback.
    - [X] **4.8.2 Create Example Template:** Create `templates/accounts/user_templates/test01.html`.
- [X] **4.9 Implement Dynamic Login Redirect:**
    - [X] **4.9.1 Create Custom Login View:** Add `CustomLoginView` inheriting `LoginView`, overriding `get_success_url`.
    - [X] **4.9.2 Update URL Patterns:** Use `CustomLoginView` for `/accounts/login/` in `apps/accounts/urls.py`. Define `logout` URL explicitly. Remove `django.contrib.auth.urls` include.
    - [X] **4.9.3 Remove `LOGIN_REDIRECT_URL`:** Remove the setting from `config/settings.py`.
    - [X] **4.9.4 Update Base Template URLs:** Fix `{% url %}` tags in `base.html` and `login.html` to use `accounts:login`/`accounts:logout`.
- [X] **4.10 Secure User-Specific Pages:**
    - [X] **4.10.1 Add Access Control:** Add `LoginRequiredMixin` and `dispatch` check to `UserPageView` to restrict access to owner or staff.
- [X] **4.11 Version Control Checkpoint:** Staged and committed Phase 4 changes.

---

**Phase 5: Refactor Visualization Types & Display**

*AI Assistant Guidance: This phase refactors the project structure to use hardcoded visualization types with dedicated pages, removing the previous database model approach and updating associated views, templates, and navigation.*

- [X] **5.1 Modify Models for Hardcoded Types (`apps/core/models.py`):**
    - [X] **5.1.1 Remove `VisualizationType` Model:** Delete the `VisualizationType` model.
    - [X] **5.1.2 Update `VisualizationProject` Model:** Change the `type` field to `project_type` (CharField) with predefined choices (`scan`, `video`, `still`).
- [X] **5.2 Update Admin (`apps/core/admin.py`):**
    - [X] **5.2.1 Remove `VisualizationTypeAdmin`:** Delete the admin registration for the old model.
    - [X] **5.2.2 Update `VisualizationProjectAdmin`:** Modify list display, filters, and fieldsets to use `project_type`.
- [X] **5.3 Update Core Views (`apps/core/views.py`):**
    - [X] **5.3.1 Update `HomePageView`:** Remove the project query logic.
    - [X] **5.3.2 Add `BaseProjectListView`:** Create a base list view for common functionality.
    - [X] **5.3.3 Add Specific List Views:** Create `ScanListView`, `VideoListView`, `StillListView` inheriting from base and filtering by `project_type`.
- [X] **5.4 Update Core URLs (`apps/core/urls.py`):**
    - [X] **5.4.1 Add List View URLs:** Add URL patterns for `/scans/`, `/videos/`, `/images/` pointing to the new list views.
- [X] **5.5 Create List Page Templates (`templates/core/`):**
    - [X] **5.5.1 Create Base List Template:** Create `_project_list_base.html` with grid, pagination, and card include.
    - [X] **5.5.2 Create Card Partial:** Create `_project_card.html` for displaying a single project.
    - [X] **5.5.3 Create Specific List Templates:** Create `project_list_scans.html`, `project_list_videos.html`, `project_list_stills.html` extending the base.
- [X] **5.6 Update Base Navigation (`templates/base.html`):**
    - [X] **5.6.1 Update Links:** Change header/mobile nav links to point to new list view URL names (`core:scan_list`, etc.).
- [X] **5.7 Update Homepage Template (`templates/core/home.html`):**
    - [X] **5.7.1 Remove Project Loop:** Delete the old "Featured Work" section.
    - [X] **5.7.2 Add Static Content:** Add introductory text and links to the new list pages.
- [X] **5.8 Database Migrations:**
    - [X] **5.8.1 Delete Old Data:** (User confirmed completed) Ensure old projects/types are deleted via admin before migrating.
    - [X] **5.8.2 Make Migrations:** Run `makemigrations core`.
    - [X] **5.8.3 Migrate:** Run `migrate`.
- [X] **5.9 Verification:**
    - [X] **5.9.1 Check Pages:** Verify homepage, new list pages load correctly.
    - [X] **5.9.2 Check Admin:** Verify `project_type` choice field in admin.
    - [X] **5.9.3 Re-add & Check Content:** Re-add test projects via admin and verify they appear on the correct list pages.
- [X] **5.10 Version Control Checkpoint:** Stage all changes from Phase 5. Generate commit message (e.g., "refactor: Implement hardcoded visualization type pages"). Await user confirmation to commit.

---

**Phase 6: Enhance AI Assistant Capabilities (Memory Bank & Core MCP Tools)**

*AI Assistant Guidance: This phase implements a persistent Memory Bank system using structured Markdown files and integrates key MCP servers (GitHub, Browser Tools) to significantly enhance context retention and provide access to essential external development tools. Adhere strictly to the memory protocol and tool usage rules.*

- [X] **6.1 Implement Enhanced Memory Bank System (Rules-Based):**
    - [X] **6.1.1 Create Directory & Core Files:** Ensure `memory-bank/` exists at root. Create/ensure the following Markdown files exist inside `memory-bank/`:
        - `project_brief.md`
        - `active_context.md`
        - `progress.md`
        - `system_patterns.md` *(For architectural decisions, reusable patterns)*
        - `tech_context.md` *(For specific tech stack details, versions, setup)*
    - [X] **6.1.2 Populate `project_brief.md`:** Draft high-level project goals, audience, core features, constraints based on overall project understanding. *(Use AI assist if needed: "Draft content for @file:memory-bank/project_brief.md based on our project goals.")*
    - [X] **6.1.3 Populate `tech_context.md`:** Add details about the chosen tech stack (Django version, Python version, Tailwind setup method, SQLite for dev, planned PostgreSQL for prod).
    - [X] **6.1.4 Populate `system_patterns.md`:** Add initial entries about key architectural decisions made so far (e.g., "Modular Monolith approach using Django Apps", "SSR via Django Templates", "Client-specific pages via dynamic templates").
    - [X] **6.1.5 Populate `active_context.md`:** Initialize: "Status: Completed Phase 5 (DB Models/Admin). Current Focus: Phase 6 (Memory/Tools). Next Step: 6.1.6."
    - [X] **6.1.6 Populate `progress.md`:** Initialize: "Log: Phase 1-5 completed. Key structures: Django backend, basic frontend layout, Tailwind CSS, auth prep, core Visualization models & admin."
    - [X] **6.1.7 Create/Refine Memory Bank Rule:** Ensure `.cursor/rules/core/01_memory_bank_protocol.mdc` exists and contains robust instructions:
        - Update YAML Frontmatter: Set `ruleType: alwaysApply: true` and `priority: 100` (high priority).
        - **Guideline:** "Context Loading: At the start of complex tasks, new phases, or session resumption, ALWAYS read context from: @file:memory-bank/project_brief.md, @file:memory-bank/active_context.md, @file:memory-bank/progress.md, @file:memory-bank/system_patterns.md, @file:memory-bank/tech_context.md."
        - **Guideline:** "Active Context Update: After planning or completing a significant action, update @file:memory-bank/active_context.md detailing the `Status`, `Current Focus`, and `Next Step` (referencing the task number in @file:TASKS.mdc)."
        - **Guideline:** "Progress Logging: After completing major milestones (like a Phase) or resolving significant errors, add a concise entry to @file:memory-bank/progress.md."
        - **Guideline:** "Plan Mode ('plan this task'): Read relevant memory files, analyze requirements, outline steps, update `active_context.md` with the plan, await user confirmation."
        - **Guideline:** "Act Mode ('implement task X'): Read relevant memory files (especially `active_context.md`), execute the step, report outcome, log errors/completions in `progress.md` (if milestone), update `active_context.md` with next step/status."
    - [X] **6.1.8 Update Core Protocol:** Verify/ensure @file:.cursor/rules/00_core_assistant_protocol.mdc includes a directive to use the memory system: "Actively use and maintain the memory system defined in @file:.cursor/rules/core/01_memory_bank_protocol.mdc."

- [X] **6.2 Setup GitHub MCP Server:**
    - [X] **6.2.1 Create/Update `mcp.json`:** Ensure `.cursor/mcp.json` exists with the `mcpServers` object.
    - [X] **6.2.2 Configure GitHub MCP:** Add the GitHub MCP configuration. **Crucially, consult the official documentation** (`@web https://github.com/modelcontextprotocol/servers/tree/main/src/github` or via `cursor.directory`) for the *exact* required `command`, `args`, and `env` variables. Add this config block to `mcpServers`.
    - [X] **6.2.3 Update `.env.example`:** Add `GITHUB_TOKEN=` placeholder to @file:.env.example. Add comment: `# Required GitHub Personal Access Token with repo scope`.
    - [X] **6.2.4 Verify Installation:** Using the terminal tool, run any required installation command (e.g., `npx -y @mcp/github` if using stdio). Report success/failure.
    - [X] **6.2.5 Create GitHub MCP Rule:** Create file `.cursor/rules/tools/github_mcp.mdc`.
    - [X] **6.2.6 Populate Rule:** Add usage rules:
        - Guideline: "Use GitHub MCP for read-only operations (e.g., `git status`, list branches, view history) when requested to understand repository state."
        - Guideline: "Use GitHub MCP for write operations (e.g., commit, push, create branch/PR) **ONLY** when explicitly instructed and after user confirmation of the exact action."
        - Guideline: "Before committing, always present the generated commit message for approval."
        - Set `ruleType: agent-requested` with `description: Interact with the GitHub repository using MCP`.

- [X] **6.3 Setup Browser Tools MCP Server (`AgentDeskAI/browser-tools-mcp`):**
    - [X] **6.3.1 Configure Browser Tools MCP:** Add the configuration for `@agentdesk/browser-tools-mcp` to `mcp.json`. **Consult the documentation** (`@web https://github.com/AgentDeskAI/browser-tools-mcp`) for the correct `command` (likely `npx -y @agentdesk/browser-tools-mcp`), `args`, and any necessary `env` variables (check if API keys are needed for its backend).
    - [X] **6.3.2 Verify Installation:** Run installation command (`npx -y @agentdesk/browser-tools-mcp`). Report success/failure.
    - [X] **6.3.3 Create Browser Tools MCP Rule:** Create file `.cursor/rules/tools/browser_tools_mcp.mdc`.
    - [X] **6.3.4 Populate Rule:** Add usage rules:
        - Guideline: "Use Browser Tools MCP for tasks like checking console logs, network activity, or taking screenshots when debugging frontend issues or verifying UI elements, *only when specifically requested*."
        - Guideline: "Always state the specific browser tool command you intend to use before execution."
        - Set `ruleType: agent-requested` with `description: Interact with the browser via AgentDesk Browser Tools MCP`.

- [X] **6.4 Update Core Protocol (Tools):**
    - [X] **6.4.1 Verify Directive:** Ensure directive #8 in @file:.cursor/rules/00_core_assistant_protocol.mdc references configured tools and their rules (e.g., "Utilize configured MCP servers (GitHub, Browser Tools) per rules in @file:.cursor/rules/tools/... when relevant or requested.").

- [X] **6.5 Verification & Testing:**
    - [X] **6.5.1 Memory Test:** Ask the AI to recall the project goal and backend framework based *only* on @file:memory-bank/project_brief.md and @file:memory-bank/tech_context.md. Verify correct recall.
    - [X] **6.5.2 GitHub MCP Test:** Attempt a simple GitHub MCP read operation (e.g., `search_repositories`). Verify success.
    - [X] **6.5.3 Browser Tools MCP Test:** Attempt a simple Browser Tools MCP operation (e.g., `getConsoleLogs`). Requires the necessary browser extension and local server components to be running correctly. Verify success.
- [X] **6.6 Version Control Checkpoint:** Stage all changes (`memory-bank/`, `mcp.json`, `.cursor/rules/` updates, `.env.example` updates). Generate commit message (e.g., "feat: Implement enhanced Memory Bank and configure GitHub/Browser Tools MCPs & rules"). Await confirmation to commit.

---

**Phase 7: Implement User Content Flow, Refine Admin & Templates, Document Structure**

*AI Assistant Guidance: This phase implements the core logic for displaying user-specific content, enhances the Admin interface for easier content management, refines the template structure using partials, and thoroughly documents the established project structure and conventions.*

- [X] **7.1 Implement User-Specific Content Display Logic:**
    - **7.1.1 Refine `UserPageView` (`apps/accounts/views.py`):** Modify `get_context_data`:
        - Retrieve the target user object (`get_object_or_404(User, username=self.kwargs['username'])`).
        - Query `VisualizationProject` model, filtering by `owner=target_user`. Decide if `is_public=False` should also be filtered or if users see all their own items. *(AI: Recommend showing all owner's items, public and private, on their specific page).*
        - Pass the filtered queryset (e.g., `user_projects`) and the `target_user` object to the template context.
    - **7.1.2 Update User Page Templates (`user_page.html` & Specific Overrides):** Modify `templates/accounts/user_page.html` (and example `test01.html`) to:
        - Display heading: "Projects for {{ target_user.username }}".
        - Loop through `user_projects`.
        - Include @file:templates/core/_project_card.html partial for each project. Handle `{% empty %}` case.
    - **7.1.3 Verification:** Test this logic thoroughly as described in original Task 7.8.2.

- [X] **7.2 Enhance Admin for User Content Assignment:**
    - **7.2.1 Ensure Owner Field on Project Form (`apps/core/admin.py`):** Review `VisualizationProjectAdmin`. Explicitly add `owner` to `fields` or `fieldsets` to guarantee it appears on the add/change form. Suggest a logical field grouping using `fieldsets` if not already present.
    - **7.2.2 Implement Inline Admin on User Page (`apps/accounts/admin.py`):**
        - Create `VisualizationProjectInline(admin.TabularInline)` for `VisualizationProject`. Set `model`, `fk_name='owner'`, show limited `fields` (e.g., 'title', 'project_type', 'is_public'), set `extra=1`.
        - Create `CustomUserAdmin(UserAdmin)` inheriting from `UserAdmin`. Add `inlines = [VisualizationProjectInline]`.
        - Unregister default `User` admin and re-register with `CustomUserAdmin`.
    - **7.2.3 Verification:** Log in to admin. Verify `owner` field on Project form. Go to a User's change page. Verify the inline section for managing their projects appears and works.

- [X] **7.3 Refine Template Structure with Partials:**
    *   **7.3.1 Create Partials Directory:** Create `templates/partials/` if it doesn't exist.
    *   **7.3.2 Extract Header/Footer:** Move `<header>...</header>` and `<footer>...</footer>` content from @file:templates/base.html into `templates/partials/_header.html` and `templates/partials/_footer.html`.
    *   **7.3.3 Include Partials:** Replace extracted content in @file:templates/base.html with `{% include 'partials/_header.html' %}` and `{% include 'partials/_footer.html' %}`.
    *   **7.3.4 Verification:** Run dev server. Check multiple pages (homepage, list pages, login, profile) render correctly with header/footer included via partials.

- [X] **7.4 Review & Document Final Project Structure:**
    - **7.4.1 Review Root & Apps:** Briefly review root file locations and `apps/` structure. Confirm no further changes needed based on previous reviews (Tasks 7.1-7.2 of Option B are implicitly covered here).
    - **7.4.2 Document Structure (`README.md` & Memory Bank):**
        - Update @file:README.md "Project Structure" section reflecting final layout (`apps/`, `config/`, `templates/` including `partials/`, `static/`, `memory-bank/`).
        - Update @file:memory-bank/system_patterns.md detailing the structure rules for apps, templates (incl. partials), static files, config, memory, rules.
- [X] **7.5 Document Core Conventions & URL Strategy:**
    - **7.5.1 Update `README.md`:** Summarize key Naming Conventions, View Patterns (CBV preference), Version Control format. Add section on URL Strategy: "Always use named URL patterns and the `{% url %}` tag / `reverse()` function."
    - **7.5.2 Update Memory Bank:** Ensure `system_patterns.md` and `tech_context.md` accurately reflect these conventions (PEP8, CBVs, named URLs, commit format).
    - **7.5.3 Update Rules:** Add/verify rule in @file:.cursor/rules/backend/django_rules.mdc enforcing named URLs. Add/verify rule in @file:.cursor/rules/frontend/01_layout_styling_base.mdc about using partials for repeated sections like header/footer.
- [X] **7.6 Final Documentation & Memory Update:**
    - **7.6.1 Update `active_context.md`:** Set status: "Completed Phase 7 (User Content Flow, Admin/Template Refinement, Docs). Ready for Phase 8 (Dynamic Content/Styling)." Set Next Step to 8.1.1.
    - **7.6.2 Update `progress.md`:** Add entry: "Phase 7: Implemented dynamic user content display. Enhanced User admin with inline projects. Refined template structure with partials. Documented final structure and conventions."
- [X] **7.7 Version Control Checkpoint:** Stage all changes (views, admin, templates, docs, memory files, rules). Generate comprehensive commit message (e.g., "feat: Implement user content flow, enhance admin, refactor templates & update docs"). Await confirmation to commit.

---

**Phase 8: Dynamic Content Display & Styling Refinement**

*AI Assistant Guidance: This phase connects the database models to the frontend templates to display dynamic content, implements pagination, and applies more specific styling based on the chosen framework (Tailwind CSS) and design blueprints.*

- [X] **8.1 Implement Dynamic Data in List Views:**
    - **8.1.1 Modify List Views:** Update the list views (`ScanListView`, `VideoListView`, `StillListView` in `apps/core/views.py`) to:
        - Query the `VisualizationProject` model, filtering by the correct `project_type` *and* `is_public=True` (for public-facing lists).
        - Pass the queryset of projects to the template context (e.g., `context['projects'] = projects`).
    - **8.1.2 Update Base List Template:** Modify `templates/core/_project_list_base.html` to loop through the `projects` context variable (e.g., `{% for project in projects %}`). Inside the loop, include the project card partial. Add handling for when the list is empty (e.g., `{% empty %}`).
    - **8.1.3 Update Card Partial:** Modify `templates/core/_project_card.html` to display dynamic data from each `project` object:
        - `project.title`
        - `project.description` (perhaps truncated)
        - Conditionally display either `project.image` (using `{{ project.image.url }}` within an `<img>` tag) or `project.embed_code` (using `{{ project.embed_code|safe }}`).
        - Potentially add a link to a future detail page (use placeholder `#` for now).
- [X] **8.2 Implement Pagination:**
    - **8.2.1 Update Base List View:** Modify `BaseProjectListView` in `apps/core/views.py` to inherit from Django's `ListView` and set `paginate_by = 12` (or a suitable number).
    - **8.2.2 Add Pagination Controls Template:** Create a new template partial `templates/partials/_pagination.html`. Implement standard pagination controls using Django's `page_obj` context variable (e.g., links for previous/next page, page numbers).
    - **8.2.3 Include Pagination in List Template:** Include the pagination partial in `templates/core/_project_list_base.html`.
- [X] **8.3 Refine Tailwind CSS Styling:**
    - **8.3.1 Apply Base Styles:** Enhance `templates/base.html` using Tailwind classes for basic typography (apply font family, base size/leading from design blueprints/rules), background colors, and overall layout spacing (container, margins). Reference @file:.cursor/rules/frontend/01_layout_styling_base.mdc.
    - **8.3.2 Style Header & Footer:** Apply Tailwind classes to `templates/base.html` (or dedicated partials if created) for header/footer layout, navigation links, and appearance.
    - **8.3.3 Style List/Card:** Apply Tailwind classes to `_project_list_base.html` and `_project_card.html` to create the desired grid layout (e.g., `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`), card appearance (borders, shadows, padding), image/embed styling, and text styling. Aim for consistency with design blueprints (`Markdown_Layout_*.txt`).
    - **8.3.4 Refine Tailwind Rules:** Update @file:.cursor/rules/frontend/03_tailwind_config.mdc with specific conventions used (e.g., preferred spacing scale, color palette names from `tailwind.config.js`, common component patterns).
- [X] **8.4 Verification:**
    - **8.4.1 Add Test Data:** Ensure several `VisualizationProject` entries (with different types, some with images, some with embeds) exist via the Django Admin. Include both public and private projects.
    - **8.4.2 Check List Pages:** Access `/scans/`, `/videos/`, `/images/`. Verify:
        - Only public projects of the correct type are displayed.
        - Project titles, descriptions, images/embeds are shown dynamically.
        - Pagination controls appear and function correctly if more projects exist than `paginate_by`.
        - Basic Tailwind styling is applied to layout, cards, typography.
    - **8.4.3 Responsiveness Check:** Briefly check list pages on different screen sizes (using browser dev tools) to ensure basic responsiveness from Tailwind classes.
    - **8.4.4 Report:** Confirm functionality and report any styling/data display issues.
- [X] **8.5 Version Control Checkpoint:** Stage all changes (views, templates, static files, rule updates). Generate commit message (e.g., "feat: Implement dynamic content display in list views with pagination and initial Tailwind styling"). Await confirmation to commit.

---

**Phase 9: Implement Blog/News Section**

*AI Assistant Guidance: This phase focuses on adding a blog/news section to the site. Create a dedicated Django app, define the necessary model, set up admin management, implement list and detail views/templates, and integrate the latest posts onto the homepage. Ensure the structure supports potential future AI content generation.*

- [X] **9.1 Create `news` App (Renamed from Blog):**
    - [X] **9.1.1 Scaffold App:** Create `apps/news`.
    - [X] **9.1.2 Register App:** Add `'apps.news.apps.NewsConfig'` to `INSTALLED_APPS`.
    - [X] **9.1.3 Basic Files:** Verify standard app files.
- [X] **9.2 Define `NewsPost` Model (`apps/news/models.py`):**
    - [X] **9.2.1 Create Model:** Define fields (`title`, `slug`, `content`, `status`, `published_at`, etc.).
    - [X] **9.2.2 Add Meta Options:** Add ordering.
    - [X] **9.2.3 String Representation:** Implement `__str__`.
    - [X] **9.2.4 Slug & Publish Date Logic:** Override `save` method.
    - [X] **9.2.5 Add Featured Image Field:** Add `ImageField` for featured image.
- [X] **9.3 Database Migrations for News:**
    - [X] **9.3.1 Make Migrations:** Run `makemigrations news`.
    - [X] **9.3.2 Migrate:** Run `migrate`.
- [X] **9.4 Configure News Admin (`apps/news/admin.py`):**
    - [X] **9.4.1 Import & Register:** Import `NewsPost`.
    - [X] **9.4.2 Create `NewsPostAdmin`:** Define `ModelAdmin` with display/filter/search/etc.
    - [X] **9.4.3 Integrate CKEditor 5:** Ensure `content` field uses CKEditor widget.
    - [X] **9.4.4 Verification:** Verify admin functionality.
- [X] **9.5 Implement News Views (`apps/news/views.py`):**
    - [X] **9.5.1 News List View:** Create `NewsListView` (published posts only, pagination).
    - [X] **9.5.2 News Detail View:** Create `NewsDetailView` (published posts only, slug lookup).
- [X] **9.6 Implement News URLs (`apps/news/urls.py` & `config/urls.py`):**
    - [X] **9.6.1 Create App URLs:** Define `list` and `detail` patterns.
    - [X] **9.6.2 Include App URLs:** Add `news` app URLs to main `config/urls.py`.
- [X] **9.7 Create News Templates (`templates/news/`):**
    - [X] **9.7.1 Create News List Template:** Create `news_list.html` (extends base, loops posts, includes card, includes pagination).
    - [X] **9.7.2 Create News Card Partial:** Create `_news_card.html` (displays title link, date, image, excerpt).
    - [X] **9.7.3 Create News Detail Template:** Create `news_detail.html` (extends base, displays full content with image).
- [X] **9.8 Integrate Latest Posts on Homepage:**
    - [X] **9.8.1 Modify `HomePageView`:** Add query for latest published posts.
    - [X] **9.8.2 Update Homepage Template:** Add "Latest News" section, loop through posts, include card partial, link to list.
- [X] **9.9 Create News Rules:**
    - [X] **9.9.1 Create Rule File:** Create `.cursor/rules/apps/news_rules.mdc`.
    - [X] **9.9.2 Populate Rules:** Define news app conventions.
- [X] **9.10 Verification:**
    - [X] **9.10.1 Add Test Posts:** Create draft/published posts via admin.
    - [X] **9.10.2 Check News List Page:** Verify filtering, ordering, pagination, links.
    - [X] **9.10.3 Check News Detail Page:** Verify content display, draft post 404.
    - [X] **9.10.4 Check Homepage Integration:** Verify latest posts display.
    - [X] **9.10.5 Report:** Confirm functionality.
- [X] **9.11 Documentation & Memory Update:**
    - [X] **9.11.1 Update `README.md`:** Add news feature description.
    - [X] **9.11.2 Update Memory Bank:** Add news app details to relevant files.
- [X] **9.12 Version Control Checkpoint:** Stage and commit Phase 9 changes.

---

**Phase 10: Implement API for External AI News Writer**

*AI Assistant Guidance: This phase implements a secure REST API endpoint using Django REST Framework (DRF) to allow an authorized external AI agent to submit news articles as drafts for review. Focus on security, validation, and providing feedback to the agent.*

- [X] **10.1 Install Dependencies & Configure Settings:**
    - **10.1.1 Install DRF & Supporting Libraries:** Using the terminal (in `.venv`), install required packages:
        ```bash
        pip install djangorestframework djangorestframework-simplejwt django-ratelimit Pillow
        ```
        *(Confirm Pillow is installed if not already from previous phases).*
    - **10.1.2 Update `requirements.txt`:** Run `pip freeze > requirements.txt`.
    - **10.1.3 Add to `INSTALLED_APPS`:** In `config/settings.py`, add `'rest_framework'`, `'rest_framework_simplejwt'`, and `'ratelimit'` to `INSTALLED_APPS`.
    - **10.1.4 Configure DRF Settings:** In `config/settings.py`, add a `REST_FRAMEWORK` dictionary:
        ```python
        REST_FRAMEWORK = {
            'DEFAULT_AUTHENTICATION_CLASSES': [
                'rest_framework_simplejwt.authentication.JWTAuthentication',
                # Add SessionAuthentication if admin/browser access needed later
            ],
            'DEFAULT_PERMISSION_CLASSES': [
                'rest_framework.permissions.IsAuthenticated', # Base permission
            ],
            'DEFAULT_THROTTLE_CLASSES': [
                'rest_framework.throttling.AnonRateThrottle',
                'rest_framework.throttling.UserRateThrottle'
            ],
            'DEFAULT_THROTTLE_RATES': {
                'anon': '100/day', # Example rate limit for anonymous users (if applicable)
                'user': '1000/day' # Example rate limit for authenticated users
            },
             'DEFAULT_PARSER_CLASSES': [ # Ensure parsers for different data types
                'rest_framework.parsers.JSONParser',
                'rest_framework.parsers.FormParser',
                'rest_framework.parsers.MultiPartParser' # Needed for file uploads
            ]
        }
        ```
        *(AI: Adjust throttle rates as appropriate, potentially define custom rates later).*
    - **10.1.5 Configure JWT Settings:** Add `SIMPLE_JWT` settings (e.g., token lifetimes) if using JWT. Consult DRF Simple JWT docs.
    - **10.1.6 Configure Rate Limit:** Consult `django-ratelimit` docs for basic setup if needed (often works out-of-the-box with DRF integration).
    - **10.1.7 Run Migrations:** Run `python manage.py migrate` (for JWT/Token auth tables). Verify success.

- [X] **10.2 Enhance `NewsArticle` Model (`apps/news/models.py`):**
    - **10.2.1 Add Status Choices & Field:** Ensure the `status` field exists with choices like `DRAFT`, `PENDING_REVIEW`, `PUBLISHED`, `REJECTED` (defaulting to `DRAFT` or `PENDING_REVIEW` for API submissions).
    - [ ] **10.2.2 Add Metadata/Feedback Fields:** Add optional fields:
        - `rejection_reason` (TextField, blank=True, null=True)
        - `ai_metadata` (JSONField, blank=True, null=True, help_text="Store AI agent parameters/info.")
    - **10.2.3 Run Migrations:** Run `python manage.py makemigrations news` and `python manage.py migrate`. Verify success.

- [X] **10.3 Set Up AI Agent Authentication & Permissions:**
    - **10.3.1 Create Agent User:** Via Django Admin (`/admin/auth/user/add/`), create a dedicated user account for the AI agent (e.g., username `ai_news_agent`). Ensure it's active but **NOT** staff/superuser unless absolutely required for other reasons.
    - **10.3.2 Create Agent Group (Recommended):** Via Admin (`/admin/auth/group/add/`), create a group named `AI Agents`. Assign the `ai_news_agent` user to this group.
    - **10.3.3 Assign Permissions:** Via Admin (`/admin/auth/group/` -> `AI Agents`), assign the necessary permission for the agent to *add* news articles (`news | news article | Can add news article`). Do *not* grant change or delete permissions via the API initially.
    - **10.3.4 Generate Agent Token:** Generate an API token (either DRF Simple JWT refresh/access tokens or DRF `Token` if using `TokenAuthentication`) associated with the `ai_news_agent` user. This token must be securely stored and provided to the external AI agent. **Do NOT store this token in Git.** Document the process in @file:memory-bank/tech_context.md.
    - **10.3.5 Create Custom Permission Class:** Create `apps/news/permissions.py`. Define `IsNewsAgent(permissions.BasePermission)` that checks if `request.user.groups.filter(name='AI Agents').exists()`.

- [X] **10.4 Implement API Endpoint:**
    - **10.4.1 Create API URLs:** Create `apps/news/api_urls.py`. Define a URL pattern for `POST` requests to `/posts/` mapping to an API view (e.g., `NewsArticleCreateAPIView`), name=`create_post`.
    - **10.4.2 Include API URLs:** In `config/urls.py`, include the news API urls under `/api/v1/`: `path('api/v1/news/', include('apps.news.api_urls')),`.
    - **10.4.3 Create API Serializer (`apps/news/serializers.py`):**
        - Define `NewsArticleSerializer(serializers.ModelSerializer)`.
        - `class Meta`: model=`NewsArticle`, fields=`['title', 'content', 'category', 'featured_image', 'ai_metadata']`. *(Explicitly list fields agent can submit. Exclude status, author, published_at, rejection_reason).*
        - Add validation logic (`validate_title`, `validate_content`) for length or basic checks, returning descriptive `ValidationError` messages upon failure.
    - **10.4.4 Create API View (`apps/news/api_views.py`):**
        - Create `NewsArticleCreateAPIView(generics.CreateAPIView)`.
        - `serializer_class = NewsArticleSerializer`
        - `authentication_classes = [JWTAuthentication]` (or `TokenAuthentication`)
        - `permission_classes = [permissions.IsAuthenticated, IsNewsAgent]`
        - `throttle_classes = [...]` (Reference DRF settings or define specific)
        - `parser_classes = [MultiPartParser, FormParser, JSONParser]`
        - Override `perform_create(self, serializer)` to set `author=self.request.user` and `status='DRAFT'` (or `PENDING_REVIEW`).

- [X] **10.5 Configure Admin for Review Workflow:**
    - **10.5.1 Update `NewsArticleAdmin` (`apps/news/admin.py`):**
        - Ensure `status` is in `list_display` and `list_filter`.
        - Make `status` and `rejection_reason` editable fields (in `fields` or `fieldsets`).
        - Add custom admin actions: `publish_selected`, `reject_selected` (potentially with input for reason), `mark_pending_review`. Implement the logic for these actions to update the queryset status.

- [X] **10.6 Verification & API Testing:**
    - **10.6.1 API Client Setup:** Use a tool like `curl`, Postman, or Python `requests` to simulate the AI agent. Obtain the generated agent token.
    - **10.6.2 Test Authentication:** Attempt API calls with no token, invalid token, and valid token. Verify `401 Unauthorized`. Attempt call with a token from a non-agent user. Verify `403 Forbidden`.
    - **10.6.3 Test Validation:** Send requests with invalid data (e.g., missing title, too long content). Verify `400 Bad Request` and check error messages.
    - **10.6.4 Test Success Case:** Send a valid `POST` request with title, content, and optionally an image using `multipart/form-data`. Verify `201 Created` response and check the response body contains the created article data.
    - **10.6.5 Verify DB & Admin:** Check the database/admin to confirm the new article was created with `status='DRAFT'` (or `PENDING_REVIEW`) and assigned to the agent user as the author. Verify the image was uploaded correctly to the `media/` directory.
    - **10.6.6 Test Admin Workflow:** Use the admin actions (publish, reject) on the newly created post and verify the status changes correctly.

- [X] **10.7 Documentation & Memory Update:**
    - **10.7.1 API Documentation:** Create a new file (e.g., `docs/api_integration.md`) detailing how the external AI agent should authenticate and interact with the `/api/v1/news/posts/` endpoint (request format, fields, auth, responses). Reference this doc in the @file:README.md.
    - **10.7.2 Update Memory Bank:** Update `system_patterns.md` (API structure, DRF usage, auth method), `tech_context.md` (DRF, JWT/Token auth, ratelimit library), `progress.md`, `active_context.md`.
    - **10.7.3 Update Rules:** Create a rule file `.cursor/rules/api/drf_api_rules.mdc` with guidelines for DRF API development (serializers, views, permissions, authentication). Update `news_rules.mdc` to reference the API endpoint.

- [X] **10.8 Version Control Checkpoint:** Stage all changes (DRF config, model updates, serializers, views, urls, permissions, admin actions, tests (if written), docs, memory). Generate commit message (e.g., "feat(api): Implement DRF API endpoint for AI news article submission with review workflow"). Await confirmation to commit.

---

**Phase 11: Operationalize External Article API with JWT Auth & Security**

*AI Assistant Guidance: Finalize the setup for the external AI agent API. This includes creating the agent's user/group, assigning precise permissions, implementing and configuring JWT token endpoints, applying rate limiting, performing comprehensive API tests, and updating all documentation.*

- [X] **11.1 Create Dedicated AI Agent User & Group:**
    - **11.1.1 Create Agent User:** Via Admin (`/admin/auth/user/add/`), create user `ai_news_agent`. Ensure it's **active** but **NOT marked as staff or superuser** (principle of least privilege). Set a strong, unique password (even if only used initially for token generation).
    - **11.1.2 Create Agent Group:** Via Admin (`/admin/auth/group/add/`), create group `AI Agents`.
    - **11.1.3 Assign User to Group:** Add `ai_news_agent` user to the `AI Agents` group via the user's admin page.

- [X] **11.2 Assign API Permissions to Agent Group:**
    - **11.2.1 Assign Permission:** Via Admin (`/admin/auth/group/` -> `AI Agents`), assign *only* the `news | news article | Can add news article` permission. Verify no other unnecessary permissions are granted.

- [X] **11.3 Implement & Configure JWT Token Authentication:**
    - **11.3.1 Configure Simple JWT:** In `config/settings.py`:
        - Ensure `rest_framework_simplejwt.authentication.JWTAuthentication` is listed (ideally as the primary or only method) in `REST_FRAMEWORK['DEFAULT_AUTHENTICATION_CLASSES']`.
        - Add/Configure the `SIMPLE_JWT` dictionary. Define reasonable lifetimes for access and refresh tokens (e.g., access=15 minutes, refresh=1 day). Consider loading lifetimes from environment variables for flexibility. Example:
          ```python
          from datetime import timedelta
          SIMPLE_JWT = {
              'ACCESS_TOKEN_LIFETIME': timedelta(minutes=15),
              'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
              # ... other settings as needed
          }
          ```
    - **11.3.2 Create Account API URLs:** Ensure `apps/accounts/api_urls.py` exists and contains URL patterns for `TokenObtainPairView` (`token/`) and `TokenRefreshView` (`token/refresh/`).
    - **11.3.3 Include Account API URLs:** Ensure `config/urls.py` includes these under `/api/v1/accounts/`.
    - **11.3.4 Verify Token Endpoints:** Run dev server. Test accessing `/api/v1/accounts/token/` and `/api/v1/accounts/token/refresh/` (they should respond, likely requiring POST).

- [X] **11.4 Implement and Apply Custom API Permissions & Rate Limiting:**
    - **11.4.1 Define Permission Class:** Ensure `apps/news/permissions.py` contains `IsNewsAgent` checking group membership.
    - **11.4.2 Apply Permissions to View:** In `apps/news/api_views.py`, confirm `NewsArticleCreateAPIView` has `permission_classes = [permissions.IsAuthenticated, IsNewsAgent]`. Ensure necessary imports are present.
    - **11.4.3 Apply Rate Limiting:** Apply `django-ratelimit` specifically to the `NewsArticleCreateAPIView`. This can be done using decorators in `apps/news/api_views.py` or globally via `REST_FRAMEWORK` settings if preferred. Example using decorator:
        ```python
        from ratelimit.decorators import ratelimit
        # ... other imports ...

        class NewsArticleCreateAPIView(generics.CreateAPIView):
            # ... serializer, auth, permissions ...
            @method_decorator(ratelimit(key='user', rate='100/h', block=True), name='dispatch') # Example: 100 posts per hour per user
            def dispatch(self, *args, **kwargs):
                return super().dispatch(*args, **kwargs)
            # ... perform_create ...
        ```
        *(AI: Adjust the rate limit key and rate (e.g., '100/h') as appropriate for the agent's expected usage).*

- [X] **11.5 Comprehensive API Testing:**
    *AI Note: Use an API client (like curl/Postman) and the agent's credentials/token for these tests.*
    - **11.5.1 Test Token Generation:** `POST` credentials for `ai_news_agent` to `/api/v1/accounts/token/`. Verify success (200 OK) and reception of `access` and `refresh` tokens. Test with incorrect password (expect 401). Securely note the obtained tokens for subsequent tests (do NOT commit them).
    - **11.5.2 Test Token Refresh:** Use the obtained refresh token to `POST` to `/api/v1/accounts/token/refresh/`. Verify success (200 OK) and reception of a new `access` token.
    - **11.5.3 Test Endpoint Auth & Permissions:** Attempt `POST` to `/api/v1/news/posts/`:
        - With no `Authorization` header (expect 401).
        - With invalid/expired `Authorization: Bearer <token>` (expect 401).
        - With valid token from a user *not* in `AI Agents` group (expect 403 Forbidden).
    - **11.5.4 Test Data Validation:** Using the agent's valid token, send `POST` requests with missing `title`, overly long `content`, etc. Verify `400 Bad Request` responses contain clear error messages indicating the specific field issue.
    - **11.5.5 Test Rate Limiting:** Using the agent's valid token, send rapid, repeated valid `POST` requests. Verify that after exceeding the configured rate limit (e.g., 100/h), subsequent requests receive a `429 Too Many Requests` response.
    - **11.5.6 Test Success (JSON):** Using agent's valid token (under the rate limit), send `POST` with valid JSON data. Verify `201 Created`, check response body. Verify DB/Admin shows new article with `status='DRAFT'` (or `PENDING_REVIEW`) and `author=ai_news_agent`.
    - **11.5.7 Test Success (Image Upload):** Using agent's valid token, send `POST` with `multipart/form-data` including an image file. Verify `201 Created`. Verify image uploaded to `media/`.

- [X] **11.6 Update Documentation & Memory:**
    - **11.6.1 Update API Docs (`docs/api_integration.md`):** Finalize documentation covering: Authentication (JWT token obtain/refresh endpoints, header format), Permission requirements (user in `AI Agents` group), Endpoint details (`POST /api/v1/news/posts/`), Rate Limits, Data Format (JSON/Multipart), Required/Optional Fields, Success/Error Responses.
    - **11.6.2 Update Memory Bank:** Update `progress.md` ("Phase 11: Operationalized API..."), `active_context.md` (Ready for next phase), `tech_context.md` (JWT, SimpleJWT, django-ratelimit), `system_patterns.md` (API security patterns).

- [X] **11.7 Version Control Checkpoint:** Stage all changes. Generate commit message (e.g., "feat(api): Operationalize news API with JWT auth, permissions, rate limiting, and tests"). Await confirmation to commit.

---

**Phase 12 (Revised): Implement Content-Centric Admin Interface with Filters**

*AI Assistant Guidance: Restructure the Admin for intuitive content management. Separate Public Portfolio items by type using Proxy Models & custom managers. Implement a standard admin view for Client Deliverables enhanced with custom filters for easy client-based viewing. Use Group membership to designate clients.*

- [X] **12.1 Define/Confirm Content Models (`apps/core/models.py`):**
    *   [X] **12.1.1 Confirm `PublicPortfolioItem`:** Ensure fields are correct (`title`, `description`, `project_type` [choices], `embed_code`, `image`, `slug`, timestamps). Add `db_index=True` to `project_type`.
    *   [X] **12.1.2 Confirm `ClientDeliverable`:** Ensure fields are correct (`client` [ForeignKey to User, `related_name='deliverables'`, `db_index=True`], `title`, `description`, `project_type` [choices], `embed_code`, `image`, timestamps).

- [X] **12.2 Create Proxy Models & Managers for Public Portfolio (`apps/core/models.py`):**
    *   [X] **12.2.1 Define Custom Managers:** Create managers filtering by type (`PublicScanManager`, `PublicVideoManager`, `PublicStillManager`).
    *   [X] **12.2.2 Define Proxy Models:** Create `PublicScanItem`, `PublicVideoItem`, `PublicStillItem` inheriting `PublicPortfolioItem`, set `Meta.proxy = True`, assign respective custom manager, set appropriate `verbose_name_plural`.
    *   [X] **12.2.3 Run Migrations:** `makemigrations` / `migrate` (applied proxy model migration).

- [X] **12.3 Configure Admin for Public Portfolio (Proxy Models) (`apps/core/admin.py`):**
    *   [X] **12.3.1 Create Base Admin:** `PublicPortfolioItemAdmin` (not registered).
    *   [X] **12.3.2 Register Proxy Model Admins:** Create and register admin classes inheriting from base admin.
    *   [X] **12.3.3 Verification:** Checked admin sidebar and list filtering.

- [X] **12.4 Configure Client Designation via Group:**
    *   [X] **12.4.1 Create Group:** Created 'Active Clients' group (Manual).
    *   [X] **12.4.2 Assign Test Users:** Added users to group (Manual).
    *   [X] **12.4.3 Document:** Noted group usage.

- [X] **12.5 Implement Enhanced Admin for Client Deliverables (`apps/core/admin.py`, `apps/accounts/admin.py`, `apps/accounts/models.py`):**
    *   [X] **12.5.1 Create Custom Filter:** Implemented `ClientFilter` using 'Active Clients' group.
    *   [X] **12.5.2 Create & Register `ClientDeliverableAdmin`:** Defined admin logic in `core.admin`, created proxy model `ClientDeliverableAdminView` in `accounts.models`, registered proxy using core admin logic in `accounts.admin`.
    *   [X] **12.5.3 Refine AppConfig Names:** Set user-friendly `verbose_name` in `AppConfig` classes.

- [X] **12.6 Remove Inline Admin from User Page (`apps/accounts/admin.py`):**
    *   [X] **12.6.1 Remove Inline:** Removed `inlines` from `CustomUserAdmin`.
    *   [X] **12.6.2 Verification:** Confirmed inline section removed from User admin page.

- [X] **12.7 Update Rules & Documentation:**
    *   [X] **12.7.1 Update Rules:** Updated `django_rules.mdc`.
    *   [X] **12.7.2 Update `README.md`:** Updated Features & added Admin Workflow.
    *   [X] **12.7.3 Update Memory Bank:** Updated `system_patterns.md`, `tech_context.md`, `progress.md`, `active_context.md`.

- [X] **12.8 Verification (Comprehensive):**
    *   [X] **12.8.1 Public Admin:** Verified type-specific sections & add forms.
    *   [X] **12.8.2 Client Deliverable Admin:** Verified custom filter, add/edit workflow.
    *   [X] **12.8.3 Frontend Checks:** Verified public pages, client pages, data isolation, and "My Page" link.

- [X] **12.9 Version Control Checkpoint:** Staged changes and committed `3f20b74`.

---

**Phase 13: Implement Comprehensive Content Preview System**

*AI Assistant Guidance: Implement a session-based preview system allowing administrators/staff to view draft/unpublished content across the entire site (public portfolio, news, client pages) as it would appear live. Enhance content models with status fields and create admin controls for managing preview mode.*

- [X] **13.1 Enhance Models with Status Fields:**
    *   **13.1.1 `PublicPortfolioItem` (`apps/core/models.py`):** Add `status` field: `models.CharField(max_length=10, choices=[('draft', 'Draft'), ('published', 'Published')], default='draft', db_index=True)`.
    *   **13.1.2 `ClientDeliverable` (`apps/core/models.py`):** Add `status` field: `models.CharField(max_length=20, choices=[('draft', 'Draft'), ('client_review', 'Pending Client Review'), ('approved', 'Approved')], default='draft', db_index=True)`. *(Refined choices for client workflow)*.
    *   **13.1.3 `NewsArticle` (`apps/news/models.py`):** Ensure `status` field exists with choices `draft`, `published` (and potentially `pending_review`, `rejected` as defined in Phase 10). Ensure `db_index=True`.
    *   **13.1.4 Run Migrations:** `python manage.py makemigrations core news` and `python manage.py migrate`. Verify success.

- [X] **13.2 Implement Preview Middleware (`apps/core/middleware.py`):**
    *   **13.2.1 Create/Update Middleware:** Ensure `PreviewModeMiddleware` exists. Logic:
        - Get `preview_mode_active = request.session.get('preview_mode_active', False)`
        - Get `preview_target_user_id = request.session.get('preview_target_user_id', None)`
        - Set `request.is_preview = False` and `request.preview_user = None` initially.
        - If `request.user.is_authenticated` and `request.user.is_staff` and `preview_mode_active`:
            - Set `request.is_preview = True`.
            - If `preview_target_user_id`: try to fetch the target `User` object and set `request.preview_user = target_user`. Handle potential `User.DoesNotExist`.
    *   **13.2.2 Register Middleware:** Ensure it's correctly placed in `settings.py` `MIDDLEWARE` list (after auth/session).

- [X] **13.3 Update Admin Interface:**
    *   **13.3.1 Add Status to Admins:** Update `PublicPortfolioItemAdmin`, `ClientDeliverableInline`, and `NewsArticleAdmin` to include the `status` field in `list_display`, `list_filter`, and make it editable in `fieldsets`/`fields`.
    *   **13.3.2 Add Item Preview Links:** Ensure admin classes for `PublicPortfolioItem`, `ClientDeliverable` (via UserAdmin inline), and `NewsArticle` include a method/field providing a "View on Site" or "Preview" link using `get_absolute_url`. *(These links will work in preview mode based on the session)*.

- [X] **13.4 Update View Logic for Preview Awareness:**
    *   **13.4.1 Public List Views (`apps/core/views.py` - Scans/Videos/Stills):** Modify `get_queryset`:
        - If `self.request.is_preview`: return `PublicPortfolioItem.objects.filter(project_type=...)` including `status='draft'` or `'published'`.
        - Else: return only `status='published'`.
    *   **13.4.2 News Views (`apps/news/views.py`):** Modify `NewsListView` and `NewsDetailView` `get_queryset` (or `get_object`):
        - If `self.request.is_preview`: query includes `draft`, `pending_review`, `published` statuses.
        - Else: query only `published` status.
        - Detail view must check status *after* fetching by slug and apply staff check for non-published items if *not* in preview mode.
    *   **13.4.3 User Page View (`apps/accounts/views.py` - `UserPageView`):** Modify `get_context_data`:
        - Fetch the `target_user`.
        - If `self.request.is_preview` AND (`self.request.preview_user == target_user` OR `self.request.preview_user is None`): *(Show drafts if in general preview or specifically previewing this user)*
            - Query `ClientDeliverable.objects.filter(client=target_user)` showing all statuses (draft, review, approved).
        - Else (Live mode for client OR Admin not previewing this specific client):
            - Query `ClientDeliverable.objects.filter(client=target_user, status='approved')` (or relevant 'live' status).
        - Pass `client_deliverables` and `target_user` to context.

- [X] **13.5 Implement Admin Preview Controls:**
    *   **13.5.1 Create Preview Control URLs:** Add URLs in `config/urls.py` (or `core/urls.py`) under `/admin/preview/` (ensure these require admin login):
        - `/toggle/` (name: `preview_toggle`)
        - `/set-client/<int:user_id>/` (name: `preview_set_client`)
        - `/clear-client/` (name: `preview_clear_client`)
    *   **13.5.2 Create Preview Control Views (`apps/core/views.py`):** Create simple FBVs decorated with `@staff_member_required`:
        - `toggle_preview_mode(request)`: Flips `request.session['preview_mode_active']`. Clears `preview_target_user_id` when turning off. Redirects back.
        - `set_preview_client(request, user_id)`: Sets `request.session['preview_target_user_id'] = user_id`. Sets `preview_mode_active = True`. Redirects back or to user page.
        - `clear_preview_client(request)`: Deletes `preview_target_user_id` from session. Redirects back.
    *   **13.5.3 Add Controls to Admin UI:** Modify `templates/admin/base_site.html` override:
        - Add a clear "Preview Mode" section/button.
        - Display current status: "Preview Mode: [ON/OFF]".
        - Add link using `{% url 'preview_toggle' %}` to toggle the mode.
        - If preview is ON, display "Previewing as: [Admin View / Client: username]".
        - Add a link `{% url 'preview_clear_client' %}` if a client is being previewed.
    *   **13.5.4 Add "Preview As Client" to User Admin:** Modify `CustomUserAdmin` (`apps/accounts/admin.py`):
        - Add a method to display a "Preview This Client's Page" link in `list_display` or change form `readonly_fields`.
        - The link should point to `{% url 'preview_set_client' user.id %}`.

- [X] **13.6 Implement Frontend Preview Indicator:**
    - **13.6.1 Create Context Processor (`apps/core/context_processors.py`):** Create a processor `preview_context` that adds `is_preview_mode = request.session.get('preview_mode_active', False)` and `preview_target_client_username = User.objects.get(id=request.session['preview_target_user_id']).username` (if ID exists) to the template context for *all* requests. Add this processor to `TEMPLATES['OPTIONS']['context_processors']` in settings.
    - **13.6.2 Add Indicator to `base.html`:** In @file:templates/base.html, add a conditional block (e.g., using `{% if user.is_staff and is_preview_mode %}`):
        - Display a prominent banner/bar (e.g., fixed top/bottom).
        - Text: "PREVIEW MODE ACTIVE [Previewing as Client: {{ preview_target_client_username }}]".
        - Include an "Exit Preview Mode" link (`{% url 'preview_toggle' %}`).

- [X] **13.7 Verification:**
    - **13.7.1 Admin Controls:** Test toggling preview mode on/off via admin header. Test setting/clearing specific client preview via User admin.
    - **13.7.2 Frontend Indicator:** Verify the preview banner appears/disappears correctly on frontend pages when toggling mode as admin. Verify client name shows when previewing specific client. Verify non-staff never see the banner.
    - **13.7.3 Draft Content Preview (Public):** Create draft `NewsArticle` & `PublicPortfolioItem`. Verify they appear on list/detail pages *only* when admin has preview mode ON. Verify object-level preview links from admin work.
    - **13.7.4 Draft Content Preview (Client):** Create draft `ClientDeliverable` for `test01`.
        - As admin with preview ON (general): Visit `/accounts/user/test01/`. Verify draft appears.
        - As admin, click "Preview This Client's Page" for `test01`. Verify draft appears and banner indicates previewing as `test01`.
        - As admin with preview ON but previewing *client02*: Visit `/accounts/user/test01/`. Verify draft *still* appears (or decide if admin general preview should override specific client preview - adjust logic in 13.4.3 if needed). *Let's default to: general preview shows all drafts*.
        - As `test01` user (preview OFF): Verify draft does *not* appear.
    - **13.7.5 Live Site Check:** Ensure non-staff/anonymous users *only* ever see published/approved content.

- [X] **13.8 Documentation & Memory Update:**
    - **13.8.1 Update `README.md`/Docs:** Explain the comprehensive preview system (toggling via admin, previewing client pages, frontend indicator).
    - **13.8.2 Update Rules:** Add rules regarding `request.is_preview`, context processor, status field usage in queries.
    - **13.8.3 Update Memory Bank:** Detail the preview system in `system_patterns.md`. Update `progress.md`, `active_context.md`.

- [X] **13.9 Version Control Checkpoint:** Stage changes. Generate commit message (e.g., "feat: Implement comprehensive session-based content preview system"). Await confirmation to commit.

---

**Phase 14: Base Layout, Structure & Global Styles Translation**

*AI Assistant Guidance: Translate the core HTML structure from the v0 output (`page.txt`, `ClientLayout.txt`) into Django templates (`base.html`, `home.html`, partials). Integrate base styles and CSS variables from `globals.txt` into the Tailwind setup. Focus purely on semantic structure, layout containers, and global style integration. Responsiveness should be considered structurally (mobile-first flow).*

- [X] **14.1 Integrate Base Styles & Theme Variables (`globals.txt`):**
    *   **14.1.1 Update `input.css`:** Merge base styles (`@layer base`), CSS variable definitions (`:root`, `.dark`), and core HTML/body styles from @file:globals.txt into `static/css/input.css`. Ensure `@tailwind base/components/utilities` are present.
    *   **14.1.2 Configure Tailwind Theme:** Update `tailwind.config.js` `theme.extend.colors` to use the CSS variables (e.g., `background: 'hsl(var(--background))'`). Also map `--radius` to Tailwind's `borderRadius` theme section.
    *   **14.1.3 Build CSS & Verify:** Run Tailwind build. Check browser dev tools on homepage to confirm CSS variables are applied and base body styles are active.

- [X] **14.2 Implement Base Template Structure (`base.html`):**
    *   **14.2.1 HTML Boilerplate:** Ensure `templates/base.html` has correct HTML5 structure, `lang="en"`, essential `<meta>` tags (charset, viewport), and links the generated `output.css`. Include `scroll-smooth` class on `<html>` if desired (as per `ClientLayout.txt`).
    *   **14.2.2 Main Layout Sections:** Define the primary page structure within `<body>` using semantic tags: `<header>`, `<main>`, `<footer>`. Include the Django block tags (`{% block content %}`, `{% block scripts %}` etc.) in appropriate places.
    *   **14.2.3 Link Partials:** Include the header and footer using `{% include 'partials/_header.html' %}` and `{% include 'partials/_footer.html' %}` within `base.html`.

- [X] **14.3 Structure Header & Footer Partials (HTML Only):**
    *   **14.3.1 Header Structure (`_header.html`):** Replicate the HTML structure from the `<header>` in @file:ClientLayout.txt (outer div, max-width container, flex layout, logo link placeholder, nav placeholder, mobile button placeholder). **Apply only basic structural Tailwind classes** (e.g., `fixed`, `top-0`, `z-50`, `w-full`, `max-w-7xl`, `mx-auto`, `flex`, `justify-between`, `items-center`, padding `px-`, `py-`). Defer detailed styling.
    *   **14.3.2 Footer Structure (`_footer.html`):** Replicate the HTML structure from the `<footer>` in @file:ClientLayout.txt (outer tag, max-width container, grid layout for columns, headings, link list structure, copyright div). **Apply only basic structural Tailwind classes** (e.g., `grid`, `grid-cols-`, `gap-`, padding `px-`, `py-`, `mt-`, `pt-`). Defer detailed styling.

- [X] **14.4 Structure Homepage Sections (`home.html`):**
    *   **14.4.1 Section Containers:** In @file:templates/core/home.html (within `{% block content %}`), create the main `<section>` containers corresponding to the v0 `page.txt` structure, giving them appropriate IDs: `#hero`, `#services`, `#featured-projects`, `#client-portal`, `#news`, `#cta-banner`.
    *   **14.4.2 Basic Section Layout:** Apply basic structural Tailwind classes to each section for padding (`py-`) and potentially background placeholders (`bg-gray-100`, `bg-gray-800`, etc. - these will be refined later). Ensure content within sections uses a `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` container for consistency.
    *   **14.4.3 Add Headings:** Place placeholder `<h2>` headings within each section (e.g., "Our Services", "Latest News"). Defer styling.

- [X] **14.5 Update Frontend Rules (`01_layout_styling_base.mdc`):**
    *   **14.5.1 Add Structure Rules:** Add guidelines emphasizing the use of the defined section structure (`#hero`, `#services` etc.) on the homepage. Reinforce use of `max-w-7xl mx-auto px-` container pattern. Document base HTML/CSS variables setup. Reference @file:templates/base.html, @file:templates/partials/_header.html, @file:templates/partials/_footer.html.

- [X] **14.6 Verification:**
    *   **14.6.1 Run Server:** Start dev server.
    *   **14.6.2 Check Structure:** Inspect the rendered HTML source for `base.html` and `home.html`. Verify correct semantic tags, included partials, section containers with IDs, and basic structural Tailwind classes are present.
    *   **14.6.3 Visual Check:** The page will look unstyled but should have the basic sections laid out vertically with padding/margins. Header/footer structure should be visible. Base background/text colors from `globals.txt` should apply.

- [X] **14.7 Documentation & Memory Update:**
    *   **14.7.1 Update `README.md`/Docs:** Add section detailing the core HTML structure (`base.html`, partials, homepage sections) and the integration of global styles.
    *   **14.7.2 Update Memory Bank:** Update `system_patterns.md` (document base layout, partials usage, section IDs), `tech_context.md` (global CSS variables setup), `progress.md`, `active_context.md`.

- [X] **14.8 Version Control Checkpoint:** Stage changes (templates, partials, input.css, tailwind.config.js, rules, docs, memory). Generate commit message (e.g., "feat(frontend): Implement base HTML structure, partials, and global styles integration"). Await confirmation to commit.

---

**Phase 15: Component Styling & Static Visual Integration**

*AI Assistant Guidance: Apply detailed Tailwind CSS styling to specific components (Hero elements, Service/News/Project cards) based on v0 designs. Integrate static visuals like the Services section background iframe and placeholder embeds/images. Focus on achieving the visual appearance without complex JS interactivity.*

- [X] **15.1 Style Hero Section Content (`home.html`):**
    *   **15.1.1 Text Styling:** Apply specific Tailwind typography classes (font family, size, weight, color, line height) to the H1 headline and paragraph in the `#hero` section, matching the v0 `page.txt`.
    *   **15.1.2 Button Styling:** Apply detailed Tailwind classes to the primary CTA button ("View Portfolio") and secondary button ("Our Services") for background color, text color, padding, border, rounded corners, hover/focus states, matching `page.txt`.
    *   **15.1.3 Background:** Apply the gradient background classes (`bg-gradient-to-r from-...`) to the main Hero `<section>` tag.
    *   **15.1.4 Visual Placeholder:** Instead of the complex `HeroShowcase` component, embed a relevant placeholder image (`<img>` tag referencing a high-quality static image, e.g., `static/images/hero/placeholder.jpg`) or **embed the primary Sketchfab iframe** here, styled appropriately to fit the right-side column on desktop. Add appropriate `alt`/`title` attributes. *(Decision: Use Sketchfab embed here).*
    *   **15.1.5 Scroll Indicator:** Style the scroll indicator div using Tailwind classes.

- [X] **15.2 Style Services Section & Integrate Background (`home.html`):**
    *   **15.2.1 Section Styling:** Style the `#services` section heading, paragraph, and grid container using Tailwind classes from `page.txt`. Apply the subtle pattern background from `page.txt` if easily achievable with CSS `background-image: url(...)` or defer if too complex.
    *   **15.2.2 Interactive Background (iframe):**
        - Create the static HTML file: `static/animations/inertia_background.html`. Copy the full HTML content from @file:finalt.html into this file.
        - In `home.html`, within the `#services` section, add an `<iframe>` positioned *behind* the service cards using CSS absolute positioning and `z-index`. Set `src="{% static 'animations/inertia_background.html' %}"`. Style the iframe to cover the section background area (`absolute inset-0 w-full h-full ...`). Ensure service cards have a background color (`bg-white` or similar) and higher `z-index` to appear on top.
        - Add `title="Interactive background animation"` to the iframe.
    *   **15.2.3 Style Service Cards:** Update the partial @file:templates/partials/_service_card.html applying detailed Tailwind classes for background, padding, border, shadow, hover effects, icon container styling, text hierarchy, and link styling, matching the v0 `ServiceCard` component.

- [X] **15.3 Style Portfolio/News Cards & Lists:**
    *   **15.3.1 Style Project Card (`_project_card.html`):** Apply detailed Tailwind classes matching the Service/News cards for consistency (background, border, shadow, padding, image/embed container, text styles, hover effects).
    *   **15.3.2 Style News Card (`_news_card.html`):** Ensure styling is consistent with other cards. Style date/metadata elements.
    *   **15.3.3 Style List Pages:** Apply consistent styling to titles, grid layout, and pagination controls on `/scans/`, `/videos/`, `/images/`, and `/news/` pages.

- [X] **15.4 Style Client Portal & CTA Sections (`home.html`):**
    *   **15.4.1 Style Client Portal:** Apply styling to the heading, paragraph, login button, feature cards grid, and the two-column promo block, matching the v0 `page.txt`. Ensure `_client_portal_card.html` partial is styled.
    *   **15.4.2 Style CTA Banner:** Apply gradient background, text styling, and button styling to the final CTA banner section.

- [X] **15.5 Update Styling Rules:**
    *   **15.5.1 Update Component Rules:** Add examples and specific class patterns used for cards, buttons, hero elements to relevant frontend rules files (e.g., `01_layout_styling_base.mdc`, `03_tailwind_config.mdc`).
    *   **15.5.2 Document Background:** Add notes to `01_layout_styling_base.mdc` or a new rule about the iframe background technique used for the Services section.

- [X] **15.6 Verification:**
    *   **15.6.1 Visual Match:** Compare key sections (Hero, Services, News, CTA, Cards, Footer, Header) against the v0 screenshots/design. Verify typography, colors, spacing, and component styles are closely matched.
    *   **15.6.2 Background Check:** Verify the interactive inertia background *iframe* loads and functions behind the Services cards.
    *   **15.6.3 Responsiveness:** Re-check responsiveness on key pages, ensuring styled elements adapt correctly.
    *   **15.6.4 Report:** Confirm visual fidelity and report any major deviations or issues.

- [X] **15.7 Documentation & Memory Update:**
    *   **15.7.1 Update `README.md`/Docs:** Add details about specific styling implementations and the interactive background iframe.
    *   **15.7.2 Update Memory Bank:** Update `system_patterns.md` (styled component examples), `tech_context.md` (specific Tailwind plugins used), `progress.md`, `active_context.md`.

- [X] **15.8 Version Control Checkpoint:** Stage all styling changes. Generate commit message (e.g., "feat(frontend): Apply detailed Tailwind styling to components and integrate static visuals"). Await confirmation to commit.

---

**Phase 16: Client-Side JavaScript Interactivity**

*AI Assistant Guidance: Implement JavaScript-driven interactivity for elements like the Hero showcase hover effects, potentially image galleries, and the mobile navigation toggle. Focus on writing clean, efficient vanilla JavaScript.*

- [X] **16.1 Setup JS Execution:**
    *   **16.1.1 Link Script:** Confirm `script.js` is linked in `base.html`.
    *   **16.1.2 DOM Ready:** Ensure JS code runs after `DOMContentLoaded`.
- [X] **16.2 Implement Hero Showcase Hover Effects (Simplified):**
    *   **16.2.1 Target Elements:** Add IDs or unique data attributes to the Hero section's primary CTA button and the main visual element (Sketchfab iframe/container).
    *   **16.2.2 JS Logic:** Add `mouseenter`/`mouseleave` listeners in `script.js`. On hover, add/remove simple visual feedback classes (e.g., slight scale `transform scale-105`, increased shadow `shadow-lg`) defined using Tailwind. *(Defer complex multi-window interactions from v0 `hero-showcase.txt` unless specifically requested).*
    *   **16.2.3 Verification:** Test hover effects are subtle and functional.
- [X] **16.3 Implement Mobile Navigation Toggle:**
    *   **16.3.1 Target Elements:** Ensure the mobile menu button (hamburger icon) and the navigation links container (`<nav>` block) in the header partial have unique IDs. Ensure the nav block is hidden on small screens using Tailwind (`hidden md:flex`).
    *   **16.3.2 JS Logic:** Add a click event listener to the hamburger button in `script.js`. On click, toggle a class (e.g., `hidden`) or specific Tailwind classes (`block`/`hidden`) on the navigation container to show/hide it. Change the button icon (hamburger/close) if desired.
    *   **16.3.3 Verification:** Test on small screens. Verify clicking the hamburger button opens/closes the mobile navigation menu smoothly.
- [X] **16.4 Implement Basic Image Gallery Interaction (Optional - e.g., Lightbox):**
    *   **16.4.1 Choose Library (Optional):** Consider a lightweight vanilla JS lightbox library (e.g., Photoswipe, basic custom implementation) or defer this.
    *   **16.4.2 Implementation:** If proceeding, add necessary JS listeners and HTML structure changes to the image gallery section on `home.html` and potentially list pages.
    *   **16.4.3 Verification:** Test lightbox functionality. *(Decision: Defer lightbox for now unless requested).*
- [X] **16.5 Implement Gallery Scroll Effects (Optional - Choose One):**
    *   **16.5.1 Choose Effect:** Decide whether to implement the auto-ticker OR the position-controlled gallery from v0 examples for the `#featured-projects` section. Start with the simpler **auto-ticker** (`image-ticker.txt`).
    *   **16.5.2 Implement JS:** Create `static/js/image-ticker.js` (or add to `script.js`). Translate the core logic: clone elements, use `requestAnimationFrame` for scrolling, implement `pauseOnHover`.
    *   **16.5.3 Link & Verify:** Include the script. Verify the featured projects section scrolls automatically and pauses on hover.
- [X] **16.6 Update JavaScript Rules:**
    *   **16.6.1 Create/Update Rule File:** Ensure `.cursor/rules/frontend/04_javascript_interactions.mdc` exists.
    *   **16.6.2 Populate Rules:** Add rules for vanilla JS best practices, DOM manipulation efficiency, event handling, and specific patterns used (mobile menu toggle, gallery scroll).
- [X] **16.7 Verification (Overall Interactivity):**
    *   **16.7.1 Test Features:** Test Hero hover effects, mobile menu toggle, and the implemented gallery scroll.
    *   **16.7.2 Performance Check:** Briefly check if added JS impacts page load speed significantly (using browser dev tools network tab).
    *   **16.7.3 Cross-Browser/Mobile:** Re-check interactivity on different devices/browsers.
- [X] **16.8 Documentation & Memory Update:**
    *   **16.8.1 Update `README.md`/Docs:** Document JS interactions implemented, any libraries used, and deferred interactivity.
    *   **16.8.2 Update Memory Bank:** Update relevant files.
- [X] **16.9 Version Control Checkpoint:** Stage JS changes and related files. Generate commit message (e.g., "feat(frontend): Implement JS for mobile nav toggle, hero hover, and gallery scroll"). Await confirmation to commit.

---

**Phase 17: Reimplement Interactive Gallery with CSS Animation**

*AI Assistant Guidance: Replace the current Swiper.js implementation for the Services/Featured Projects gallery with a pure CSS infinite scroll animation. Control animation speed and direction using JavaScript based on mouse position and hover state, reading parameters from CSS variables.*

- [X] **17.1 Remove Swiper Dependency & Initialization:**
    *   **17.1.1 Remove JS Library:** Remove the Swiper.js CDN `<script>` and `<link>` tags from @file:templates/base.html.
    *   **17.1.2 Remove CSS Classes:** Remove the `swiper`, `swiper-wrapper`, `swiper-slide` classes from the gallery HTML structure in @file:templates/core/home.html (or relevant template). Add new classes for styling/JS hooks (e.g., `css-gallery-container`, `css-gallery-track`, `css-gallery-item`).
    *   **17.1.3 Delete Swiper JS:** Delete or comment out the entire content of @file:static/js/gallery-swiper-init.js as it's no longer needed. Ensure it's not included in `base.html`.

- [X] **17.2 Implement HTML Structure for CSS Animation:**
    *   **17.2.1 Update Template:** Ensure the gallery section has an outer container (`css-gallery-container` with `overflow-hidden`) and an inner track (`css-gallery-track` containing the items).
    *   **17.2.2 Duplicate Content (JS):** Create a new JS file `static/js/css_gallery_init.js`. Add logic within a `DOMContentLoaded` listener to:
        - Select the track (`.css-gallery-track`).
        - Select all original items within the track.
        - Clone each item and append the clones to the end of the track. *(This creates the content needed for seamless looping).*

- [X] **17.3 Implement CSS for Infinite Scroll:**
    *   **17.3.1 Add Styles (`input.css` or `<style>`):** Add CSS rules:
        - Style the track (`.css-gallery-track`) with `display: flex`, `width: max-content` (or calculated width based on items * 2), and apply the scrolling animation.
        - Define `@keyframes scrollLeft` (or `scrollRight`) that uses `transform: translateX(-50%)` (to scroll through the original items).
        - Apply the animation: `animation: scrollLeft var(--gallery-scroll-duration) linear infinite;`. Define `--gallery-scroll-duration` variable (e.g., 60s initially).
        - Style the items (`.css-gallery-item`) with `flex-shrink: 0` and appropriate `height` (using `--gallery-slide-height`) and potentially `width` (can still be dynamic if needed, update widths in JS).
        - Ensure the container (`css-gallery-container`) has `overflow: hidden`.

- [X] **17.4 Implement JS for Interactive Control:**
    *   **17.4.1 Get Refs & Read CSS Vars:** In `css_gallery_init.js`, get references to the container and track. Read relevant CSS variables (e.g., idle speed, mouse max speed, deadzone, accel, damping - map these to CSS animation properties) into JS variables.
    *   **17.4.2 Mouse Hover Listener:** Add `mouseenter`/`mouseleave` listeners to the container (`.css-gallery-container`):
        - On `mouseenter`: Set track style `animation-play-state = 'paused'; isMouseOverGallery = true;`. Optionally start a JS-based scroll loop.
        - On `mouseleave`: Set `isMouseOverGallery = false;`. Restore idle animation state (direction, duration, play-state running). Stop JS-based scroll loop if used.
    *   **17.4.3 Mouse Move Listener:** Add `mousemove` listener to the container:
        - If `isMouseOverGallery`, calculate `relativeMouseX`.
    *   **17.4.4 JS-Based Scroll Loop (`requestAnimationFrame` - Optional, for Mouse Control):** If CSS `animation-duration` manipulation isn't smooth enough for mouse control, create a JS loop that runs *only when mouse is over*:
        - Calculate desired `influence` based on `relativeMouseX` and deadzone.
        - Calculate `targetScrollSpeedPPS` mapping influence to `[-mouseMaxPPS, +mouseMaxPPS]`. (Read max PPS from CSS var).
        - Use acceleration/damping physics to update `currentScrollSpeedPPS`. (Read accel/damping from CSS vars).
        - **Directly manipulate `container.scrollLeft += currentScrollSpeedPPS * deltaTime;`**. The browser handles the scrolling.
        - Implement manual looping: If `scrollLeft` reaches end (e.g., `scrollWidth / 2`), reset it to `0`. If `scrollLeft` goes below `0`, reset it to `scrollWidth / 2`.
    *   **17.4.5 Idle State Logic:** Create `resetToIdleAnimation()` function called on `mouseleave`. This function should:
        - Ensure the CSS animation properties (`animation-name`, `animation-duration`, `animation-direction`) are set correctly for the idle rightward scroll (adjusting `--gallery-scroll-duration` based on an idle speed CSS var).
        - Set `animation-play-state = 'running'`. Stop the JS scroll loop if used.

- [X] **17.5 Dynamic Slide Width Calculation (Adaptation):**
    *   **17.5.1 Keep/Adapt `updateGallerySlideWidths`:** Retain the logic to calculate `targetSlideWidthPx` based on viewport/thresholds/variance.
    *   **17.5.2 Apply Widths:** Apply the width to *all* items (original and cloned) using `item.style.width` in the new `css_gallery_init.js` file. Ensure this is called on load and resize.
    *   **17.5.3 Recalculate Animation/Scroll Properties:** If slide widths change, the CSS animation `translateX(-50%)` might need adjustment if it relied on fixed widths. If using JS `scrollLeft`, the `scrollWidth` check for looping needs to account for the dynamic widths.

- [X] **17.6 Update Rules & Documentation:**
    *   **17.6.1 Update Rules:** Update JS rules file (`04_javascript_interactions.mdc`) reflecting the new CSS animation control technique and removal of Swiper.
    *   **17.6.2 Update Docs/Memory:** Update README, memory bank files explaining the new gallery implementation.

- [X] **17.7 Verification:**
    *   **17.7.1 Idle Scroll:** Verify the gallery scrolls smoothly to the right automatically.
    *   **17.7.2 Hover Pause:** Verify scroll pauses on mouse hover.
    *   **17.7.3 Mouse Control:** Verify mouse position controls direction/speed. Test deadzone. Test interaction.
    *   **17.7.4 Seamless Loop:** Verify looping works perfectly in *both* directions without disappearing images.
    *   **17.7.5 Dynamic Width:** Verify slides resize correctly on window resize.
    *   **17.7.6 Console:** Check for JS errors.

- [X] **17.8 Version Control Checkpoint:** Stage changes. Generate commit message (e.g., "refactor(gallery): Replace Swiper with CSS animation for interactive scroll"). Await confirmation.

---