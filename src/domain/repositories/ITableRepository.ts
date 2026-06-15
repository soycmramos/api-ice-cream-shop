import { Table } from '../entities/Table.js'

export interface ITableRepository {
  create(table: Table): Promise<Table>
  findById(id: string): Promise<Table | null>
  findAll(): Promise<Table[]>
  update(id: string, table: Table): Promise<Table | null>
  delete(id: string): Promise<boolean>
}
