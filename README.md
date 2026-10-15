# Work-Study-Life Web Sanctuary

> An editorial, responsive web application bridging high-focus daily productivity with evening reflection and emotional wellness. Designed for young adults, students, and professionals (ages 18–32) navigating cognitive overload, erratic routines, and burnout.

---

## 🌟 The Core Vision: Dual-Atmosphere System

* **☀️ Daytime Mode (Minimalist & Sleek):** A crisp, high-clarity workspace focused on today’s sequenced agenda across Work, Study, and Life, featuring two-step task completion and clutter-free focus.
* **🌙 Night Sanctuary Mode (Cozy Coffee Shop):** Warm amber glows, rich espresso tones, and tactile paper textures featuring the **Good Things Jar** (with mood-filtered pastel sticky notes) and the **Daily Journal** to replace doomscrolling with mindful closure.

---

## 📱 The 5 Core Experiences (Interactive Prototype)

1. **Main Page (Home Agenda):**
   * Dynamic time-based greetings: *Good Morning!*, *Good Afternoon!*, *Good Evening!*, or *Welcome back!*.
   * October week horizontal slider with today prominently marked.
   * Chronological time-blocks with **Two-Step Completion**: click task ➔ tick icon appears ➔ click tick ➔ marks complete with a soft light-grey transition.
   * Full-width **`WIND UP THE DAY.`** button triggering the cozy night transition and routing to the Good Things Jar.

2. **Calendar Page (`/calendar`):**
   * Month switcher (`< OCTOBER 2026 >`) with automatic grid calculation.
   * Systematic event feed below the calendar showing marked dates in order (e.g. Shoot Day, Dusshera).
   * **`Mark a date (+)`** action allowing users to attach custom milestones and holidays.

3. **Scheduled & Backlog Page (`/scheduled`):**
   * Backlog repository for tasks left incomplete on previous dates or scheduled for late hours, keeping daytime focus clean.
   * Day pill filter (`12, 13, 14, 15`) and quick `(+)` add button.

4. **Good Things Jar (`/jar`) — "Read Me When" System:**
   * Tactile sticky note creator (unlined pastel canvas with heading & body inputs).
   * 5 mood pastels: **Happy** (Buttercup), **Thankful** (Lavender), **Angry** (Sage Green), **Lonely** (Rose Pink), **Sad** (Powder Blue).
   * `[✏️ Edit Colors]` customizer popover to personalize palette hex values.
   * `PUT IT TO THE JAR` paper drop animation with floating folded memory cards inside the illustrated glass jar.
   * `READ FROM JAR.` mood filter drawer displaying past memories grouped chronologically.

5. **My Journal (`/journal`) — 3 Dynamic Views:**
   * **List View (Default):** Chronological entry feed with date badges, text snippets, thumbnails, and floating pencil (`✏️`) button to compose new entries.
   * **Media View:** Masonry photo & video grid filtered by `All`, `Photo`, and `Videos`.
   * **Calendar View:** Multi-month calendar showing background photo thumbnails on dates with entries.

6. **Universal 5-Tab Floating Bottom Dock:**
   * Fast navigation between Calendar, Scheduled, Elevated Add `(+)`, Good Things Jar, and Journal.

---

## 📂 Design Documentation & Process Blueprints

* [instructions.md](instructions.md) — Collaboration contract & 6-stage product protocol.
* [UX_RESEARCH.md](UX_RESEARCH.md) — Phase 1: Problem space, target persona, and product vision.
* [USER_JOURNEY.md](USER_JOURNEY.md) — Phase 2: Empathy model, day-to-night journey timeline, and wireframe flow.
* [IA_SPEC.md](IA_SPEC.md) — Phase 3: Information architecture, sitemap, taxonomy, and component inventory.
* [WIREFRAMES.md](WIREFRAMES.md) — Phase 4: Screen-by-screen layouts, user interaction flows, and annotated blueprints.
* [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) — Phase 5: Option A typography scale (Playfair Display & Plus Jakarta Sans) and design tokens.

---

## 🚀 How to Run Locally

Because the web application is built with **zero external dependencies** (Modern HTML5, CSS3 Tokens, and ES6 JavaScript with `localStorage`), you can run it immediately:

1. Open `index.html` directly in any web browser (Chrome, Safari, Firefox, Edge).
2. Or use any local static server:
   ```bash
   npx serve .
   # or
   python3 -m http.server 8000
   ```
3. To deploy online to **GitHub Pages**:
   * Push changes to `main` branch.
   * In GitHub repository settings ➔ Pages ➔ Select `main` branch / root ➔ Save. Your public URL will be live!

---

*Curated & Directed by Kaushiki Sharma — Fashion Communication, NIFT Hyderabad.*