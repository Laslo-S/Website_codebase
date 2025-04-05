# Project Brief: Architectural Visualization Platform

**Goal:** Build a website using Django and Tailwind CSS to showcase architectural visualizations (3D scans, video renderings, still images). Implement user authentication allowing users to have dedicated pages, while an admin manages content.

**Target Audience:** Potential clients, collaborators.

**Core Features:**
*   Public homepage with general information and links.
*   Dedicated pages for displaying projects categorized by type: 3D Scans, Video Visualizations, Still Images.
*   User authentication (Login/Logout).
*   User-specific pages (viewable only by the user or admin).
*   Admin interface (`/admin/`) for managing users and visualization projects.
*   Dynamic template loading for user-specific pages (override default layout per user).

**Tech Stack:**
*   Backend: Python / Django
*   Frontend: HTML / Tailwind CSS / Vanilla JavaScript (minimal)
*   Database: SQLite (development)
*   Version Control: Git

**Key Constraints/Decisions:**
*   Server-Side Rendering (SSR) preferred initially.
*   Mobile-first design approach.
*   Low initial traffic expected.
*   Some visualization types (Scan, Video, Still) are hardcoded into the structure. 