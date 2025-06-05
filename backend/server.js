import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.send({ status: 'ok', message: 'Lala AI Studio Backend is running 🚀✨' });
});

// Save captions (with effects)
app.post('/api/captions', (req, res) => {
  const captions = req.body.captions;
  console.log('Saving captions:', captions);

  fs.writeFileSync('backend/exports/captions.json', JSON.stringify(captions, null, 2));

  res.send({ status: 'ok', message: 'Captions saved successfully!' });
});

// Export captions (download latest)
app.get('/api/export', (req, res) => {
  const filePath = 'backend/exports/captions.json';
  res.download(filePath, 'captions.json');
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.send({ status: 'ok', message: 'Lala AI Studio Backend is running 🚀✨' });
});

// Save captions (with effects)
app.post('/api/captions', (req, res) => {
  const captions = req.body.captions;
  console.log('Saving captions:', captions);

  fs.writeFileSync('backend/exports/captions.json', JSON.stringify(captions, null, 2));

  res.send({ status: 'ok', message: 'Captions saved successfully!' });
});

// Export captions (download latest)
app.get('/api/export', (req, res) => {
  const filePath = 'backend/exports/captions.json';
  res.download(filePath, 'captions.json');
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
