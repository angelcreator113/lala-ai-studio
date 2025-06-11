// backend/routes/stitchClips.js
import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { exec } from 'child_process';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/stitch', upload.array('clips'), async (req, res) => {
  const files = req.files;
  if (!files || files.length === 0) {
    return res.status(400).json({ error: 'No clips uploaded' });
  }

  const listPath = 'uploads/concat_list.txt';
  const outputPath = `uploads/stitched-${Date.now()}.mp4`;

  try {
    const listContent = files.map(f => `file '${path.resolve(f.path)}'`).join('\n');
    fs.writeFileSync(listPath, listContent);

    exec(`ffmpeg -f concat -safe 0 -i ${listPath} -c copy ${outputPath}`, (error) => {
      if (error) {
        return res.status(500).json({ error: 'FFmpeg error during stitching' });
      }
      res.json({ url: `/${outputPath}` });
    });
  } catch (e) {
    res.status(500).json({ error: 'Server error during stitching' });
  }
});

export default router;
