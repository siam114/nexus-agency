# NexusAgency Backend API

Production-ready backend REST API for the **NexusAgency** website and administrative dashboard. Built with **Node.js**, **Express**, **TypeScript**, and **MongoDB (Mongoose)**, featuring **JWT authentication**, **Zod request validation**, **rate limiting**, **helmet security**, and automated integration tests with **Vitest**.

---

## 1. Architecture Overview

- **Runtime & Language**: Node.js (v20+ / v24+) with TypeScript.
- **Web Framework**: Express 4 with modular routers.
- **Database**: MongoDB (via Mongoose ODM) with resilient fallback data caching.
- **Authentication**: Stateless JSON Web Tokens (JWT) & `bcryptjs` password hashing (salt rounds: 12).
- **Validation**: Schema-level request body validation via Zod.
- **Security**:
  - `helmet` security headers.
  - CORS with configurable origin whitelisting (`ALLOWED_ORIGINS`).
  - Rate limiting on public contact inquiry submissions and admin login attempts.
- **Testing**: Automated integration testing via `vitest` and `supertest`.
- **Deployment**: Dual compatibility:
  - Standalone server for local development, VPS, Render, or Railway (`src/server.ts`).
  - Serverless function export for Vercel deployment (`api/index.ts`).

---

## 2. Directory Structure

```text
backend/
├── api/
│   └── index.ts                 # Vercel Serverless Function entry point
├── scripts/
│   └── seed.ts                  # Database seeder (seeds initial content & admin user)
├── src/
│   ├── server.ts                # Standalone HTTP listener (port 5000)
│   ├── app.ts                   # Express app setup and middleware pipeline
│   ├── config/
│   │   ├── db.ts                # MongoDB connection manager with resilient fallback
│   │   └── env.ts               # Zod-validated environment configuration
│   ├── controllers/             # HTTP handlers for projects, services, auth, etc.
│   ├── data/
│   │   └── initialData.ts       # Real agency seed data (7 projects, 6 services, team, etc.)
│   ├── middleware/              # Auth guard, rate limiters, error & validator middleware
│   ├── models/                  # Mongoose models (User, Project, Service, Inquiry, etc.)
│   ├── routes/                  # API routers mounted under /api/v1
│   ├── services/                # Business logic and database operations
│   ├── types/                   # Shared TypeScript interfaces
│   ├── utils/                   # Response helpers, logger, slug generator
│   └── validators/              # Zod validation schemas
├── tests/                       # Vitest integration test suites
├── .env.example                 # Configuration template
├── package.json
├── tsconfig.json
└── vitest.config.ts
```

---

## 3. Quick Start & Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Edit `.env` to supply your configuration:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/nexusagency
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d
ALLOWED_ORIGINS=http://localhost:3000
INITIAL_ADMIN_EMAIL=smsiam987@gmail.com
INITIAL_ADMIN_PASSWORD=AdminPassword123!
INITIAL_ADMIN_NAME=Siam Ahmed
```

> **Note**: If MongoDB is not yet running locally, the API will seamlessly start in **resilient fallback mode**, serving the existing verified agency data with 100% uptime.

### 3. Seed Database & Create Initial Administrator
Once your MongoDB connection is established (local or MongoDB Atlas URI):
```bash
npm run seed
```
This will automatically:
1. Create the initial administrator user (`smsiam987@gmail.com`).
2. Seed all **7 Projects** with complete case study content.
3. Seed all **6 Services** with features and FAQs.
4. Seed **Team Members**, **Testimonials**, and **Agency Settings**.

### 4. Run Development Server
```bash
npm run dev
```
The server will start at `http://localhost:5000`.
Health check: `http://localhost:5000/api/v1/health`

---

## 4. API Endpoints

### Public Endpoints (`/api/v1/*`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/health` | Health status and database connection state |
| `GET` | `/api/v1/projects` | List published projects (supports `?category=`, `?featured=true`) |
| `GET` | `/api/v1/projects/:slug` | Full case study details for an individual project |
| `GET` | `/api/v1/services` | List all published agency services |
| `GET` | `/api/v1/services/:slug` | Detailed service content, offerings, and FAQs |
| `GET` | `/api/v1/team` | List active team members and verified social links |
| `GET` | `/api/v1/testimonials` | List published client testimonials |
| `GET` | `/api/v1/settings` | Public website settings and contact channels |
| `POST` | `/api/v1/contact` | Submit project inquiry (rate limited, Zod validated) |

### Authentication (`/api/v1/auth/*`)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/v1/auth/login` | Administrator login (returns JWT token) |
| `GET` | `/api/v1/auth/me` | Current authenticated admin profile (`Bearer <token>`) |

### Protected Admin Endpoints (`/api/v1/admin/*` — Requires `Authorization: Bearer <token>`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/admin/projects` | List all projects (including drafts) |
| `POST` | `/api/v1/admin/projects` | Create a new project |
| `GET` | `/api/v1/admin/projects/:id` | Get project by ID for editing |
| `PATCH` | `/api/v1/admin/projects/:id` | Update project content |
| `DELETE` | `/api/v1/admin/projects/:id` | Delete project |
| `PATCH` | `/api/v1/admin/projects/:id/publish` | Toggle publish/draft status |
| `GET` | `/api/v1/admin/services` | List all services |
| `POST` | `/api/v1/admin/services` | Create new service |
| `PATCH` | `/api/v1/admin/services/:id` | Update service |
| `DELETE` | `/api/v1/admin/services/:id` | Delete service |
| `GET` | `/api/v1/admin/team` | List all team members |
| `POST` | `/api/v1/admin/team` | Add team member |
| `PATCH` | `/api/v1/admin/team/:id` | Update team member |
| `DELETE` | `/api/v1/admin/team/:id` | Delete team member |
| `GET` | `/api/v1/admin/testimonials` | List all testimonials |
| `POST` | `/api/v1/admin/testimonials` | Create testimonial |
| `PATCH` | `/api/v1/admin/testimonials/:id` | Update testimonial |
| `DELETE` | `/api/v1/admin/testimonials/:id` | Delete testimonial |
| `GET` | `/api/v1/admin/inquiries` | List contact form submissions (`?status=new`) |
| `GET` | `/api/v1/admin/inquiries/:id` | View inquiry details |
| `PATCH` | `/api/v1/admin/inquiries/:id/status` | Update inquiry status (`in_progress`, `resolved`, `archived`) |
| `DELETE` | `/api/v1/admin/inquiries/:id` | Delete inquiry |
| `PATCH` | `/api/v1/admin/settings` | Update agency info, hero, or social links |

---

## 5. Automated Testing

Run the test suite with Vitest:
```bash
npm run test
```
Runs 14 integration tests covering:
- Health checks & metadata.
- Zod schema validation for contact submissions and auth payloads.
- Authentication rejection of unauthorized requests.
- JWT verification for admin operations.
- Project listing, category filtering, and slug lookups.
- Contact inquiry submission and status persistence.

---

## 6. Vercel Deployment Guide

To deploy the backend to Vercel:
1. Connect your repository to Vercel.
2. In the Vercel Project Settings:
   - **Root Directory**: `backend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Add the following **Environment Variables** in Vercel Project Settings:
   - `MONGODB_URI`: Your MongoDB Atlas connection string (`mongodb+srv://...`).
   - `JWT_SECRET`: A secure random secret string.
   - `ALLOWED_ORIGINS`: Your production frontend URL (e.g. `https://nexusagency.com`).
   - `NODE_ENV`: `production`
4. Deploy! Vercel will automatically route requests through `api/index.ts`.

