import { useQuery } from '@tanstack/react-query'
import { mapDtoToReviewDetail, type ReviewDTO } from '../../types/reviews/types'
import api from '../../lib/axios'

export const useReviewDetailQuery = (reviewId: number | null) => {
  return useQuery({
    queryKey: ['admin', 'review', reviewId],
    enabled: !!reviewId,
    queryFn: async () => {
      const { data } = await api.get<{ detail: ReviewDTO }>(
        `/v1/studies/admin/reviews/${reviewId}`
      )
      return mapDtoToReviewDetail(data.detail)
    },
  })
}
