import { createAccount } from '@/api/accounts'
import { QK } from '@/utils/const'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

const useCreateAccount = () => {
  const queryClient = useQueryClient()
  const { data, isPending, isSuccess, mutate } = useMutation({
    mutationFn: createAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QK.accounts.read] })
      toast.success('Account created successfully')
    },
  })

  return { data, isPending, isSuccess, mutate }
}

export default useCreateAccount
