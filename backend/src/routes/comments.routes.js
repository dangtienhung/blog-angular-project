import { commentController } from '../controllers/comment.controllers.js';
import express from 'express';

const router = express.Router();

router.post('/add-comment', commentController.createComment);
router.put('/update-comment/:id', commentController.updateComment);
router.get('/comments', commentController.getAllComments);
router.put('/deleted-fake/:id', commentController.fakeDelete);
router.put('/undo-delete/:id', commentController.undoDelete);
router.delete('/delete/:id', commentController.realDelete);

export default router;
