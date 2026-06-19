import { v4 as uuidv4 } from 'uuid'
import { ITableRepository } from '../../domain/repositories/ITableRepository.js'
import { TableSchema, TableInput } from '../validators/TableValidator.js'
import { Table } from '../../domain/entities/Table.js'

export class TableService {
  constructor(private repository: ITableRepository) { }

  async create(table: TableInput) {
    const parsed = TableSchema.safeParse(table)
    if (!parsed.success) {
      throw { status: 400, message: parsed.error.issues }
    }

    const newTable: Table = {
      id: uuidv4(),
      ...parsed.data,
    }

    return await this.repository.create(newTable)
  }

  async findById(id: string) {
    const table = await this.repository.findById(id)
    if (!table) throw { status: 404, message: 'Table not found' }
    return table
  }

  async findAll() {
    return await this.repository.findAll()
  }


  async update(id: string, table: TableInput) {
    const parsed = TableSchema.safeParse(table)
    if (!parsed.success) {
      throw { status: 400, message: parsed.error.issues }
    }
    const updated = await this.repository.update(id, parsed.data)
    if (!updated) throw { status: 404, message: 'Table not found' }
    return updated
  }

  async delete(id: string) {
    const deleted = await this.repository.delete(id)
    if (!deleted) throw { status: 404, message: 'Table not found' }
    return true
  }
}
