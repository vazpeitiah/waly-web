import { updateCategory } from '@/api/categories'
import { Category, CreateCategory } from '@/models/category'
import { QK } from '@/utils/const'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

type UpdateCategoryData = {
  id: Category['id']
  data: CreateCategory
}

const useUpdateCategory = () => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: UpdateCategoryData) => updateCategory(id, data),
    onSuccess: () => {
      toast.success(t('categories.update.success'))
      queryClient.invalidateQueries({ queryKey: [QK.categories.read] })
    },
  })
}

export default useUpdateCategory
