import z from 'zod'

export const accountSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
})

export type Account = z.infer<typeof accountSchema>
