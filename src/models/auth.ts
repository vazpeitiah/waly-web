import { MAX_STRING_LENGTH, MIN_PASSWORD_LENGTH } from '@/utils/const'
import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(MIN_PASSWORD_LENGTH).max(MAX_STRING_LENGTH),
})

export type LoginData = z.infer<typeof loginSchema>
