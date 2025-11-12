import api from '../../lib/axios'
import {
  mapDtoToReview,
  type Review,
  type ReviewListDTO,
} from '../../types/reviews/types'

export type FetchReviewsReturn = {
  items: Review[]
  totalCount: number // 전체 페이지 수
  pageSize: number // 페이지당 목록의 개수
  offset: number // 시작 위치
}

export const fetchReviews = async (
  queryParams: Record<string, string | number>
): Promise<FetchReviewsReturn> => {
  const { data } = await api.get<ReviewListDTO>('/v1/admin/studies/reviews', {
    params: queryParams,
  })

  const pageSize = Number(queryParams.page_size) || 10
  const page = Number(queryParams.page) || 1

  return {
    // 서버 응답 데이털르 내부 타입으로 포맷팅
    items: data.results.map(mapDtoToReview),
    totalCount: data.count,
    pageSize,
    offset: (page - 1) * pageSize,
  }
}
