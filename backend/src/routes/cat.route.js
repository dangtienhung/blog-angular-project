import { authorAdmin, authorUser, authors } from '../middleware/author.js';
import {
  createCategory,
  deleteCategory,
  getAllPostByCategory,
  getCategories,
  getItem,
  updateCategory,
} from '../controllers/Cat.controller.js';

import express from 'express';

const CatRoute = express.Router();
CatRoute.route('/category').get(getCategories).post(authors, authorUser, createCategory);
CatRoute.route('/category/:id')
  .get(getItem)
  .delete(authors, authorUser, deleteCategory)
  .put(authors, authorUser, updateCategory);

CatRoute.route('/categories/posts/:id').get(getAllPostByCategory);

export default CatRoute;
