import { Router } from 'express';

const router = Router();

// GET /api/health
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'intellmeet-backend',
    timestamp: new Date().toISOString(),
  });
});

export default router;
