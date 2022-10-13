import express from 'express';
import UserController from '../controller/user.controller';

const router = express.Router();

const userController = new UserController();

router.post('/', userController.createUser);

export default router;