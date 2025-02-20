import { ColumnDef } from '@tanstack/react-table'

import { Account } from '@/models/account'
import Actions from './actions'

export const columns: ColumnDef<Account>[] = [
  {
    accessorKey: 'name',
    header: 'accounts.table.columns.name',
  },
  {
    accessorKey: 'type',
    header: 'accounts.table.columns.type',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return <Actions accountRow={row} />
    },
  },
]
