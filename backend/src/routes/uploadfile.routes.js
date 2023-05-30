import express from 'express';
import multer from 'multer';
import configupload from '../config/uploadfiles.js';
import { UploadFiles } from '../controllers/upload.controller.js';
import { ErrorFile } from '../middleware/errorFile.js';
const UploadFileRouter = express.Router();
const uploads = multer({
  storage: configupload.storage,
  fileFilter: configupload.fileFilter,
});
UploadFileRouter.post('/uploadfiles', uploads.array('files'), UploadFiles, ErrorFile);
export default UploadFileRouter;
