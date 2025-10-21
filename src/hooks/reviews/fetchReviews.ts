import api from '../../lib/axios'
import {
  mapDtoToReview,
  type Review,
  type ReviewListDTO,
} from '../../types/reviews/types'

export type FetchReviewsReturn = {
  items: Review[]
  totalCount: number
  pageSize: number
  offset: number
}

export const fetchReviews = async (
  queryParams: Record<string, string | number>
): Promise<FetchReviewsReturn> => {
  const response = await api.get<ReviewListDTO>('/v1/studies/admin/reviews', {
    params: queryParams,
  })
  const detail = response.data.detail
  return {
    items: detail.results.map(mapDtoToReview),
    totalCount: detail.count,
    pageSize: Number(queryParams.limit),
    offset: Number(queryParams.offset),
  }
}
