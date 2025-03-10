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
import { DEFAULT_STALE_TIME, QK_ERROR_EXCLUDE } from '@/utils/const'
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
      if (QK_ERROR_EXCLUDE.some((q) => query.queryKey.includes(q))) return
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
      <Toaster richColors />
    </BrowserRouter>
  )
}

export default AppProvider
