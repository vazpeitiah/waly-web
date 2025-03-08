import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useTranslation } from 'react-i18next'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginData, loginSchema } from '@/models/auth'
import { loginWithGoogle } from '@/api/auth'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { useLogin } from '@/queries/auth'

const LoginForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'form'>) => {
  const { t } = useTranslation()
  const form = useForm({
    resolver: zodResolver(loginSchema),
  })
  const { mutate, isPending } = useLogin()

  const handleOnSubmit: SubmitHandler<LoginData> = (data) => {
    mutate(data)
  }

  const handleLoginGoogle = () => {
    loginWithGoogle()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleOnSubmit)}
        className={className}
        {...props}
      >
        <div className="flex flex-col gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('login.email')}</FormLabel>
                <FormControl>
                  <Input placeholder="user@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('login.password')}</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isPending}>
            {t('login.submit')}
          </Button>
          <Button
            variant="outline"
            className="w-full"
            type="button"
            disabled={isPending}
            onClick={handleLoginGoogle}
          >
            {t('login.google')}
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          {t('login.noAccount')}{' '}
          <a href="#" className="underline underline-offset-4">
            {t('login.signUp')}
          </a>
        </div>
      </form>
    </Form>
  )
}

export default LoginForm
