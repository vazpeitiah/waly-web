import { z } from 'zod'

export const userProfileSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
})

export type UserProfile = z.infer<typeof userProfileSchema>
