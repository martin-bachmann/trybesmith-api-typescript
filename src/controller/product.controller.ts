import { Request, Response } from 'express';
import statusCodes from '../statusCodes';
import ProductService from '../service/product.service';

class ProductController {
  constructor(private productService = new ProductService()) { }

  public getAllProducts = async (_req: Request, res: Response) => {
    const products = await this.productService.getAllProducts();
    res.status(statusCodes.OK).json(products);
  };

  public createProduct = async (req: Request, res: Response) => {
    const product = req.body;

    const productCreated = await this.productService.createProduct(product);
    res.status(statusCodes.CREATED).json(productCreated);
  };
}

export default ProductController;
