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

// Root
app.get('/', (req, res) => {
  res.send('Lala AI Studio Backend is running 🚀✨');
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
