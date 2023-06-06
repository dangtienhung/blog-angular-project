import express from 'express';
import { userController } from '../controllers/user.controllers.js';

const router = express.Router();

router.get('/users', userController.getAllUser);
router.get('/users/:id', userController.getUserById);
router.put('/users/delete-fake/:id', userController.deleteFake);
router.put('/users/restore/:id', userController.undoDelete);
router.delete('/users/delete/:id', userController.deleteReal);
router.put('/users/:id', userController.updateUser);
router.post('/users/create', userController.createUser);
router.get('/users/counter/user-new', userController.countNewUser);
router.get('/users/deleted/all', userController.getUserDeleted);
router.get('/users/posts/all/:id', userController.getAllPostByUserId);

export default router;
