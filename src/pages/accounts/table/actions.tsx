import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useConfirm } from '@/hooks'
import { Account } from '@/models/account'
import { useDeleteAccount } from '@/queries/accounts'
import { Row } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface ActionsProps {
  accountRow: Row<Account>
}

const Actions = ({ accountRow }: ActionsProps) => {
  const { t } = useTranslation()
  const { confirm } = useConfirm()
  const { mutate } = useDeleteAccount()
  const account = accountRow.original

  const handleDelete = async () => {
    const isConfirmed = await confirm({
      title: t('accounts.table.actions.confirmDelete', {
        account: account.name,
      }),
    })
    if (isConfirmed) {
      mutate(account.id)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">{t('accounts.table.actions.open')}</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          {t('accounts.table.actions.title')}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>{t('accounts.table.actions.edit')}</DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete}>
          {t('accounts.table.actions.delete')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Actions
