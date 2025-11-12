import {
  fetchWithdrawals,
  type FetchWithdrawalsParams,
} from '../../api/fetchWithdrawals'
import { useQuery } from '@tanstack/react-query'

export const useWithdrawalQuery = ({
  page,
  page_size,
  keyword,
  role,
  ordering,
}: FetchWithdrawalsParams) => {
  return useQuery({
    queryKey: ['withdrawals', page, page_size, keyword, role, ordering],
    queryFn: () =>
      fetchWithdrawals({
        page,
        page_size,
        keyword,
        role,
        ordering,
      }),
  })
}
