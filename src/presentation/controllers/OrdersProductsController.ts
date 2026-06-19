import { Request, Response } from 'express'
import { OrdersProductsService } from '../../application/services/OrdersProductsService.js'
import { OrdersProductsRepositoryImpl } from '../../infrastructure/repositories/OrdersProductsRepositoryImpl.js'

const service = new OrdersProductsService(new OrdersProductsRepositoryImpl())

export class OrdersProductsController {
  static async create(req: Request, res: Response) {
    try {
      const item = await service.create(req.body)
      res.status(201).json(item)
    } catch (err: any) {
      res.status(err.status || 500).json({ error: err.message })
    }
  }

  static async findByOrder(req: Request, res: Response) {
    const items = await service.findByOrder(String(req.params.orderId))
    res.status(200).json(items)
  }

  static async delete(req: Request, res: Response) {
    try {
      await service.delete((String(req.params.orderId)))
      res.status(204).send()
    } catch (err: any) {
      res.status(err.status || 500).json({ error: err.message })
    }
  }

  static async updateQuantity(req: Request, res: Response) {
    try {
      const { orderId, productId, extraUnits } = req.body
      const updated = await service.updateQuantity(orderId, productId, extraUnits)
      res.status(204).send()
    } catch (err: any) {
      res.status(err.status || 500).json({ error: err.message })
    }
  }
}
