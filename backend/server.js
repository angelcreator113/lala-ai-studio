import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import healthRouter from './routes/health.js';
import fs from 'fs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/health', healthRouter);

app.post('/api/refine-captions', (req, res) => {
  const captions = req.body.captions || [];
  const refined = captions.map((cap) => ({
    ...cap,
    text: cap.text.trim().replace(/\s+/g, ' '), // simple refine
  }));
  res.json({ captions: refined });
});

app.post('/api/export-captions', (req, res) => {
  const captions = req.body.captions || [];
  const srt = captions
    .map(
      (cap, i) =>
        `${i + 1}\n${formatTime(cap.start)} --> ${formatTime(cap.end)}\n${cap.text}\n`
    )
    .join('\n');
  const filePath = './exports/captions.srt';
  fs.writeFileSync(filePath, srt);
  res.json({ message: 'Captions exported', filePath });
});

function formatTime(seconds) {
  const date = new Date(null);
  date.setSeconds(seconds);
  return date.toISOString().substr(11, 8) + ',000';
}

app.get('/', (req, res) => {
  res.send('Lala AI Studio Backend is running 🚀✨');
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
