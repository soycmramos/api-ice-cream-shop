import { z } from 'zod'

export const OrderSchema = z.object({
  number: z.string().trim().min(3),
  status: z.enum(["PENDIENTE", "PAGADA", "CANCELADA"]).default("PENDIENTE"),
  tableId: z.string().nonempty()
})

export type OrderInput = z.infer<typeof OrderSchema>
