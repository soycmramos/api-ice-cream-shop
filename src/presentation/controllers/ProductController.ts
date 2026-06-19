import { Request, Response } from 'express'
import { ProductService } from '../../application/services/ProductService.js'
import { ProductRepositoryImpl } from '../../infrastructure/repositories/ProductRepositoryImpl.js'

const service = new ProductService(new ProductRepositoryImpl())

export class ProductController {
  static async create(req: Request, res: Response) {
    try {
      const product = await service.create(req.body)
      res.status(201).json(product)
    } catch (err: any) {
      res.status(err.status || 500).json({ error: err.message })
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const product = await service.findById(String(req.params.id))
      res.status(200).json(product)
    } catch (err: any) {
      res.status(err.status || 500).json({ error: err.message })
    }
  }

  static async findAll(req: Request, res: Response) {
    const products = await service.findAll()
    res.status(200).json(products)
  }

  static async update(req: Request, res: Response) {
    try {
      const product = await service.update(String(req.params.id), req.body)
      res.status(200).json(product)
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
