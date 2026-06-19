import { Request, Response } from 'express'
import { TableService } from '../../application/services/TableService.js'
import { TableRepositoryImpl } from '../../infrastructure/repositories/TableRepositoryImpl.js'

const service = new TableService(new TableRepositoryImpl())

export class TableController {
  static async create(req: Request, res: Response) {
    try {
      const table = await service.create(req.body)
      res.status(201).json(table)
    } catch (err: any) {
      res.status(err.status || 500).json({ error: err.message })
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const table = await service.findById(String(req.params.id))
      res.status(200).json(table)
    } catch (err: any) {
      res.status(err.status || 500).json({ error: err.message })
    }
  }

  static async findAll(req: Request, res: Response) {
    const tables = await service.findAll()
    res.status(200).json(tables)
  }

  static async update(req: Request, res: Response) {
    try {
      const table = await service.update(String(req.params.id), req.body)
      res.status(200).json(table)
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
