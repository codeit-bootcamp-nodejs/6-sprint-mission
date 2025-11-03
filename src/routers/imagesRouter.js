import express from 'express';
import multer from 'multer';
import { withAsync } from '../lib/withAsync.js';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = process.env.UPLOAD_DIR || 'public/uploads';
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

const router = express.Router();

router.post('/', upload.single('image'), withAsync(async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'file required' });
  res.status(201).json({ path: '/uploads/' + req.file.filename });
}));

export default router;
