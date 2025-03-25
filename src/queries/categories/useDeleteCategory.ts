import { deleteCategory } from '@/api/categories'
import { QK } from '@/utils/const'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

const useDeleteCategory = () => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      toast.success(t('categories.delete.success'))
      queryClient.invalidateQueries({
        queryKey: [QK.categories.read],
      })
    },
  })
}

export default useDeleteCategory
