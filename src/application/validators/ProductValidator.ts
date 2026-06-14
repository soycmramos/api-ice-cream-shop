import { z } from 'zod'

export const ProductSchema = z.object({
  code: z.string().trim().min(3),
  name: z.string().trim().min(2),
  price: z.number().int().positive(),
  description: z.string().trim().nullable().optional().default(null)
})

export type ProductInput = z.infer<typeof ProductSchema>