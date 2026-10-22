import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import apiRouter from './routes/api.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';
import { generalApiLimiter } from './middleware/rateLimiter.js';

dotenv.config();

const app = express();
app.set('trust proxy', 1);

// Security Headers with Helmet
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

// CORS configuration supporting development, local Vite, and production URLs
const allowedOrigins = [
  process.env.CLIENT_URL,
  'https://rohits-portfolio-tyg3.vercel.app',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or server-to-server)
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        origin.endsWith('.vercel.app') ||
        process.env.NODE_ENV !== 'production'
      ) {
        return callback(null, true);
      }
      return callback(new Error(`CORS policy blocked access from origin: ${origin}`));
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true,
  })
);

// Logging in non-test environments
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Body parsing with strict payload limits
app.use(express.json({ limit: '50kb' }));
app.use(express.urlencoded({ extended: true, limit: '50kb' }));

// Apply general rate limiting across all API routes
app.use('/api', generalApiLimiter);

// Mount main API router
app.use('/api', apiRouter);

// Root route providing helpful API info
app.get('/', (req, res) => {
  res.status(200).json({
    message: "Rohit Tak's Portfolio API is running.",
    documentation: '/api/health',
    endpoints: {
      health: 'GET /api/health',
      contact: 'POST /api/contact',
      resumePdf: 'GET /api/resume/pdf',
      resumeDocx: 'GET /api/resume/docx',
    },
  });
});

// 404 & Centralized Error Handlers
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
