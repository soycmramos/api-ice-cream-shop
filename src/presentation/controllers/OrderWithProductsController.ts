// src/presentation/controllers/OrderWithProductsController.ts
import { Request, Response } from 'express'
import { OrderWithProductsService } from '../../application/services/OrderWithProductsService.js'
import { OrderRepositoryImpl } from '../../infrastructure/repositories/OrderRepositoryImpl.js'
import { OrdersProductsRepositoryImpl } from '../../infrastructure/repositories/OrdersProductsRepositoryImpl.js'

const service = new OrderWithProductsService(
  new OrderRepositoryImpl(),
  new OrdersProductsRepositoryImpl()
)

export class OrderWithProductsController {
  static async create(req: Request, res: Response) {
    try {
      const { tableId, products } = req.body
      const order = await service.createOrderWithProducts(tableId, products)
      res.status(201).json(order)
    } catch (err: any) {
      res.status(err.status || 500).json({ error: err.message })
    }
  }
}
