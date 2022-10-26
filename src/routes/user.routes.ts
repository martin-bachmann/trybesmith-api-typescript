import express from 'express';
import UserController from '../controller/user.controller';
import userMiddleware from '../middlewares/user.middleware';

const router = express.Router();

const userController = new UserController();

router.post('/', userMiddleware, userController.createUser);

export default router;