// routes/export.js

import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();

// POST /api/export
router.post('/', (req, res) => {
  const captions = req.body.captions;

  if (!captions || !Array.isArray(captions)) {
    return res.status(400).json({ error: 'Invalid captions format' });
  }

  const exportText = captions.map(caption => 
    `[${caption.start} - ${caption.end}] ${caption.text}`
  ).join('\n');

  const exportPath = path.join(process.cwd(), 'backend', 'exports', 'captions_export.txt');

  fs.writeFile(exportPath, exportText, (err) => {
    if (err) {
      console.error('Error writing export:', err);
      return res.status(500).json({ error: 'Failed to save captions export' });
    }

    console.log('✅ Captions exported to', exportPath);
    res.json({ message: 'Captions exported successfully', file: '/exports/captions_export.txt' });
  });
});

export default router;
