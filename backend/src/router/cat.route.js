import express from 'express';
import {
  createCategory,
  deleteCategory,
  getCategories,
  getItem,
  updateCategory,
} from '../controllers/Cat.controller.js';

const CatRoute = express.Router();
CatRoute.route('/category').get(getCategories).post(createCategory);
CatRoute.route('/category/:id').get(getItem).delete(deleteCategory).put(updateCategory);

export default CatRoute;
