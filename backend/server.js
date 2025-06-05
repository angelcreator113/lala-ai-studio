// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import healthRouter from './routes/health.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/health', healthRouter);

// ✨ Dummy captions endpoint
app.post('/api/captions', (req, res) => {
  const { videoUrl } = req.body;
  console.log(`🤖 Generating captions for video: ${videoUrl}`);

  // Dummy captions
  const captions = [
    { start: 0, end: 5, text: 'Hello world' },
    { start: 5, end: 10, text: 'This is an AI-generated caption' },
    { start: 10, end: 15, text: 'Lala AI Studio rocks! 🚀' },
  ];

  res.json({ captions });
});

// Root
app.get('/', (req, res) => {
  res.send('Lala AI Studio Backend is running 🚀✨');
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
