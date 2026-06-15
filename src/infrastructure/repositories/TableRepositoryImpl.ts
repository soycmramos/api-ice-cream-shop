import { pool } from '../../config/database.js'
import { Table } from '../../domain/entities/Table.js'
import { ITableRepository } from '../../domain/repositories/ITableRepository.js'

export class TableRepositoryImpl implements ITableRepository {
  async create(table: Table): Promise<Table> {
    await pool.query(
      'INSERT INTO tables (id, number, status) VALUES (?, ?, ?)',
      [table.id, table.number, table.status]
    )
    return { ...table }
  }

  async findById(id: string): Promise<Table | null> {
    const [rows] = await pool.query('SELECT * FROM tables WHERE id = ?', [id])
    const tables = rows as Table[]
    return tables[0] ?? null
  }

  async findAll(): Promise<Table[]> {
    const [rows] = await pool.query('SELECT * FROM tables')
    return rows as Table[]
  }

  async update(id: string, table: Table): Promise<Table | null> {
    await pool.query(
      'UPDATE tables SET number = ?, status = ? WHERE id = ?',
      [table.number, table.status, id]
    )
    return this.findById(id)
  }

  async delete(id: string): Promise<boolean> {
    const [result] = await pool.query('DELETE FROM tables WHERE id = ?', [id])
    return (result as any).affectedRows > 0
  }
}
