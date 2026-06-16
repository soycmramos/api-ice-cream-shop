import { Request, Response } from 'express'
import { OrderService } from '../../application/services/OrderService.js'
import { OrderRepositoryImpl } from '../../infrastructure/repositories/OrderRepositoryImpl.js'

const service = new OrderService(new OrderRepositoryImpl())

export class OrderController {
  static async create(req: Request, res: Response) {
    try {
      const order = await service.create(req.body)
      res.status(201).json(order)
    } catch (err: any) {
      res.status(err.status || 500).json({ error: err.message })
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const order = await service.findById(String(req.params.id))
      res.status(200).json(order)
    } catch (err: any) {
      res.status(err.status || 500).json({ error: err.message })
    }
  }

  static async findAll(req: Request, res: Response) {
    const orders = await service.findAll()
    res.json(orders)
  }

  static async update(req: Request, res: Response) {
    try {
      const order = await service.update(String(req.params.id), req.body)
      res.status(200).json(order)
    } catch (err: any) {
      res.status(err.status || 500).json({ error: err.message })
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      await service.delete(String(req.params.id))
      res.status(204).send()
    } catch (err: any) {
      res.status(err.status || 500).json({ error: err.message })
    }
  }
}
