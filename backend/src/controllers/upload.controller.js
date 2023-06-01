import cloudinary from '../config/cloudinary.js';

export const UploadFiles = (req, res) => {
  try {
    if (req.files.length <= 0) {
      return res.status(400).send({ message: 'File is not correct' });
    }
    return res.status(200).send({ data: req.files.map((item) => item.originalname) });
  } catch (error) {}
};

/* upload hình ảnh */
export const uploadImage = async (req, res) => {
  try {
    const files = req.files;
    console.log('🚀 ~ file: upload.controller.js:16 ~ uploadImage ~ files:', files);
    if (!Array.isArray(files)) {
      return res.status(400).send({ message: 'File is not correct' });
    }
    const uploadPromises = files.map((file) => {
      return cloudinary.uploader.upload(file.path);
    });
    const results = await Promise.all(uploadPromises);
    const uploadedFiles = results.map((result) => ({
      url: result.secure_url,
      public_id: result.public_id,
    }));
    return res.status(200).send({ urls: uploadedFiles });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

/* delete hình ảnh */
export const deleteImage = async (req, res) => {
  try {
    const publicId = req.params.public_id;
    if (!publicId) {
      return res.status(400).send({ message: 'Public id is not correct' });
    }
    const result = await cloudinary.uploader.destroy(publicId);
    if (result.result !== 'ok') {
      return res.status(400).send({ message: 'Delete image is not correct', urls: result });
    }
    return res.status(200).send({ message: 'Delete image successfully' });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
