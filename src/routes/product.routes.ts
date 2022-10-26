import express from 'express';
import ProductController from '../controller/product.controller';
import productMiddleware from '../middlewares/product.middleware';

const router = express.Router();

const productController = new ProductController();

router.get('/', productController.getAllProducts);

router.post('/', productMiddleware, productController.createProduct);

export default router;
