import express from 'express';
import { addTag, deleteTag, getTagById, getTags, updateTag } from '../controllers/tag.controller.js';
import { authorUser, authors } from '../middleware/author.js';
const tagRouter = express.Router();
tagRouter.route('/').get(getTags).post(authors, authorUser, addTag);
tagRouter.route('/:id').get(getTagById).put(authors, authorUser, updateTag).delete(authors, authorUser, deleteTag);

export default tagRouter;
