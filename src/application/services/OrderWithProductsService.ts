// src/application/services/OrderWithProductsService.ts
import { v4 as uuidv4 } from 'uuid'
import { IOrderRepository } from '../../domain/repositories/IOrderRepository.js'
import { IOrdersProductsRepository } from '../../domain/repositories/IOrdersProductsRepository.js'
import { Order } from '../../domain/entities/Order.js'
import { OrdersProducts } from '../../domain/entities/OrdersProducts.js'

export class OrderWithProductsService {
  constructor(
    private orderRepository: IOrderRepository,
    private ordersProductsRepository: IOrdersProductsRepository
  ) { }

  async createOrderWithProducts(tableId: string, products: { productId: string, quantity: number }[]) {
    // Crear la orden
    const newOrder: Order = {
      id: uuidv4(),
      number: String(Math.floor(Math.random() * 900) + 100),
      status: 'PENDIENTE',
      tableId,
    }
    await this.orderRepository.create(newOrder)

    // Insertar productos asociados
    for (const p of products) {
      const item: OrdersProducts = {
        id: uuidv4(),
        orderId: String(newOrder.id),
        productId: p.productId,
        quantity: p.quantity,
      }
      await this.ordersProductsRepository.create(item)
    }

    // Retornar orden con productos embebidos
    return {
      ...newOrder,
      products,
    }
  }
}
