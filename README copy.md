# DevRush 2.0 Hackathon Gateway

The official terminal-themed gateway website for **DevRush 2.0**, a 24-hour intra-college hackathon organized by the **Numerano Club** at **Dayananda Sagar College of Engineering (DSCE)**.

## 🚀 Overview

This project is a modern, immersive web application designed with a cyberpunk/terminal aesthetic ("Matrix" themes, glitches, neon effects). It serves as the central hub for:
- Event information (Timeline, Tracks, Prizes, Sponsors)
- Team Registration & Management
- Dashboard for Participants
- Admin Controls

## 🛠️ Tech Stack

- **Frontend Framework:** [React](https://reactjs.org/) (via [Vite](https://vitejs.dev/))
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Routing:** [React Router](https://reactrouter.com/)

## ✨ Key Features

- **Immersive Design:** Custom `GlitchText`, `TypewriterText`, `MatrixRain`, and `ScanlineOverlay` effects.
- **Dynamic Dashboard:** Participant dashboard with team management and submission tracking.
- **Authentication:** Mock authentication flow (Demo/Guest mode enabled).
- **Responsive:** Fully responsive layout optimized for all devices.

## 💻 Getting Started

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Run Development Server:**
    ```bash
    npm run dev
    ```
    The site will be available at `http://localhost:8080`.

3.  **Build for Production:**
    ```bash
    npm run build
    ```

## 📂 Project Structure

- `src/components`: Reusable UI components and visual effects.
- `src/pages`: Main page views (Home, Dashboard, Login, etc.).
- `src/contexts`: Global state management (AuthContext).
- `src/hooks`: Custom React hooks (toast, etc.).

---

> "Where Innovation Meets Code"
