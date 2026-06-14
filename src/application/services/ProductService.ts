
import { v4 as uuidv4 } from 'uuid'
import { IProductRepository } from '../../domain/repositories/IProductRepository.js'
import { ProductSchema, ProductInput } from '../validators/ProductValidator.js'
import { Product } from '../../domain/entities/Product.js'

export class ProductService {
  constructor(private repository: IProductRepository) { }

  async create(product: Omit<ProductInput, 'id'>) {
    const parsed = ProductSchema.safeParse(product)
    if (!parsed.success) {
      throw { status: 400, message: parsed.error.issues }
    }

    const newProduct: Product = {
      id: uuidv4(),
      ...parsed.data,
      description: parsed.data.description === "" ? null : parsed.data.description
    }

    return await this.repository.create(newProduct)
  }

  async getById(id: string) {
    const product = await this.repository.findById(id)
    if (!product) throw { status: 404, message: 'Product not found' }
    return product
  }

  async getAll() {
    return await this.repository.findAll()
  }

  async update(id: string, product: Product) {
    const parsed = ProductSchema.safeParse(product)
    if (!parsed.success) {
      throw { status: 400, message: parsed.error.issues }
    }
    const updated = await this.repository.update(id, parsed.data)
    if (!updated) throw { status: 404, message: 'Product not found' }
    return updated
  }

  async delete(id: string) {
    const deleted = await this.repository.delete(id)
    if (!deleted) throw { status: 404, message: 'Product not found' }
    return true
  }
}
