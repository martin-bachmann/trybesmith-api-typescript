import express from 'express';
import OrderController from '../controller/order.controller';
import orderMiddleware from '../middlewares/order.middleware';
import { validateJWT } from '../utils/JWT';

const router = express.Router();

const orderController = new OrderController();

router.get('/', orderController.getAllOrders);

router.post('/', validateJWT, orderMiddleware, orderController.createOrder);

export default router;