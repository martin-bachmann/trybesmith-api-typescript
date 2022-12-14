import { Pool, ResultSetHeader } from 'mysql2/promise';
import Order from '../interfaces/order.interface';

export default class OrderModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<Order[]> {
    const result = await this.connection.execute(
      `SELECT o.id, o.userId, JSON_ARRAYAGG(p.id) AS productsIds
        FROM Trybesmith.Orders o
        JOIN Trybesmith.Products p
        ON o.id = p.orderId
        GROUP BY o.id`,
    );
    const [rows] = result;
    return rows as Order[];
  }

  public async createOrder(userId: number): Promise<number> {
    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Orders (userId) VALUES (?)',
      [userId],
    );
    return insertId;
  }
}
