import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Backend is running 🚀" });
});

// Mock AI Captions
app.post("/api/captions/generate", (req, res) => {
  console.log("[POST] /api/captions/generate", req.body);

  // Mock captions
  const mockCaptions = [
    { start: 0, end: 2, text: "Welcome to Lala AI Studio!" },
    { start: 2, end: 5, text: "This is your AI caption generator." },
    { start: 5, end: 7, text: "You can save and export captions." },
  ];

  res.json({ captions: mockCaptions });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});
