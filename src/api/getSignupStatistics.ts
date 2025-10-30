import api from ''
import type { SignupStatisticsDTO } '../types/Chart/SignupChart/types'
export type SignupInterval = 'month' | 'year'

export const getSignupStatistics = async (
  interval: SignupInterval
): Promise<SignupStatisticsDTO> => {
  const response = await api.get('/v1/users/statistics/signups', { params: {interval },
})

return response.data as SignupStatisticsDTO
}