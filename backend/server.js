// server.js

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

// Import routes
import healthRouter from './routes/health.js';
import captionsRouter from './routes/captions.js';
import exportRouter from './routes/export.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve exports folder
app.use('/exports', express.static(path.join(process.cwd(), 'backend', 'exports')));

// API Routes
app.use('/api/health', healthRouter);
app.use('/api/captions', captionsRouter);
app.use('/api/export', exportRouter);

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
