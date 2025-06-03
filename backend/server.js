import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import healthRoutes from './routes/health.js';
import echoRoutes from './routes/echo.js'; // 🚀 NEW!

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // 🚀 Needed for POST body parsing

// Routes
app.get('/', (req, res) => {
  res.send('Lala AI Studio Backend is running 🚀✨');
});
app.use('/health', healthRoutes);
app.use('/api/echo', echoRoutes); // 🚀 NEW!

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
