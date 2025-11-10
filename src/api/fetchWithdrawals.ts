import api from '../lib/axios'
import { getAccessToken } from '../lib/token'

export interface FetchWithdrawalsParams {
  page?: number
  limit?: number
  start_date?: string
  end_date?: string
  reason?: string
  keyword?: string
  role?: 'user' | 'staff' | 'admin'
}

export const fetchWithdrawals = async ({
  page = 1,
  limit = 10,
  start_date = '',
  end_date = '',
  reason = '',
  keyword = '',
  role,
}: FetchWithdrawalsParams) => {
  const accessToken = getAccessToken()
  const response = await api.get('/v1/admin/users/withdrawals', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      page,
      limit,
      start_date,
      end_date,
      reason,
      keyword,
      role,
    },
  })
  return response.data.data
}

export const fetchWithdrawalDetail = async ({ userId }: { userId: number }) => {
  const accessToken = getAccessToken()
  const response = await api.get(`/v1/admin/users/withdrawals/${userId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  return response.data.data
}
