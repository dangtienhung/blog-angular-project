import express from 'express';
import {
  createCategory,
  deleteCategory,
  getCategories,
  getItem,
  updateCategory,
} from '../controller/Cat.controller.js';

const CatRoute = express.Router();
CatRoute.route('/').get(getCategories).post(createCategory);
CatRoute.route('/:id').get(getItem).delete(deleteCategory).put(updateCategory);

export default CatRoute;
