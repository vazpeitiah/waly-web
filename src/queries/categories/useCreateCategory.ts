import { createCategory } from '@/api/categories'
import { QK } from '@/utils/const'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

const useCreateCategory = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  const { mutate, data, isPending, isSuccess } = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QK.categories.read],
      })
      toast.success(t('categories.create.success'))
    },
    onError: () => {
      toast.error(t('categories.create.error'))
    },
  })

  return {
    createCategory: mutate,
    isPending,
    isSuccess,
    data,
  }
}

export default useCreateCategory
