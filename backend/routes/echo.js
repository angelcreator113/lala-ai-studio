import express from 'express';
const router = express.Router();

router.post('/', (req, res) => {
  const { message } = req.body;
  console.log('🟢 Echo received:', message);

  res.json({
    echoed: `🗣️ You said: "${message}" 🚀`
  });
});

export default router;
