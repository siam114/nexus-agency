# Nexus Agency - Modern Agency Portfolio

A full-stack, multi-page digital agency portfolio engineered with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Lucide Icons**.

---

## ✨ Features

- **Multi-Page Architecture**:
  - `/`: Engaging landing hub with hero banner, service previews, case studies, and testimonials.
  - `/services`: In-depth service breakdown, tech stack checklists, deliverables, and 4-step methodology.
  - `/portfolio`: Interactive case study gallery with instant category filtering.
  - `/about`: Agency mission, core engineering values, leadership profiles, and client reviews.
  - `/contact`: Interactive proposal inquiry form, office details, and interactive FAQs.
- **Dark & Light Mode**:
  - Powered by `next-themes` and Tailwind CSS custom variant.
  - Curated **Midnight Obsidian & Electric Indigo** palette with smooth theme transitions and zero hydration flicker.
- **Custom Branding**:
  - Custom SVG logo and matching favicon (`/icon.svg`).
- **Responsive & Accessible**:
  - Mobile hamburger navigation drawer with active link highlighting via `usePathname()`.
- **Strict TypeScript & Clean Code**:
  - 100% type-safe, passes strict ESLint rules and production static prerendering.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Turbopack)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 📁 Project Structure

```text
agency portfolio/
├── frontend/                   # Next.js Frontend Application
│   ├── public/                 # Static assets & icons
│   ├── src/
│   │   ├── app/                # App Router multi-page routes
│   │   │   ├── about/          # /about route
│   │   │   ├── contact/        # /contact route
│   │   │   ├── portfolio/      # /portfolio route
│   │   │   ├── services/       # /services route
│   │   │   ├── globals.css     # Tailwind v4 styles & theme variables
│   │   │   ├── layout.tsx      # Root layout with persistent nav & footer
│   │   │   └── page.tsx        # Landing page
│   │   ├── components/         # Reusable UI & section components
│   │   │   ├── layout/         # Navbar, Footer
│   │   │   ├── sections/       # Hero, Services, Projects, Contact, etc.
│   │   │   └── ui/             # Button, Card, ThemeToggle
│   │   ├── data/               # Mock data for services, projects, team
│   │   ├── lib/                # cn() class utility
│   │   └── types/              # Strict TypeScript models
│   ├── next.config.ts
│   ├── package.json
│   └── tsconfig.json
├── .gitignore                  # Root gitignore
└── README.md                   # Documentation
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18.17+ or v20+)
- npm / pnpm / yarn

### Installation & Run

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Production Build

```bash
cd frontend
npm run build
npm run start
```

---

## 📄 License

MIT License. Designed and developed for Nexus Agency.
