import multer from 'multer';
export const ErrorFile = async (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code == 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).send({ message: 'file must be an image' });
    }
  }
  next();
};
