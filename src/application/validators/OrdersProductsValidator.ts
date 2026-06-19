import { z } from 'zod'

export const OrdersProductsSchema = z.object({
  orderId: z.string().uuid(),
  productId: z.string().uuid(),
  quantity: z.number().int().positive(),
})

export type OrdersProductsInput = z.infer<typeof OrdersProductsSchema>
