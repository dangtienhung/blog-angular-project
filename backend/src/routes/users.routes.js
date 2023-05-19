import express from 'express';
import { userController } from '../controllers/user.controllers';

const router = express.Router();

router.get('/users', userController.getAllUser);

export default router;
