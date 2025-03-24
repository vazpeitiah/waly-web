import { z } from 'zod'

const baseSchema = z.object({
  id: z.string(),
  name: z.string(),
})

export const createCategorySchema = baseSchema.omit({ id: true }).extend({
  name: z.string().nonempty(),
})

export const defaultCategory: CreateCategory = {
  name: '',
}

export const categorySchema = baseSchema
export type Category = z.infer<typeof categorySchema>
export type CreateCategory = z.infer<typeof createCategorySchema>
