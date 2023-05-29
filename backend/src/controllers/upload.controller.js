export const UploadFiles = (req, res) => {
  try {
    if (req.files.length <= 0) {
      return res.status(400).send({ message: 'File is not correct' });
    }
    return res.status(200).send({ data: req.files.map((item) => item.originalname) });
  } catch (error) {}
};
