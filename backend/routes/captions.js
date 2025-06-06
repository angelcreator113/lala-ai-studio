// backend/routes/captions.js
import express from "express";
const router = express.Router();

router.post("/generate", (req, res) => {
  // Simulated AI captions
  res.json({
    captions: [
      { start: "00:00:01", end: "00:00:03", text: "Hello and welcome!" },
      { start: "00:00:04", end: "00:00:06", text: "This is an AI caption demo." },
    ],
  });
});

router.post("/refine", (req, res) => {
  // Simulated refinement
  const refined = req.body.captions.map((cap) => ({
    ...cap,
    text: cap.text + " (refined)",
  }));
  res.json({ captions: refined });
});

export default router;
