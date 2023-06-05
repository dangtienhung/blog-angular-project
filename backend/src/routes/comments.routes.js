import { commentController } from '../controllers/comment.controllers.js';
import express from 'express';

const commentRouter = express.Router();

commentRouter.post('/add-comment', commentController.createComment);
commentRouter.put('/update-comment/:id', commentController.updateComment);
commentRouter.get('/', commentController.getAllComments);
commentRouter.put('/deleted-fake/:id', commentController.fakeDelete);
commentRouter.put('/undo-delete/:id', commentController.undoDelete);
commentRouter.delete('/delete/:id', commentController.realDelete);

export default commentRouter;
