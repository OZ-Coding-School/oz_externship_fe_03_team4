import api from '../lib/axios'
import { getAccessToken } from '../lib/token'

export const restoreWithdrawals = async (userId: number) => {
  const accessToken = getAccessToken()

  const response = await api.post(`/v1/admin/users/restore/${userId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response.data.detail
}
