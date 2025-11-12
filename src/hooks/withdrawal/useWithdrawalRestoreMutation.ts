import { useMutation, useQueryClient } from '@tanstack/react-query'
import { restoreWithdrawals } from '../../api/restoreWithdrawals'

export const useWithdrawalRestoreMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (userId: number) => restoreWithdrawals(userId),
    onSuccess: (_data, userId) => {
      // 목록은 바로 최신화
      queryClient.invalidateQueries({ queryKey: ['withdrawals'] })

      // 상세 캐시는 모달에 보여줄 데이터는 유지하면서 stale 처리만 해둡니다.
      queryClient.invalidateQueries({
        queryKey: ['withdrawalDetail', userId],
        exact: true,
        refetchType: 'inactive', // 재활성화될 때(=다음에 모달 열릴 때) 다시 가져오도록
      })
    },
  })
}
