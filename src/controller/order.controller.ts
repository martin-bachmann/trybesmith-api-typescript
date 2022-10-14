import { Request, Response } from 'express';
import statusCodes from '../statusCodes';
import OrderService from '../service/order.service';

class OrderController {
  constructor(private orderService = new OrderService()) { }

  public getAllOrders = async (_req: Request, res: Response) => {
    const orders = await this.orderService.getAllOrders();
    res.status(statusCodes.OK).json(orders);
  };
}

export default OrderController;
