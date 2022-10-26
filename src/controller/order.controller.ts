import { Request, Response } from 'express';
import statusCodes from '../statusCodes';
import OrderService from '../service/order.service';

class OrderController {
  constructor(private orderService = new OrderService()) { }

  public getAllOrders = async (_req: Request, res: Response) => {
    const orders = await this.orderService.getAllOrders();
    res.status(statusCodes.OK).json(orders);
  };

  public createOrder = async (req: Request, res: Response) => {
    const { user, productsIds } = req.body;
    const newOrder = await this.orderService.createOrder(user.id, productsIds);
    res.status(statusCodes.CREATED).json(newOrder);
  };
}

export default OrderController;
