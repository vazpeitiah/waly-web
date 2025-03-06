import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Account, accountCreateSchema, defaultAccount } from '@/models/account'
import { useCreateAccount, useUpdateAccount } from '@/queries/accounts'
import { useLocation, useNavigate } from 'react-router'
import { ACCOUNT_TYPES, ROUTES } from '@/utils/const'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { generateOptions } from '@/utils/helpers'

const AccountFrom = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'form'>) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { state } = useLocation()
  const account: Account | undefined = state?.account
  const form = useForm({
    resolver: zodResolver(accountCreateSchema),
    defaultValues: account ?? defaultAccount,
  })
  const { mutate: createAccount, isPending: isCreating } = useCreateAccount()
  const { mutate: updateAccount, isPending: isUpdating } = useUpdateAccount()
  const accountTypes = generateOptions(ACCOUNT_TYPES, 'accountTypes', t)
  const isPending = isCreating || isUpdating

  const handleOnSubmit = form.handleSubmit((data) => {
    if (account) {
      updateAccount({ ...account, ...data })
    } else {
      createAccount(data)
    }
    handleCancel()
  })

  const handleCancel = () => {
    form.reset()
    navigate(ROUTES.accounts.root)
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl">
        {account
          ? t('accounts.form.editTitle', {
              account: account,
            })
          : t('accounts.form.title')}
      </h1>
      <Form {...form}>
        <form onSubmit={handleOnSubmit} className={className} {...props}>
          <div className="flex flex-col gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('accounts.form.name')}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('accounts.form.type')}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={t('accounts.form.typePlaceholder')}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {accountTypes.map((option) => (
                        <SelectItem value={option.value} key={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-4">
              <Button
                variant="outline"
                className="w-full"
                type="button"
                disabled={isPending}
                onClick={handleCancel}
              >
                {t('buttons.cancel')}
              </Button>
              <Button type="submit" className="w-full" disabled={isPending}>
                {t('buttons.save')}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default AccountFrom
