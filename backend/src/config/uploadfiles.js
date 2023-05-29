import multer from 'multer';
import { __dirname } from '../../path.js';
export default {
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname + '/public');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
  fileFilter: function (req, file, cb) {
    if (file.mimetype && file.mimetype.split('/')[0] == 'image') {
      cb(null, true);
    } else {
      cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE'), false);
    }
  },
};
