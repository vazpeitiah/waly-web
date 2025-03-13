import { ColumnDef } from '@tanstack/react-table'

import Actions from './actions'
import Header from './header'
import { Category } from '@/models/category'

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: 'name',
    header: () => <Header header="accounts.table.columns.name" />,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return <Actions row={row} />
    },
  },
]
