import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/auth/verify', () => {
    return HttpResponse.json({ isValid: true })
  }),
  http.get('/user/profile', () => {
    return HttpResponse.json({
      id: 'user-id',
      email: 'user@example.com',
      name: 'John Doe',
    })
  }),
]

export const server = setupServer(...handlers)
