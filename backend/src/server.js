import http from 'http';
import createApp from './app.js';
import env from './config/env.js';
import { connectDatabase } from './config/database.js';

async function startServer() {
  try {
    await connectDatabase();

    const app = createApp();
    const server = http.createServer(app);

    server.listen(env.port, () => {
      console.log(
        `[server] IntellMeet backend running on port ${env.port} (${env.nodeEnv})`
      );
      console.log(`[server] Health check: http://localhost:${env.port}/api/health`);
    });

    const shutdown = (signal) => {
      console.log(`[server] Received ${signal}, shutting down gracefully...`);
      server.close(() => {
        console.log('[server] HTTP server closed');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
  } catch (error) {
    console.error('[server] Failed to start server:', error.message);
    process.exit(1);
  }
}

startServer();
