// backend/routes/health.js

import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: '✅ Backend is healthy! 🚀✨'
  });
});

export default router;
