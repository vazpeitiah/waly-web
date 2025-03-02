import z from 'zod'

export const baseSchema = z.object({
  name: z.string(),
  type: z.string(),
})

export const accountSchema = baseSchema.extend({
  id: z.string(),
})

export const accountCreateSchema = baseSchema.extend({
  name: z.string().nonempty(),
  type: z.string().nonempty(),
})

export type AccountCreate = z.infer<typeof accountCreateSchema>
export type Account = z.infer<typeof accountSchema>
