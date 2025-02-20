import { BrowserRouter, Routes, Route } from 'react-router'

import { AppLayout, AuthLayout, PrivateRoute } from '@/layouts'
import {
  Home,
  NotFound,
  Accounts,
  Categories,
  Transactions,
  Login,
} from '@/pages'
import { ThemeProvider } from '@/providers'
import { ROUTES } from './utils/const'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route element={<AppLayout />}>
                <Route index element={<Home />} />
                <Route path={ROUTES.accounts.root}>
                  <Route index element={<Accounts />} />
                </Route>
                <Route path={ROUTES.categories.root}>
                  <Route index element={<Categories />} />
                </Route>
                <Route path={ROUTES.transactions.root}>
                  <Route index element={<Transactions />} />
                </Route>
              </Route>
            </Route>
            <Route element={<AuthLayout />}>
              <Route path={ROUTES.login} element={<Login />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
