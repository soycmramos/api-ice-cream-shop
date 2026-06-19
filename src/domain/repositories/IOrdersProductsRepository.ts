import { OrdersProducts } from '../entities/OrdersProducts.js'

export interface IOrdersProductsRepository {
  create(orderProduct: OrdersProducts): Promise<OrdersProducts>
  findByOrder(orderId: string): Promise<OrdersProducts[]> | null
  delete(orderId: string): Promise<boolean>
  updateQuantity(orderId: string, productId: string, extraUnits: number): Promise<boolean>
}
