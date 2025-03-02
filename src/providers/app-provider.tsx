import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { PropsWithChildren } from 'react'
import { BrowserRouter } from 'react-router'
import { toast, Toaster } from 'sonner'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { ThemeProvider } from './theme-provider'
import { DEFAULT_STALE_TIME } from '@/utils/const'
import ConfirmProvider from './confirm-provider'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: DEFAULT_STALE_TIME,
      retry: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      toast.error(`Failed to fetch ${query.queryKey[0]}: ${error.message}`, {
        richColors: true,
      })
    },
  }),
})

const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <ConfirmProvider> {children}</ConfirmProvider>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      <Toaster />
    </BrowserRouter>
  )
}

export default AppProvider
