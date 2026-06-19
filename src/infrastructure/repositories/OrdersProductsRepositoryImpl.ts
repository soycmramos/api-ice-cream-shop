import { pool } from '../../config/database.js'
import { OrdersProducts } from '../../domain/entities/OrdersProducts.js'
import { IOrdersProductsRepository } from '../../domain/repositories/IOrdersProductsRepository.js'

export class OrdersProductsRepositoryImpl implements IOrdersProductsRepository {
  async create(item: OrdersProducts): Promise<OrdersProducts> {
    await pool.query(
      'INSERT INTO orders_products (id, orderId, productId, quantity) VALUES (?, ?, ?, ?)',
      [item.id, item.orderId, item.productId, item.quantity]
    )
    return { ...item }
  }

  async findByOrder(orderId: string): Promise<OrdersProducts[]> {
    const [rows] = await pool.query('SELECT * FROM orders_products WHERE orderId = ?', [orderId])
    return rows as OrdersProducts[]
  }

  async delete(orderId: string): Promise<boolean> {
    const [result] = await pool.query('DELETE FROM orders_products WHERE id = ?', [orderId])
    return (result as any).affectedRows > 0
  }

  async updateQuantity(orderId: string, productId: string, extraUnits: number): Promise<boolean> {
    const [result] = await pool.query(
      'UPDATE orders_products SET quantity = quantity + ? WHERE orderId = ? AND productId = ?',
      [extraUnits, orderId, productId]
    )
    return (result as any).affectedRows > 0
  }
}
