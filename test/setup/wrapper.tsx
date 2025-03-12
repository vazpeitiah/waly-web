import { ConfirmProvider } from '@/providers'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren } from 'react'
import { BrowserRouter } from 'react-router'

export const TestWrapper = ({ children }: PropsWithChildren) => {
  return (
    <BrowserRouter>
      <QueryClientProvider
        client={
          new QueryClient({
            defaultOptions: {
              queries: {
                retry: false,
                staleTime: 0,
                gcTime: 0,
              },
            },
          })
        }
      >
        <ConfirmProvider>{children}</ConfirmProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}
