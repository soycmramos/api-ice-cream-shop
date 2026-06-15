import { pool } from '../../config/database.js'
import { Product } from '../../domain/entities/Product.js'
import { IProductRepository } from '../../domain/repositories/IProductRepository.js'

export class ProductRepositoryImpl implements IProductRepository {
  async create(product: Product): Promise<Product> {
    await pool.query(
      'INSERT INTO products (id, code, name, price, description) VALUES (?, ?, ?, ?, ?)',
      [product.id, product.code, product.name, product.price, product.description]
    )

    return { ...product }
  }

  async findById(id: string): Promise<Product | null> {
    const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [id])
    const products = rows as Product[]
    return products[0] ?? null
  }


  async findAll(): Promise<Product[]> {
    const [rows] = await pool.query('SELECT * FROM products')
    return rows as Product[]
  }

  async update(id: string, product: Product): Promise<Product | null> {
    await pool.query(
      'UPDATE products SET code =?, name=?, price=?, description=? WHERE id=?',
      [product.code, product.name, product.price, product.description, id]
    )
    return this.findById(id)
  }

  async delete(id: string): Promise<boolean> {
    const [result] = await pool.query('DELETE FROM products WHERE id=?', [id])
    console.log({ result })
    return (result as any).affectedRows > 0
  }
}
