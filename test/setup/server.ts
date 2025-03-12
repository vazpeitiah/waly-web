import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/auth/verify', () => {
    return HttpResponse.json(
      {
        message: 'User is not authenticated',
      },
      { status: 401 },
    )
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
