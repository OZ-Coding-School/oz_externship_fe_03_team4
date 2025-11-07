import { useMutation, useQueryClient } from '@tanstack/react-query'
import { restoreWithdrawals } from '../../api/restoreWithdrawals'

export const useWithdrawalRestoreMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (userId: number) => restoreWithdrawals(userId),
    onSuccess: (_data, userId) => {
      queryClient.invalidateQueries({ queryKey: ['withdrawals'] })
      queryClient.invalidateQueries({ queryKey: ['withdrawalDetail', userId] })
    },
  })
}