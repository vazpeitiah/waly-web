import { z } from 'zod'

const baseSchema = z.object({
  id: z.string(),
  name: z.string(),
})

export const categorySchema = baseSchema
export type Category = z.infer<typeof categorySchema>
