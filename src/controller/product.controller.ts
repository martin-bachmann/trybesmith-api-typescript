import { Request, Response } from 'express';
import statusCodes from '../statusCodes';
import ProductService from '../service/product.service';

class ProductController {
  constructor(private productService = new ProductService()) { }

  public createProduct = async (req: Request, res: Response) => {
    const product = req.body;

    const productCreated = await this.productService.createProduct(product);
    res.status(statusCodes.CREATED).json(productCreated);
  };
}

export default ProductController;
