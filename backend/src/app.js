import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import env from './config/env.js';
import healthRoutes from './routes/health.routes.js';

/**
 * Builds and configures the Express application.
 * Kept separate from server.js so the app can be imported in tests
 * without binding to a port.
 */
function createApp() {
  const app = express();

  app.use(
    cors({
      origin: env.clientUrl,
      credentials: true,
    })
  );
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use('/api', healthRoutes);

  // 404 handler
  app.use((req, res) => {
    res.status(404).json({ status: 'error', message: 'Route not found' });
  });

  // Centralized error handler
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    console.error('[app] Unhandled error:', err);
    res.status(err.status || 500).json({
      status: 'error',
      message: env.nodeEnv === 'production' ? 'Internal server error' : err.message,
    });
  });

  return app;
}

export default createApp;
