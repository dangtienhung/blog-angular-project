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
CatRoute.route('/category').get(authorUser, getCategories).post(authorAdmin, createCategory);
CatRoute.route('/category/:id')
  .get(authorUser, getItem)
  .delete(authorAdmin, deleteCategory)
  .put(authorAdmin, updateCategory);

export default CatRoute;
