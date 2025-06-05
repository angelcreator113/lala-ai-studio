import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import multer from 'multer';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Health route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running 🚀' });
});

// Multer setup
const upload = multer({ dest: 'uploads/' });

// Auto-Caption route
app.post('/api/auto-caption', upload.single('video'), async (req, res) => {
  try {
    const videoPath = req.file.path;

    console.log(`🤖 Processing AI auto-caption for video: ${videoPath}`);

    // Simulated AI captions
    const aiCaptions = [
      { start: 0, end: 2, text: 'Hello and welcome!' },
      { start: 3, end: 5, text: 'This is an AI-generated caption.' },
      { start: 6, end: 8, text: 'Enjoy your video!' },
    ];

    // Cleanup uploaded file
    fs.unlinkSync(videoPath);

    res.json({ captions: aiCaptions });
  } catch (err) {
    console.error('Error in /api/auto-caption:', err);
    res.status(500).json({ error: 'Failed to auto-caption video.' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
