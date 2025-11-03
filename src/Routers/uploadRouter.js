import express from 'express';
import multer from 'multer';
import {
    UploadSingleImage
} from '../apis/uploadapi.js';

const uploadRouter = express.Router();

const upload = multer({ dest: 'upload/' });

uploadRouter.post('/', upload.single('attachment'),
    UploadSingleImage);

uploadRouter.use('/', express.static('upload'));

export default uploadRouter;
