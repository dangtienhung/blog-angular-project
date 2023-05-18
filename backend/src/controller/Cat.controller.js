import Category from '../models/categories.model.js';
import CatValidate from '../validates/categories.validate.js';

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
    const data = await Category.findById(id);
    if (!data) {
      return res.status(404).send({ message: 'fail', error: 'Ko tim thay Category' });
    }
    return res.status(200).send({ message: 'success', data: data });
  } catch (error) {
    return res.status(500).send({ message: 'fail', error: 'Loi he thong' });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { error } = CatValidate.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).send({ message: 'fail', error: error.details.map((err) => err) });
    }
    const data = await Category.create(req.body);
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
    const data = await Category.findByIdAndUpdate(id, req.body, { new: true });
    if (!data) {
      return res.status(404).send({ message: 'fail', error: 'Ko tim thay category de update' });
    }
    return res.status(200).send({ message: 'success', data: data });
  } catch (error) {}
  return res.status(500).send({ message: 'fail', error: error });
};

export const deleteCategory = async (req, res) => {
  try {
    const data = await Category.findByIdAndRemove(id);
    if (!data) {
      return res.status(404).send({ message: 'fail', error: 'Ko tim thay category de delete' });
    }
    return res.status(200).send({ message: 'success', data: data });
  } catch (error) {
    return res.status(500).send({ message: 'fail', error: error });
  }
};
