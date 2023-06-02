import express from 'express';
import { authorUser, authors } from '../middleware/author.js';
import {
  deleteComment,
  getCommentById,
  getComments,
  sendComment,
  updateComment,
  countCommentPost,
} from '../controllers/comment.controller.js';
const commentRouter = express.Router();

commentRouter.route('/').get(getComments).post(sendComment);
commentRouter.route('/:id').get(getCommentById).delete(deleteComment).put(updateComment);
commentRouter.route('/countComment').get(countCommentPost);

export default commentRouter;
