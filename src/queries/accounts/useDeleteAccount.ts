import { deleteAccount } from '@/api/accounts'
import { QK } from '@/utils/const'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

const useDeleteAccount = () => {
  const queryClient = useQueryClient()
  const { data, mutate, isPending } = useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QK.accounts.read] })
      toast.success('Account deleted')
    },
  })

  return {
    data,
    mutate,
    isPending,
  }
}

export default useDeleteAccount
