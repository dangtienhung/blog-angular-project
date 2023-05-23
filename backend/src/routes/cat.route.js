import express from 'express';
import {
  createCategory,
  deleteCategory,
  getCategories,
  getItem,
  updateCategory,
} from '../controllers/Cat.controller.js';
import { authorAdmin, authorUser, authors } from '../middleware/author.js';

const CatRoute = express.Router();
CatRoute.route('/category').get(getCategories).post(authors, authorUser, createCategory);
CatRoute.route('/category/:id')
  .get(getItem)
  .delete(authors, authorUser, deleteCategory)
  .put(authors, authorUser, updateCategory);

export default CatRoute;
