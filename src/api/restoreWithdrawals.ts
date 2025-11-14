import api from '../lib/axios'
import { getAccessToken } from '../lib/token'

export const restoreWithdrawals = async (withdrawal_id: number) => {
  const accessToken = getAccessToken()

  const response = await api.post(
    `/v1/admin/withdrawals/${withdrawal_id}/restore`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )

  return response.data.detail
}
