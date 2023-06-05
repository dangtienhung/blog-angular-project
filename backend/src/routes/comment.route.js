import express from 'express';
import { authorUser, authors } from '../middleware/author.js';
import {
  deleteComment,
  getCommentById,
  getComments,
  sendComment,
  updateComment,
  countCommentPost,
  getCommentByIdBlog,
} from '../controllers/comment.controller.js';
const commentRouter = express.Router();

commentRouter.route('/comments').get(getComments).post(sendComment);
commentRouter.route('/comments/:id').get(getCommentById).delete(deleteComment).put(updateComment);
commentRouter.route('/countcommentPosts').get(countCommentPost);
commentRouter.route('/commentPosts/:id').get(getCommentByIdBlog);

export default commentRouter;
