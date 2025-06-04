// Import required modules
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Initialize dotenv to load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json

// Load PORT from .env or fallback to 3000
const PORT = process.env.PORT || 3000;

// Routes

// Health check route
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Backend is alive 🚀' });
});

// Simple echo connector route
app.post('/echo', (req, res) => {
    const { message } = req.body;
    res.json({
        echoed: message,
        time: new Date().toISOString()
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});
