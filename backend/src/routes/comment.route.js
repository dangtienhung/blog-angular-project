import express from 'express';
import { authorUser, authors } from '../middleware/author.js';
import {
  deleteComment,
  getCommentById,
  getComments,
  sendComment,
  updateComment,
} from '../controllers/comment.controller.js';
const commentRouter = express.Router();

commentRouter.route('/').get(getComments).post(authorUser, sendComment);
commentRouter
  .route('/:id')
  .get(authors, authorUser, getCommentById)
  .delete(authors, authorUser, deleteComment)
  .put(authors, authorUser, updateComment);

export default commentRouter;
