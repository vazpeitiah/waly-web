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
import { Category } from '@/models/category'
import { useDeleteAccount } from '@/queries/accounts'
import { ROUTES } from '@/utils/const'
import { Row } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

interface ActionsProps {
  row: Row<Category>
}

const Actions = ({ row }: ActionsProps) => {
  const { t } = useTranslation()
  const { confirm } = useConfirm()
  const { mutate } = useDeleteAccount()
  const navigate = useNavigate()
  const category = row.original

  const handleDelete = async () => {
    const isConfirmed = await confirm({
      title: t('accounts.table.actions.confirmDelete', {
        account: category.name,
      }),
    })
    if (isConfirmed) {
      mutate(category.id)
    }
  }

  const handleEdit = () => {
    navigate(ROUTES.categories.edit, { state: { category } })
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
          {t('categories.table.actions.title')}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleEdit}>
          {t('categories.table.actions.edit')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete}>
          {t('categories.table.actions.delete')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Actions
