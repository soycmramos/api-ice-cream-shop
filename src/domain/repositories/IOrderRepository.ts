import { Order } from '../entities/Order.js'

export interface IOrderRepository {
  create(order: Order): Promise<Order>
  findById(id: string): Promise<Order | null>
  findAll(): Promise<Order[]>
  update(id: string, order: Order): Promise<Order | null>
  delete(id: string): Promise<boolean>
}
