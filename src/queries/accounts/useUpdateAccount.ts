import { updateAccount } from '@/api/accounts'
import { QK } from '@/utils/const'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

const useUpdateAccount = () => {
  const queryClient = useQueryClient()
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: updateAccount,
    onSuccess: () => {
      toast.success('Account updated successfully')
      queryClient.invalidateQueries({ queryKey: [QK.accounts.read] })
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  return { mutate, isPending, isSuccess }
}

export default useUpdateAccount
