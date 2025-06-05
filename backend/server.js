import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import healthRouter from './routes/health.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/health', healthRouter);

// Echo test route (keep this for frontend connector test)
app.post('/api/echo', (req, res) => {
  const { message } = req.body;
  console.log('📣 Echo received:', message);
  res.json({ reply: `You said: ${message}` });
});

// AI Caption Generation route 🚀
app.post('/api/generate-captions', async (req, res) => {
  const { videoUrl } = req.body;
  console.log('🎥 Generating captions for video:', videoUrl);

  // Simulate AI caption generation
  const fakeCaptions = [
    { start: 0, end: 3, text: 'Hello world!' },
    { start: 4, end: 7, text: 'This is an AI generated caption.' },
  ];

  // Simulate delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  res.json({ status: 'ok', captions: fakeCaptions });
});

// Root
app.get('/', (req, res) => {
  res.send('Lala AI Studio Backend is running 🚀✨');
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
