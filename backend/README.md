# IntellMeet Backend

Express + MongoDB (Mongoose) API server for IntellMeet.

> **Status:** Day 1 foundation only. No auth, no business models, no
> real-time or AI features yet.

## Prerequisites

- Node.js 18+
- MongoDB running locally (or via the provided Docker Compose file)

## Setup

```bash
cd backend
cp .env.example .env
npm install
```

## Run

```bash
npm run dev     # auto-restarts on file changes (node --watch)
# or
npm start
```

Server starts on `http://localhost:5000` by default.

## Health Check

```bash
curl http://localhost:5000/api/health
```

Expected response:

```json
{
  "status": "ok",
  "service": "intellmeet-backend",
  "timestamp": "2026-09-23T00:00:00.000Z"
}
```

## Project Structure

```
backend/
├── src/
│   ├── app.js            # Express app configuration (middleware, routes)
│   ├── server.js         # HTTP server startup, DB connection, shutdown
│   ├── config/
│   │   ├── env.js        # Environment variable loading/validation
│   │   └── database.js   # Mongoose connection
│   ├── controllers/      # Route handlers (Day 2+)
│   ├── middleware/       # Express middleware (Day 2+)
│   ├── models/           # Mongoose models (Day 2+)
│   ├── routes/           # Route definitions
│   ├── services/         # Business logic (Day 2+)
│   ├── socket/           # Socket.io handlers (Day 2+)
│   └── utils/            # Shared utilities
└── tests/
```

## Environment Variables

See `.env.example` for the full list. Required for Day 1:

| Variable       | Description                        |
|----------------|-------------------------------------|
| `NODE_ENV`     | `development` / `production`        |
| `PORT`         | Port the server listens on          |
| `CLIENT_URL`   | Frontend origin, used for CORS      |
| `MONGODB_URI`  | MongoDB connection string           |
