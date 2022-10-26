import connection from '../models/connection';
import OrderModel from '../models/order.model';
import Order from '../interfaces/order.interface';
import ProductModel from '../models/product.model';

class OrderService {
  public model: OrderModel;

  public pModel: ProductModel;

  constructor() {
    this.model = new OrderModel(connection);
    this.pModel = new ProductModel(connection);
  }

  public async getAllOrders(): Promise<Order[]> {
    const orders = await this.model.getAll();
    return orders;
  }

  public async createOrder(userId: number, productsIds: number[]): Promise<Order> {
    const newOrderId = await this.model.createOrder(userId);
    const insertIds = productsIds.map(
      (productId) => this.pModel.updateProduct(newOrderId, productId),
    );
    await Promise.all(insertIds);
    return { userId, productsIds };
  }
}

export default OrderService;
