import { useQuery } from '@tanstack/react-query'
import { mapDtoToReviewDetail, type ReviewDTO } from '../../types/reviews/types'
import api from '../../lib/axios'

export const useReviewDetailQuery = (reviewId: number | null) => {
  return useQuery({
    queryKey: ['admin', 'review', reviewId],
    enabled: !!reviewId,
    queryFn: async () => {
      const { data } = await api.get<ReviewDTO>(
        `/v1/admin/studies/reviews/${reviewId}`
      )
      return mapDtoToReviewDetail(data)
    },
  })
}
