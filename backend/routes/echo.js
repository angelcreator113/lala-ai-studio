import express from 'express';
const router = express.Router();

// Simple echo API
router.post('/', (req, res) => {
  const { message } = req.body;
  console.log('Received message:', message);
  res.json({ reply: `Echo: ${message}` });
});

export default router;
