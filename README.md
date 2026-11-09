# ⚡ NexusAgency — Modern Full-Stack Agency & Headless CMS Platform

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-16.4.2-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3.0-blue?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.21-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB_Atlas-8.9-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel&logoColor=white)](https://nexusagency-five.vercel.app)
[![Render](https://img.shields.io/badge/Render-Active-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://nexusagency-backend.onrender.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

<br />

**A high-performance, enterprise-grade digital agency platform and administrative content management suite.**  
Engineered with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, Express, and MongoDB Atlas.

[🌐 **Live Website**](https://nexusagency-five.vercel.app) • [🔐 **Admin Dashboard**](https://nexusagency-five.vercel.app/admin) • [⚙️ **REST API Documentation**](https://nexusagency-backend.onrender.com/api/v1/health)

</div>

---

## 📑 Table of Contents

- [🌟 Live Demonstrations](#-live-demonstrations)
- [✨ Key Features](#-key-features)
  - [🖥️ Public Agency Portal](#️-public-agency-portal)
  - [🔒 Administrative CMS Dashboard](#-administrative-cms-dashboard)
  - [⚙️ High-Performance REST API](#️-high-performance-rest-api)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Architecture & Structure](#-project-architecture--structure)
- [🚀 Quick Start & Installation](#-quick-start--installation)
  - [1. Prerequisites](#1-prerequisites)
  - [2. Clone Repository](#2-clone-repository)
  - [3. Backend Setup](#3-backend-setup)
  - [4. Frontend Setup](#4-frontend-setup)
- [🔐 Environment Variables](#-environment-variables)
- [📡 API Endpoints Reference](#-api-endpoints-reference)
- [👥 NexusAgency Team](#-nexusagency-team)
- [📄 License & Authors](#-license--authors)

---

## 🌟 Live Demonstrations

| Component | URL | Status | Description |
| :--- | :--- | :--- | :--- |
| **Public Agency Portal** | [nexusagency-five.vercel.app](https://nexusagency-five.vercel.app) | `Production` | Customer-facing agency storefront, case studies, interactive services, 3D team showcase, and smooth reviews slider. |
| **Admin Control Panel** | [nexusagency-five.vercel.app/admin](https://nexusagency-five.vercel.app/admin) | `Protected` | Administrative suite for managing projects, services, team members, reviews, and client inquiries. |
| **Backend REST API** | [nexusagency-backend.onrender.com](https://nexusagency-backend.onrender.com/api/v1/health) | `Active` | Scalable Node.js + Express API connected to MongoDB Atlas with JWT auth and rate limiting. |

> **Admin Demo Access**:
> - **Email**: `smsiam987@gmail.com`
> - **Password**: `AdminPassword123!` *(or use the 1-click demo button on the login screen)*

---

## ✨ Key Features

### 🖥️ Public Agency Portal

- **Modern Multi-Page Architecture**:
  - `/` — Dynamic landing page featuring high-converting hero banner, value metrics, client logos, service overview, case studies, 3D team carousel, and smooth testimonials slider.
  - `/services` & `/services/[slug]` — Detailed service breakdowns, technical stacks, deliverables, sprint roadmaps, and contextual FAQs.
  - `/portfolio` & `/projects/[slug]` — Interactive case study gallery with real-time category filtering, metrics, architecture blueprints, and challenge-solution breakdowns.
  - `/team` — Dedicated team directory highlighting specialists with social profiles and skill badges.
  - `/about` — Mission statement, engineering principles, culture values, and verified client feedback.
  - `/contact` — Multi-step project proposal and inquiry submission system with backend validation.
- **Ultra-Smooth Hardware-Accelerated Testimonials Slider**:
  - Custom Apple-style continuous flex sliding track with `cubic-bezier(0.25, 1, 0.5, 1)` easing.
  - Touch-swipe support that follows user fingers in real-time on mobile devices.
  - Responsive view: 1 card on mobile, 2 on tablet, and 3 on desktop.
  - Smart auto-play (6-second intervals) that gracefully pauses on card hover or user touch.
  - Smooth animated expanding pill indicator dots and dynamic `01 / 06` slide counter.
- **Interactive 3D Soft-Gliding Team Stage**:
  - Soft gliding 3D carousel effect with perspective scaling, spotlight badges, and social media integration.
- **Obsidian Dark & Light Theme**:
  - Zero-flicker theme engine powered by `next-themes` and Tailwind CSS custom color spaces.

---

### 🔒 Administrative CMS Dashboard

- **Full CRUD Management**:
  - **Projects**: Create, edit, reorder, feature, and toggle publish status for portfolio case studies.
  - **Services**: Manage core service offerings, deliverable items, and pricing packages.
  - **Team Members**: Add, reorder, update profile photos, social links, and specialty skill tags.
  - **Client Testimonials**: Full review management with rating stars, client avatars, and verification badges.
  - **Client Inquiries**: Real-time proposal inbox with unread status tracking and client details.
  - **Agency Settings**: Control agency contact info, social links, and brand assets.
- **Client-Side Canvas Image Compression**:
  - Automatically downsizes uploaded avatars and project imagery on the fly via HTML5 canvas before dispatch, completely preventing `413 Payload Too Large` or `localStorage quota` errors.
- **Hybrid Real-Time Data Synchronization**:
  - Automatically reads and synchronizes directly with MongoDB Atlas on Render.
  - Includes a resilient client storage fallback to ensure zero downtime even during backend cold starts.

---

### ⚙️ High-Performance REST API

- **Enterprise Express & TypeScript Core**:
  - Modular layered architecture: `controllers`, `services`, `models`, `validators`, `middleware`, and `utils`.
- **Database Resilience & Auto-Seeding**:
  - Automatically connects to MongoDB Atlas with in-memory verified fallback if offline.
  - Auto-seeds default projects, services, team members, and testimonials on boot if missing.
- **Security & Performance**:
  - Schema-level input sanitization using **Zod**.
  - **Helmet** HTTP security headers.
  - **CORS** whitelisting for authorized frontend domains.
  - **Rate Limiting** on authentication and contact submission endpoints to prevent spam.
  - **Stateless JWT Authentication** with password hashing via `bcryptjs` (salt factor 12).
  - **Nodemailer SMTP Integration** for instant email alerts when proposals are submitted.

---

## 🛠️ Tech Stack

| Domain | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | **Next.js 16.4.2** (App Router) | Server-Side Rendering, Partial Prerendering, Static Generation |
| **UI Library** | **React 19.3.0** | Modern concurrent UI architecture and state hooks |
| **Language** | **TypeScript 5.7+** | End-to-end type safety across both frontend and backend |
| **Styling & Design** | **Tailwind CSS v4** | Utility-first responsive design, modern dark/light mode palette |
| **Icons & Assets** | **Lucide React** | Clean, lightweight SVG vector icons |
| **State & Theme** | **next-themes** + Local Storage | Zero-flicker dark/light mode and CMS cache sync |
| **Backend Framework** | **Express.js 4.21** | Fast, unopinionated, modular REST API server |
| **Database & ODM** | **MongoDB Atlas + Mongoose 8.9** | Cloud document database with typed schemas and indexing |
| **Validation** | **Zod 3.24** | Type-safe schema validation for requests and environments |
| **Security & Auth** | **JWT + bcryptjs + Helmet** | Token auth, password encryption, and HTTP header protection |
| **Rate Limiting** | **express-rate-limit** | DDoS and brute-force mitigation |
| **Email Service** | **Nodemailer** | SMTP transaction emails for client contact inquiries |
| **Testing** | **Vitest + Supertest** | Automated integration and route testing |
| **Hosting & CI/CD** | **Vercel** (Frontend) + **Render** (Backend) | Global edge CDN and automated GitHub deployment pipeline |

---

## 📁 Project Architecture & Structure

```text
agency-portfolio/
├── frontend/                          # Next.js 16 Application
│   ├── public/
│   │   ├── images/
│   │   │   ├── team/                  # High-res optimized team portrait photos
│   │   │   └── ...                    # Showcase assets & project screenshots
│   │   └── icon.svg                   # Custom agency favicon and vector brand logo
│   ├── src/
│   │   ├── app/                       # Next.js App Router (Pages & Layouts)
│   │   │   ├── page.tsx               # Homepage / Landing page
│   │   │   ├── about/                 # Agency story, values, team & reviews
│   │   │   ├── contact/               # Interactive proposal inquiry form
│   │   │   ├── portfolio/             # Case study gallery with category filters
│   │   │   ├── projects/[slug]/       # Deep-dive individual project case study
│   │   │   ├── services/              # Core agency service catalog
│   │   │   ├── services/[slug]/       # Service details, deliverables & roadmap
│   │   │   ├── team/                  # Team specialists directory
│   │   │   ├── admin/                 # Protected Administrative CMS
│   │   │   │   ├── page.tsx           # Dashboard analytics & summary
│   │   │   │   ├── login/             # Admin authentication portal
│   │   │   │   ├── projects/          # Projects CRUD management
│   │   │   │   ├── services/          # Services CRUD management
│   │   │   │   ├── team/              # Team personnel management
│   │   │   │   ├── testimonials/      # Client review management
│   │   │   │   ├── inquiries/         # Contact proposal inbox
│   │   │   │   └── settings/          # Global brand & agency settings
│   │   │   └── layout.tsx             # Root layout with theme provider & navbar
│   │   ├── components/
│   │   │   ├── layout/                # Navbar, MobileNav, Footer
│   │   │   ├── sections/              # TestimonialsSlider, TeamGrid, Hero, etc.
│   │   │   └── ui/                    # Card, Button, Input, Modal, Badge, ThemeToggle
│   │   ├── data/                      # Client mock & default data definitions
│   │   ├── lib/                       # API clients, liveContent sync, admin auth
│   │   └── types/                     # Shared TypeScript interfaces
│   ├── next.config.ts
│   └── package.json
│
├── backend/                           # Node.js + Express + TypeScript API
│   ├── api/
│   │   └── index.ts                   # Vercel serverless function entrypoint
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.ts                  # Resilient MongoDB connection manager
│   │   │   └── env.ts                 # Zod-validated environment config
│   │   ├── controllers/               # Auth, Project, Service, Team, Testimonial, Contact
│   │   ├── data/
│   │   │   └── initialData.ts         # Verified production seed dataset
│   │   ├── middleware/                # Auth guard, rate limiters, error handling
│   │   ├── models/                    # Mongoose schemas (User, Project, Team, etc.)
│   │   ├── routes/                    # API v1 route definitions
│   │   ├── services/                  # Business logic and database operations
│   │   ├── validators/                # Zod request validators
│   │   ├── server.ts                  # HTTP listener & auto-seeding routine
│   │   └── app.ts                     # Express application pipeline
│   ├── package.json
│   └── tsconfig.json
│
├── README.md                          # Repository Documentation
└── .gitignore                         # Root Git ignore rules
```

---

## 🚀 Quick Start & Installation

### 1. Prerequisites

- **Node.js**: `v20.x` or `v22.x` (recommended)
- **Package Manager**: `npm`, `pnpm`, or `yarn`
- **MongoDB**: Local MongoDB instance or free cloud [MongoDB Atlas](https://www.mongodb.com/atlas) cluster

### 2. Clone Repository

```bash
git clone https://github.com/siam114/nexus-agency.git
cd nexus-agency
```

---

### 3. Backend Setup

1. **Navigate to the backend folder**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env` file in `backend/`:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/nexusagency?retryWrites=true&w=majority
   JWT_SECRET=super_secret_jwt_key_nexusagency_2026
   JWT_EXPIRES_IN=7d
   ALLOWED_ORIGINS=http://localhost:3000,https://nexusagency-five.vercel.app
   INITIAL_ADMIN_EMAIL=smsiam987@gmail.com
   INITIAL_ADMIN_PASSWORD=AdminPassword123!
   INITIAL_ADMIN_NAME=SM SIAM
   ```

4. **Seed database (Optional)**:
   ```bash
   npm run seed
   ```

5. **Start backend development server**:
   ```bash
   npm run dev
   ```
   *The API will start listening at [http://localhost:5000](http://localhost:5000).*

---

### 4. Frontend Setup

1. **Open a new terminal and navigate to `frontend`**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env.local` file in `frontend/`:
   ```env
   # Connect to local backend:
   NEXT_PUBLIC_BACKEND_URL=http://localhost:5000/api/v1

   # Or connect to live production Render backend:
   # NEXT_PUBLIC_BACKEND_URL=https://nexusagency-backend.onrender.com/api/v1
   ```

4. **Start the Next.js development server**:
   ```bash
   npm run dev
   ```

5. **Visit the application**:
   Open [http://localhost:3000](http://localhost:3000) in your browser.  
   To test the admin CMS, navigate to [http://localhost:3000/admin](http://localhost:3000/admin).

---

## 🔐 Environment Variables

### Backend (`backend/.env`)

| Variable | Required | Description | Example |
| :--- | :---: | :--- | :--- |
| `PORT` | No | Port for Express HTTP listener | `5000` |
| `NODE_ENV` | Yes | Environment mode | `development` / `production` |
| `MONGODB_URI` | Yes | MongoDB Atlas or local connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Yes | Secret key used for signing admin JWT tokens | `your_secret_string` |
| `JWT_EXPIRES_IN`| No | Token expiry duration | `7d` |
| `ALLOWED_ORIGINS`| Yes | Comma-separated list of allowed CORS domains | `http://localhost:3000,https://...` |
| `INITIAL_ADMIN_EMAIL` | Yes | Default email for first-time admin creation | `smsiam987@gmail.com` |
| `INITIAL_ADMIN_PASSWORD` | Yes | Default password for initial admin user | `AdminPassword123!` |
| `SMTP_HOST` | No | Gmail or SMTP host for sending contact emails | `smtp.gmail.com` |
| `SMTP_USER` | No | SMTP login username/email | `your_email@gmail.com` |
| `SMTP_PASS` | No | SMTP App Password | `xxxx xxxx xxxx xxxx` |

### Frontend (`frontend/.env.local`)

| Variable | Required | Description | Example |
| :--- | :---: | :--- | :--- |
| `NEXT_PUBLIC_BACKEND_URL` | Yes | Base URL pointing to the Backend API | `https://nexusagency-backend.onrender.com/api/v1` |

---

## 📡 API Endpoints Reference

All endpoints are prefixed with `/api/v1`.

### 🔓 Public Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/health` | Server status and database health check |
| `GET` | `/projects` | Retrieve all published agency portfolio projects |
| `GET` | `/projects/:slug` | Retrieve single project case study by slug |
| `GET` | `/services` | Retrieve all published services |
| `GET` | `/services/:slug` | Retrieve single service details by slug |
| `GET` | `/team` | Retrieve all active agency team members |
| `GET` | `/testimonials` | Retrieve all approved client testimonials |
| `POST` | `/contact` | Submit a client proposal or contact inquiry (Rate limited) |
| `POST` | `/auth/login` | Administrator sign-in (Returns JWT token) |

### 🔒 Admin Protected Endpoints (`Authorization: Bearer <token>`)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/admin/projects` | List all projects (including drafts) |
| `POST` | `/admin/projects` | Create a new project |
| `PUT` | `/admin/projects/:id` | Update project details, images, or status |
| `DELETE` | `/admin/projects/:id` | Permanently delete project |
| `GET` | `/admin/services` | List all services |
| `POST` | `/admin/services` | Create a new service offering |
| `PUT` | `/admin/services/:id` | Update service details or deliverables |
| `DELETE` | `/admin/services/:id` | Delete service |
| `GET` | `/admin/team` | List all team specialists |
| `POST` | `/admin/team` | Add a new team specialist |
| `PUT` | `/admin/team/:id` | Update team specialist details, photo, or order |
| `DELETE` | `/admin/team/:id` | Delete team member |
| `GET` | `/admin/testimonials` | List all client reviews |
| `POST` | `/admin/testimonials` | Add client testimonial |
| `PUT` | `/admin/testimonials/:id` | Update review content, rating, or publish state |
| `DELETE` | `/admin/testimonials/:id` | Delete testimonial |
| `GET` | `/admin/inquiries` | Retrieve client inquiry proposal submissions |
| `PATCH` | `/admin/inquiries/:id/status` | Mark inquiry status (`read`, `replied`, `archived`) |
| `DELETE` | `/admin/inquiries/:id` | Remove inquiry record |
| `GET` | `/admin/settings` | Get global agency profile & brand settings |
| `PUT` | `/admin/settings` | Update agency details & social handles |

---

## 👥 NexusAgency Team

Meet the core builders, engineers, and digital specialists behind NexusAgency:

| Specialist | Role | Specialties | Links |
| :--- | :--- | :--- | :--- |
| **SM Siam** | **Founder & Lead Developer** | Shopify Store Development, Liquid, React.js, Node.js, Next.js | [LinkedIn](https://www.linkedin.com/in/sm-siam598) • [GitHub](https://github.com/siam114) • [Website](https://siam-portfolio-theta.vercel.app/) |
| **MD Sumon** | **Shopify Specialist & Frontend Developer** | Custom Liquid Themes, Next.js, TypeScript, MERN Stack | [LinkedIn](https://www.linkedin.com/in/md-sumondev/) • [Facebook](https://www.facebook.com/poet.lover.4455) |
| **MD Samiul Islam** | **Sales Executive & WordPress Developer** | Client Communication, WordPress Themes, PHP Solutions | [Portfolio](https://nexusagency-five.vercel.app/team) |
| **Ibrahim Kholilullah** | **Shopify & WordPress Developer** | Shopify Storefronts, Liquid Customization, WooCommerce, Speed Optimization | [Portfolio](https://nexusagency-five.vercel.app/team) |
| **MD Salauddin Jony** | **SEO Specialist & WordPress Developer** | Technical SEO, Keyword Growth, CRO, Core Web Vitals, WordPress | [LinkedIn](https://www.linkedin.com/in/salauddin-jony/) • [Website](https://growscapers.co.uk) |
| **Masud Rana** | **Shopify Specialist & Full Stack Developer** | Liquid Theme Engineering, Full Stack Web Apps, Next.js, Node.js, GraphQL | [Portfolio](https://nexusagency-five.vercel.app/team) |
| **Tufael Ahmed Zuarder** | **Project Manager & WordPress Developer** | Project Management, Agile Workflows, Custom WordPress, PHP, Quality Assurance | [Portfolio](https://nexusagency-five.vercel.app/team) |

---

## 📄 License & Authors

This project is licensed under the **MIT License** — feel free to explore and learn from the codebase.

Designed and engineered with ❤️ by **[SM Siam](https://github.com/siam114)** and the **NexusAgency** engineering team.
