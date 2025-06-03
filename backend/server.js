// backend/server.js
const express = require('express');
const cors = require('cors');
const healthRoute = require('./routes/health');

const app = express();
const PORT = 3000;

// Enable CORS
app.use(cors());

// Modular route
app.use('/health', healthRoute);

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
