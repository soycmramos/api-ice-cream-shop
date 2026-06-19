import { v4 as uuidv4 } from 'uuid'
import { IOrdersProductsRepository } from '../../domain/repositories/IOrdersProductsRepository.js'
import { OrdersProducts } from '../../domain/entities/OrdersProducts.js'
import { OrdersProductsSchema, OrdersProductsInput } from '../validators/OrdersProductsValidator.js'

export class OrdersProductsService {
  constructor(private repository: IOrdersProductsRepository) { }

  async create(item: OrdersProductsInput) {
    const parsed = OrdersProductsSchema.safeParse(item)
    if (!parsed.success) {
      throw { status: 400, message: parsed.error.issues }
    }

    const newItem: OrdersProducts = {
      id: uuidv4(),
      ...parsed.data
    }

    return await this.repository.create(newItem)
  }

  async findByOrder(orderId: string) {
    return await this.repository.findByOrder(orderId)
  }

  async delete(orderId: string) {
    const deleted = await this.repository.delete(orderId)
    if (!deleted) throw { status: 404, message: 'OrdersProducts not found' }
    return true
  }

  async updateQuantity(orderId: string, productId: string, extraUnits: number) {
    const updated = await this.repository.updateQuantity(orderId, productId, extraUnits)
    if (!updated) {
      throw { status: 404, message: 'Producto no encontrado en la orden' }
    }
    return true
  }
}
