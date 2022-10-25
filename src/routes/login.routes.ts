import express from 'express';
import UserController from '../controller/user.controller';
import loginMiddleware from '../middlewares/login.middleware';

const router = express.Router();

const userController = new UserController();

router.post('/', loginMiddleware, userController.login);

export default router;