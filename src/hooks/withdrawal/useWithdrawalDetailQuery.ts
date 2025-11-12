import { fetchWithdrawalDetail } from '../../api/fetchWithdrawals'
import { useQuery } from '@tanstack/react-query'

type Params = {
  withdrawal_id?: number
  enabled?: boolean
}

export const useWithdrawalDetailQuery = ({
  withdrawal_id,
  enabled = true,
}: Params) => {
  return useQuery({
    queryKey: ['withdrawalDetail', withdrawal_id],
    queryFn: () => fetchWithdrawalDetail({ withdrawal_id: withdrawal_id! }),
    enabled: enabled && !!withdrawal_id,
  })
}
