// backend/routes/ai.js
import express from 'express';

const router = express.Router();

// Mock AI formatting endpoint
router.post('/format-captions', (req, res) => {
  const { captions, style } = req.body;
  console.log('🧠 AI formatting captions:', { style });

  // Simulate formatting
  const formattedCaptions = captions.map((cap) => ({
    ...cap,
    style: style,
    effects: ['fade-in', 'bold'], // Example effects
  }));

  res.json({
    status: 'ok',
    formattedCaptions,
  });
});

// Mock export endpoint
router.get('/export-captions', (req, res) => {
  const { videoId } = req.query;
  console.log(`🎬 Exporting captions for videoId=${videoId}`);

  // Simulate export - in reality you'd generate a .srt or .vtt or burn-in FFmpeg command
  const mockExportPath = `/exports/${videoId}-captions.srt`;

  res.json({
    status: 'ok',
    exportPath: mockExportPath,
    message: `Captions exported to ${mockExportPath}`,
  });
});

export default router;
