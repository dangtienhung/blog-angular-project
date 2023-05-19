import express from 'express';
import { postController } from '../controllers/post.controllers.js';

const router = express.Router();

router.post('/posts', postController.createPost);
router.get('/posts', postController.getAllPosts);
router.get('/posts/:id', postController.getPostById);
router.put('/posts/:id', postController.updatePost);
router.put('/posts/delete-fake/:id', postController.fakeDeletPost);
router.put('/posts/restore/:id', postController.undoDeletePost);
router.delete('/posts/:id', postController.deletePost);

export default router;
