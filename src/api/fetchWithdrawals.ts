import api from '../lib/axios'
import { getAccessToken } from '../lib/token'

export interface FetchWithdrawalsParams {
  page?: number
  page_size?: number
  keyword?: string
  role?: 'user' | 'staff' | 'admin'
  reason?: string
  ordering?: string
}

export const fetchWithdrawals = async ({
  page = 1,
  page_size = 20,
  keyword = '',
  role,
  reason,
  ordering,
}: FetchWithdrawalsParams) => {
  const accessToken = getAccessToken()

  const response = await api.get('/v1/admin/withdrawals', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      page,
      page_size,
      keyword,
      role,
      reason,
      ordering,
    },
  })

  return response.data.data
}

export const fetchWithdrawalDetail = async ({
  withdrawal_id,
}: {
  withdrawal_id: number
}) => {
  const accessToken = getAccessToken()
  const response = await api.get(`/v1/admin/withdrawals/${withdrawal_id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response.data.data
}
