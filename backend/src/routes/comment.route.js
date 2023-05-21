import express from 'express';
import { authorUser } from '../middleware/author.js';
import {
  deleteComment,
  getCommentById,
  getComments,
  sendComment,
  updateComment,
} from '../controllers/comment.controller.js';
const commentRouter = express.Router();

commentRouter.route('/').get(authorUser, getComments).post(authorUser, sendComment);
commentRouter
  .route('/:id')
  .get(authorUser, getCommentById)
  .delete(authorUser, deleteComment)
  .put(authorUser, updateComment);

export default commentRouter;
