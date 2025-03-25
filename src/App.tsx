import { Routes, Route } from 'react-router'

import { AppLayout, AuthLayout, PrivateRoute } from '@/layouts'
import {
  Home,
  NotFound,
  Accounts,
  Categories,
  Transactions,
  Login,
  AccountForm,
  CategoryForm,
} from '@/pages'
import { ROUTES } from '@/utils/const'
import { AppProvider } from '@/providers'

import './i18n.ts'

export default function App() {
  return (
    <AppProvider>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path={ROUTES.accounts.root}>
              <Route index element={<Accounts />} />
              <Route path={ROUTES.accounts.add} element={<AccountForm />} />
              <Route path={ROUTES.accounts.edit} element={<AccountForm />} />
            </Route>
            <Route path={ROUTES.categories.root}>
              <Route index element={<Categories />} />
              <Route path={ROUTES.categories.add} element={<CategoryForm />} />
              <Route path={ROUTES.categories.edit} element={<CategoryForm />} />
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
    </AppProvider>
  )
}
