# IntellMeet

**AI-Powered Enterprise Meeting & Collaboration Platform**

## Purpose

IntellMeet is planned as an enterprise meeting platform that combines
video collaboration with AI-assisted transcription, summaries, and
action-item tracking. This repository currently contains the **Day 1
project foundation only** — the boilerplate that later features will
be built on top of.

## Technology Stack

| Layer          | Technologies |
|-----------------|--------------|
| Frontend         | React 19, TypeScript, Vite, Tailwind CSS v4, shadcn/ui, TanStack Query, Zustand |
| Backend           | Node.js, Express, JavaScript ES Modules, MongoDB, Mongoose |
| Real-time          | Socket.io, WebRTC |
| AI                   | OpenAI / Hugging Face |
| Authentication  | JWT, bcrypt |
| Cache              | Redis |
| File Storage     | Cloudinary / AWS S3 |
| Deployment       | Docker, Kubernetes, Helm |
| CI/CD               | GitHub Actions |
| Monitoring       | Prometheus, Grafana, Sentry |

Only the pieces needed for the Day 1 foundation (Express, Mongoose,
React + Vite, and Docker Compose for local MongoDB/Redis) are actually
configured right now. Everything else in the table above is the
planned full stack for later days.

## Architecture

Frontend and backend are **independently deployable** applications
that communicate over HTTP (and, in later days, WebSockets):

```
┌─────────────────┐        HTTP/REST        ┌──────────────────┐
│   frontend/       │  ─────────────────────▶ │    backend/        │
│  React + Vite      │                          │  Express + Mongoose │
└─────────────────┘                           └──────────────────┘
                                                       │
                                                       ▼
                                                 ┌───────────┐
                                                 │ MongoDB   │
                                                 └───────────┘
```

## Folder Structure

```
IntellMeet/
├── frontend/                # React 19 + TypeScript + Vite app
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── store/
│   │   ├── types/
│   │   ├── lib/
│   │   └── assets/
│   ├── public/
│   └── package.json
│
├── backend/                  # Express + Mongoose API server
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── socket/
│   │   └── utils/
│   ├── tests/
│   └── package.json
│
├── infrastructure/
│   ├── docker/               # docker-compose.yml (dev MongoDB + Redis)
│   ├── k8s/                    # Kubernetes manifests (future)
│   └── helm/                   # Helm charts (future)
│
├── docs/
├── .github/                   # CI/CD workflows (future)
├── .gitignore
├── Makefile
└── README.md
```

## Prerequisites

- Node.js 18+
- npm
- Docker + Docker Compose (for local MongoDB/Redis)

## Installation

```bash
git clone <repo-url> IntellMeet
cd IntellMeet
make install
# or manually:
cd backend && npm install
cd ../frontend && npm install
```

## Environment Setup

Copy the example env files and adjust as needed:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

Backend (`backend/.env`):

```
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:5173
MONGODB_URI=mongodb://127.0.0.1:27017/intellmeet
```

Frontend (`frontend/.env`):

```
VITE_API_URL=http://localhost:5000/api
```

## Starting MongoDB / Redis

```bash
make infra-up
# equivalent to:
docker compose -f infrastructure/docker/docker-compose.yml up -d
```

This exposes MongoDB on `27017` and Redis on `6379`. Redis is
infrastructure preparation only — no application code uses it yet.

## Starting the Backend

```bash
cd backend
npm run dev
```

Runs on `http://localhost:5000`.

## Starting the Frontend

```bash
cd frontend
npm run dev
```

Runs on `http://localhost:5173`.

## Backend Health Check

```
GET http://localhost:5000/api/health
```

```json
{
  "status": "ok",
  "service": "intellmeet-backend",
  "timestamp": "2026-09-23T00:00:00.000Z"
}
```

## Day 1 Completion Status

| Item | Status |
|------|--------|
| Folder structure (frontend/backend/infrastructure independent) | Done |
| Express app with CORS, Helmet, JSON parsing | Done |
| Mongoose connection with fail-fast on error | Done |
| `GET /api/health` endpoint | Done |
| React 19 + TypeScript + Vite frontend scaffold | Done |
| Placeholder dashboard page (proves frontend runs) | Done |
| `.env.example` for frontend and backend | Done |
| `.gitignore` excluding secrets/build artifacts | Done |
| Dev Docker Compose for MongoDB + Redis | Done |
| Root/backend/frontend READMEs | Done |
| Initial Git commit | Done |
| Dependency installation / dev servers verified in this sandbox | **Not run — see note below** |

> **Note on validation:** this container has no outbound network
> access and no Docker daemon, so `npm install`, `docker compose up`,
> and the dev servers could not actually be executed here. All files
> were written and reviewed for correctness; please run the commands
> above on your machine to install dependencies and confirm the
> health check and frontend load correctly.

Not implemented (by design, reserved for later days): authentication,
JWT/refresh tokens, bcrypt, profile management, meeting CRUD, AI
transcription/summaries, chat, WebRTC video, Redis session/cache
logic, and production deployment (Docker images for the apps,
Kubernetes, Helm, CI/CD pipelines, monitoring).
