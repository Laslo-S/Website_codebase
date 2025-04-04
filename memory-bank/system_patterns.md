# System Patterns & Architectural Decisions

*   **Architecture:** Modular Monolith approach using Django Apps (e.g., `apps/core`, `apps/accounts`).
*   **Rendering:** Server-Side Rendering (SSR) via Django Templates is the primary method.
*   **Styling:** Tailwind CSS utility-first framework.
*   **User Pages:**
    *   Dedicated profile page (`/accounts/profile/`) for logged-in user dashboard.
    *   User-specific public-facing pages (`/accounts/user/<username>/`) with dynamic template loading (`templates/accounts/user_templates/<username>.html` overrides `templates/accounts/user_page.html`). Access restricted to owner or staff.
*   **Visualization Content:** Handled via `VisualizationProject` model. Types (`scan`, `video`, `still`) are hardcoded choices, displayed on dedicated list pages (`/scans/`, `/videos/`, `/images/`). 