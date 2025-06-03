const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const healthRouter = require('./routes/health');
app.use('/', healthRouter);

// Add your other routes here
// const videoRouter = require('./routes/video');
// app.use('/video', videoRouter);

// Root route (optional)
app.get('/', (req, res) => {
  res.send('Lala AI Studio Backend is running 🚀✨');
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
