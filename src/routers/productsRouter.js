import express from 'express';
import multer from 'multer';
import { withAsync } from '../lib/withAsync.js';
import * as ctrl from '../controllers/productsController.js';
import { validateProduct } from '../structs/productsStructs.js';
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
  },
});
const upload = multer({ storage });

const router = express.Router();

router
  .route('/')
  .post(
    withAsync(async (req, res) => {
      return ctrl.createProduct(req, res);
    })
  )
  .get(withAsync(ctrl.listProducts));

router.post(
  '/:id/image',
  upload.single('image'),
  withAsync(async (req, res) => {
    const id = Number(req.params.id);
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'file required' });
    const imageUrl = '/uploads/' + file.filename;
    const updated = await (
      await import('../lib/prismaClient.js')
    ).prisma.product.update({
      where: { id },
      data: { imageUrl },
    });
    res.json(updated);
  })
);

router
  .route('/:id')
  .get(withAsync(ctrl.getProduct))
  .patch(withAsync(ctrl.updateProduct))
  .delete(withAsync(ctrl.deleteProduct));

export default router;
