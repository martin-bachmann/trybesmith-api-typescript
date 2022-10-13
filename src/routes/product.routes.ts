import express from 'express';
import ProductController from '../controller/product.controller';

const router = express.Router();

const productController = new ProductController();

router.get('/', productController.getAllProducts);

router.post('/', productController.createProduct);

export default router;
