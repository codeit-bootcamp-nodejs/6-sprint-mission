import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadImage = async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'file required' });
  const rel = path.relative(path.join(__dirname, '..'), req.file.path);
  res.status(201).json({ path: '/uploads/' + req.file.filename });
};
