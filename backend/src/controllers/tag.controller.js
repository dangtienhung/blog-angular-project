import Post from '../models/posts.model.js';
import slugify from 'slugify';
import tagModel from '../models/tag.model.js';
import tagValidate from '../validates/tag.validate.js';

export const getTags = async (req, res) => {
  try {
    const data = await tagModel.find({});
    if (!data) {
      return res.status(400).send({ message: 'Fail', err: "Dont' get Tags" });
    }
    return res.status(200).send({ message: 'Success', data: data });
  } catch (error) {
    return res.status(500).send({ message: 'Fail', error: error });
  }
};

//get all posts by slug tag
export const hashTag = async (req, res) => {
  try {
    const { slug } = req.params;
    const tag = await tagModel.findOne({ slug: slug });
    if (!tag) {
      return res.status(400).send({ message: 'Fail', err: 'Not posts were found tagged' });
    }
    const data = await Post.find({ tags: { $in: [tag._id] } }).populate('tags');
    if (!data) {
      return res.status(400).send({ message: 'Fail', err: 'Get failed Posts' });
    }
    return res.status(200).send({ message: 'Success', data: data });
  } catch (error) {
    return res.status(500).send({ message: 'Fail', error: error });
  }
};

export const getTagById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await tagModel.findById(id);
    if (!data) {
      return res.status(400).send({ message: 'Fail', err: "Dont' get Tags" });
    }
    return res.status(200).send({ message: 'Success', data: [data] });
  } catch (error) {
    return res.status(500).send({ message: 'Fail', error: error });
  }
};

export const addTag = async (req, res) => {
  try {
    const { error } = tagValidate.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).send({ message: 'Fail', err: error.details.map((err) => err.message) });
    }
    /* create slug */
    const slug = slugify(req.body.title, { lower: true });
    /* create tag */
    const tag = { ...req.body, slug };
    const data = await tagModel.create(tag);
    if (!data) {
      return res.status(400).send({ message: 'Fail', err: "Can't add Tags" });
    }
    return res.status(200).send({ message: 'Success', data: data });
  } catch (error) {
    return res.status(500).send({ message: 'Fail', error: error });
  }
};

export const deleteTag = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await tagModel.findByIdAndRemove(id);
    if (!data) {
      return res.status(400).send({ message: 'Fail', err: "Dont' get Tags" });
    }
    await Post.updateMany({ tags: { $in: [id] } }, { $pull: { tags: id } });
    return res.status(200).send({ message: 'Success', data: data });
  } catch (error) {
    return res.status(500).send({ message: 'Fail', error: error });
  }
};

export const updateTag = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await tagModel.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!data) {
      return res.status(400).send({ message: 'Fail', err: "Dont' get Tags" });
    }
    return res.status(200).send({ message: 'Success', data: data });
  } catch (error) {
    return res.status(500).send({ message: 'Fail', error: error });
  }
};
