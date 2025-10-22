import api from '../../lib/axios'
import {
  mapDtoToReview,
  type Review,
  type ReviewListDTO,
} from '../../types/reviews/types'

export type FetchReviewsReturn = {
  items: Review[]
  totalCount: number    // 전체 페이지 수 
  pageSize: number      // 페이지당 목록의 개수
  offset: number        // 시작 위치
}

export const fetchReviews = async (
  queryParams: Record<string, string | number>
): Promise<FetchReviewsReturn> => {
  const response = await api.get<ReviewListDTO>('/v1/studies/admin/reviews', {
    params: queryParams,
  })
  const detail = response.data.detail
  return {  // 서버 응답 데이털르 내부 타입으로 포맷팅
    items: detail.results.map(mapDtoToReview),
    totalCount: detail.count,
    pageSize: Number(queryParams.limit),
    offset: Number(queryParams.offset),
  }
}
