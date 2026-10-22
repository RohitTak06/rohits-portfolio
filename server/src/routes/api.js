import express from 'express';
import { submitContactMessage } from '../controllers/contactController.js';
import { downloadResumePdf, downloadResumeDocx } from '../controllers/resumeController.js';
import { contactFormLimiter } from '../middleware/rateLimiter.js';
import { ensureDBConnected } from '../config/db.js';

const router = express.Router();

/**
 * Health check endpoint.
 * @route GET /api/health
 */
router.get('/health', async (req, res) => {
  const databaseConnected = Boolean(await ensureDBConnected());
  const dbStatus = databaseConnected ? 'connected' : 'disconnected';
  res.status(databaseConnected ? 200 : 503).json({
    success: databaseConnected,
    status: databaseConnected ? 'healthy' : 'degraded',
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime()),
    services: {
      api: 'operational',
      database: dbStatus,
    },
    version: '1.0.0',
  });
});

/**
 * Contact form submission.
 * @route POST /api/contact
 */
router.post('/contact', contactFormLimiter, submitContactMessage);

/**
 * Resume download routes.
 * @route GET /api/resume/pdf
 * @route GET /api/resume/docx
 */
router.get('/resume/pdf', downloadResumePdf);
router.get('/resume/docx', downloadResumeDocx);

export default router;
