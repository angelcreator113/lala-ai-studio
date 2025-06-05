import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is alive 🚀' });
});

// Echo route (existing)
app.post('/echo', (req, res) => {
  const { message } = req.body;
  res.json({ message: `Echo: ${message}` });
});

// Upload captions route (new)
app.post('/api/upload-captions', (req, res) => {
  const captions = req.body.captions;
  console.log('📥 Received captions:', captions);

  // Future: save to DB or process captions
  res.json({ status: 'ok', message: 'Captions received 🚀', count: captions.length });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
