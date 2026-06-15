import { z } from 'zod'

export const TableSchema = z.object({
  number: z.number().int().positive(),
  status: z.enum(['LIBRE', 'OCUPADA']).default('LIBRE')
})

export type TableInput = z.infer<typeof TableSchema>
