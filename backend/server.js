import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import healthRouter from './routes/health.js';
import fs from 'fs';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Health route
app.use('/api/health', healthRouter);

// Echo route
app.post('/api/echo', (req, res) => {
  const { message } = req.body;
  res.json({ response: `Echo: ${message}` });
});

// Save captions
app.post('/api/save-captions', (req, res) => {
  const { captions } = req.body;
  const filePath = path.join(process.cwd(), 'backend', 'exports', 'captions.json');
  fs.writeFileSync(filePath, JSON.stringify(captions, null, 2));
  res.json({ success: true, path: filePath });
});

// Export captions
app.get('/api/export-captions', (req, res) => {
  const filePath = path.join(process.cwd(), 'backend', 'exports', 'captions.json');
  res.download(filePath);
});

// Phase 13 — AI Refine Captions
app.post('/api/ai-refine', (req, res) => {
  const { captions } = req.body;
  console.log('AI Refine requested:', captions);

  // Simulate AI refinement
  const refined = captions.map(cap => ({
    ...cap,
    text: cap.text + ' (refined ✨)',
  }));

  res.json({ captions: refined });
});

app.get('/', (req, res) => {
  res.send('Lala AI Studio Backend is running 🚀✨');
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
