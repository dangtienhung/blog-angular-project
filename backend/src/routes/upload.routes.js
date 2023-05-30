import { deleteImage, uploadImage } from '../controllers/upload.controller.js';

import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';
import express from 'express';
import multer from 'multer';

const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'MonkeyBlogging',
    format: 'png', // supports promises as well
  },
});

const upload = multer({ storage: storage });

router.post('/images/upload', upload.array('images', 2), uploadImage);
router.delete('/images/:public_id', deleteImage);

export default router;
