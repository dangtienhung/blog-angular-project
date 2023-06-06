import CatValidate from '../validates/categories.validate.js';
import Category from '../models/categories.model.js';
import slugify from 'slugify';

// import slugify from 'slugify';

export const getCategories = async (req, res) => {
  try {
    const data = await Category.find({});
    if (!data) {
      return res.status(404).send({ message: 'fail', error: 'Loi' });
    }
    return res.status(200).send({ message: 'success', data: data });
  } catch (error) {
    return res.status(500).send({ message: 'fail', error: 'Loi he thong' });
  }
};

export const getItem = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Category.findById(id);
    if (!data) {
      return res.status(404).send({ message: 'fail', error: 'Ko tim thay Category' });
    }
    return res.status(200).send({ message: 'success', data: data });
  } catch (error) {
    return res.status(500).send({ message: 'fail', error: error });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { error } = CatValidate.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).send({ message: 'fail', error: error.details.map((err) => err) });
    }
    const slug = slugify(req.body.name, { lower: true });
    const cate = { ...req.body, slug };
    const data = await Category.create(cate);
    if (!data) {
      return res.status(400).send({ message: 'fail', error: 'Ko the them category' });
    }
    return res.status(200).send({ message: 'success', data: data });
  } catch (error) {
    return res.status(500).send({ message: 'fail', error: error });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Category.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!data) {
      return res.status(404).send({ message: 'fail', error: 'Ko tim thay category de update' });
    }
    return res.status(200).send({ message: 'success', data: data });
  } catch (error) {}
  return res.status(500).send({ message: 'fail', error: error });
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Category.findByIdAndDelete(id);
    if (!data) {
      return res.status(404).send({ message: 'fail', error: 'Ko tim thay category de delete' });
    }
    return res.status(200).send({ message: 'success', data: data });
  } catch (error) {
    return res.status(500).send({ message: 'fail', error: error });
  }
};

export const getAllPostByCategory = async (req, res) => {
  try {
    
    const { id } = req.params;
    // const query = { status: 'approved' };
    /* get post status = approved */
    const query = {
      status: 'approved',
    };
    const data = await Category.findById(id).populate({
      path: 'posts',
      match: query,
      populate: [
        { path: 'author', select: '-postList -isVerified -role -password' },
        { path: 'category', select: '-posts' },
        { path: 'tags' },
      ],
    });
    // const data = await Category.findById(id).populate('posts');
    if (!data) {
      return res.status(404).send({ message: 'fail', error: 'Not found post by category' });
    }
    return res.status(200).send({ message: 'success', data: data });
  } catch (error) {
    return res.status(500).send({ message: 'fail', error: error });
  }
};
