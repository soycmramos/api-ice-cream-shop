import { pool } from '../../config/database.js'
import { Order } from '../../domain/entities/Order.js'
import { IOrderRepository } from '../../domain/repositories/IOrderRepository.js'

export class OrderRepositoryImpl implements IOrderRepository {
  async create(order: Order): Promise<Order> {
    await pool.query(
      'INSERT INTO orders (id, number, status, tableId) VALUES (?, ?, ?, ?)',
      [order.id, order.number, order.status, order.tableId]
    )
    return { ...order }
  }

  async findById(id: string): Promise<Order | null> {
    const [rows] = await pool.query('SELECT * FROM orders WHERE id = ?', [id])
    const orders = rows as Order[]
    return orders[0] ?? null
  }

  async findAll(): Promise<Order[]> {
    const [rows] = await pool.query('SELECT * FROM orders')
    return rows as Order[]
  }

  async update(id: string, order: Order): Promise<Order | null> {
    await pool.query(
      'UPDATE orders SET number = ?, status = ?, tableId = ? WHERE id = ?',
      [order.number, order.status, order.tableId, id]
    )
    return this.findById(id)
  }

  async delete(id: string): Promise<boolean> {
    const [result] = await pool.query('DELETE FROM orders WHERE id = ?', [id])
    return (result as any).affectedRows > 0
  }
}
