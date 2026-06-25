import { z } from 'zod'

export const ProductSchema = z.object({
  code: z
    .string({ message: 'El código debe ser de tipo texto' })
    .trim()
    .min(3, { message: 'El código debe tener una longitud mínima de 3 caracteres' }),
  name: z
    .string({ message: 'El nombre debe ser de tipo texto' })
    .trim()
    .min(3, { message: 'El nombre debe tener una longitud mínima de 3 caracteres' }),
  price: z
    .number({ message: 'El precio debe ser de tipo numérico (int)' })
    .int({ message: 'El precio debe ser de tipo entero' })
    .positive({ message: 'El precio debe ser mayor a cero' }),
  description: z
    .string({ message: 'La descripción debe ser de tipo texto' })
    .trim()
    .nullable()
    .optional()
    .default(null)
})

export type ProductInput = z.infer<typeof ProductSchema>