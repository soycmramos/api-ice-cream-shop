import { v4 as uuidv4 } from 'uuid'
import { IOrderRepository } from '../../domain/repositories/IOrderRepository.js'
import { Order } from '../../domain/entities/Order.js'
import { OrderSchema, OrderInput } from '../validators/OrderValidator.js'

export class OrderService {
  constructor(private repository: IOrderRepository) { }

  async create(order: OrderInput) {
    const parsed = OrderSchema.safeParse(order)
    if (!parsed.success) {
      throw { status: 400, message: parsed.error.issues }
    }

    const newOrder: Order = {
      id: uuidv4(),
      ...parsed.data
    }

    return await this.repository.create(newOrder)
  }

  async findById(id: string) {
    const order = await this.repository.findById(id)
    if (!order) throw { status: 400, message: 'Order not found' }
    return order
  }

  async findAll() {
    return await this.repository.findAll()
  }

  async update(id: string, order: OrderInput) {
    const parsed = OrderSchema.safeParse(order)
    if (!parsed.success) {
      throw { status: 400, message: parsed.error.issues }
    }
    const updated = await this.repository.update(id, parsed.data)
    if (!updated) throw { status: 404, message: 'Order not found' }
    return updated
  }

  async delete(id: string) {
    const deleted = await this.repository.delete(id)
    if (!deleted) throw { status: 404, message: 'Order not found' }
    return true
  }
}
