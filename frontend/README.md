# IntellMeet Frontend

React 19 + TypeScript + Vite application for IntellMeet.

> **Status:** Day 1 foundation only — a placeholder page that proves the
> app builds and runs. No auth or real dashboard functionality yet.

## Prerequisites

- Node.js 18+

## Setup

```bash
cd frontend
cp .env.example .env
npm install
```

## Run

```bash
npm run dev
```

App runs at `http://localhost:5173`.

## Build

```bash
npm run build
```

## Project Structure

```
frontend/
├── src/
│   ├── main.tsx           # Application entry point
│   ├── App.tsx             # Root component
│   ├── components/         # Reusable UI components (Day 2+)
│   ├── pages/               # Route-level pages
│   ├── layouts/             # Layout wrappers (Day 2+)
│   ├── hooks/                # Custom React hooks (Day 2+)
│   ├── services/            # API client functions
│   ├── store/                # Zustand stores (Day 2+)
│   ├── types/                # Shared TypeScript types (Day 2+)
│   ├── lib/                  # Config and small utilities
│   └── assets/               # Static assets
├── public/
├── vite.config.ts
└── tsconfig.json
```

## Environment Variables

| Variable        | Description                  |
|-----------------|-------------------------------|
| `VITE_API_URL`  | Base URL of the backend API   |

Planned but not yet wired up on Day 1: Tailwind CSS, shadcn/ui,
TanStack Query, Zustand, Socket.io client.
