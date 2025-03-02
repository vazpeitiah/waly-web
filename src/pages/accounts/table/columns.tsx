import { ColumnDef } from '@tanstack/react-table'

import { Account } from '@/models/account'
import Actions from './actions'
import Header from './header'
import TypeCell from './type-cell'

export const columns: ColumnDef<Account>[] = [
  {
    accessorKey: 'name',
    header: () => <Header header="accounts.table.columns.name" />,
  },
  {
    accessorKey: 'type',
    header: () => <Header header="accounts.table.columns.type" />,
    cell: ({ row }) => <TypeCell row={row.original} />,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return <Actions accountRow={row} />
    },
  },
]
