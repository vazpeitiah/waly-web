import { ComponentPropsWithoutRef } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { LoginForm } from '@/components'
import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'

const Login = ({ className, ...props }: ComponentPropsWithoutRef<'div'>) => {
  const { t } = useTranslation()

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{t('login.title')}</CardTitle>
          <CardDescription>{t('login.subtitle')}</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  )
}

export default Login
