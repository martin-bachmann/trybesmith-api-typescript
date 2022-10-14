import express from 'express';
import OrderController from '../controller/order.controller';

const router = express.Router();

const orderController = new OrderController();

router.get('/', orderController.getAllOrders);

export default router;