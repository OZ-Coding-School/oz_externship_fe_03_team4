import {
  useQuery,
  keepPreviousData,
  type UseQueryResult,
} from '@tanstack/react-query'
import { adminReviewQueryKey } from './queryKeys'
import { buildQueryParams } from './buildQueryParams'
import { fetchReviews, type FetchReviewsReturn } from './fetchReviews'
import type { ReviewsParams } from './types.local'

export const useReviewsQuery = (
  reviewsParams: ReviewsParams
): UseQueryResult<FetchReviewsReturn, Error> => {
  const queryParams = buildQueryParams(reviewsParams) // api쿼리 파라미터 생성
  const fetchAdminReviewList = () => fetchReviews(queryParams) // 페치함수 리액트쿼리는 queryFn을 항상 함수 형태로 받도록.

  return useQuery<
    FetchReviewsReturn,   // 성공시 반환
    Error,                // 실패할 경우 에러타입
    FetchReviewsReturn,   // 셀렉트 후 반환
    ReturnType<typeof adminReviewQueryKey>
  >({
    queryKey: adminReviewQueryKey(queryParams),   // 캐시 구분용 키
    queryFn: fetchAdminReviewList,        // 실제 요청함수
    placeholderData: keepPreviousData,     // 페이지 전환될 경우 이전 데이터 유지(깜박임 현상 없도록)
    staleTime: 30_000,              // 30초 동안 캐시의 신선도를 유지
  })
}
// 타입으로 꺼내쓸수 있도록 설정
export type { ReviewsParams } from './types.local'
