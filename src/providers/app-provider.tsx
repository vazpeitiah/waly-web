import {
  MutationCache,
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
import { AxiosError } from 'axios'

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
  mutationCache: new MutationCache({
    onError: (error) => {
      if (error instanceof AxiosError && error.response?.data?.message) {
        toast.error(error.response.data.message)
        return
      }
      toast.error(error.message)
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
