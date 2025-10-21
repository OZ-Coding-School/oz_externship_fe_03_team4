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
  const queryParams = buildQueryParams(reviewsParams)
  const fetchAdminReviewList = () => fetchReviews(queryParams)

  return useQuery<
    FetchReviewsReturn,
    Error,
    FetchReviewsReturn,
    ReturnType<typeof adminReviewQueryKey>
  >({
    queryKey: adminReviewQueryKey(queryParams),
    queryFn: fetchAdminReviewList,
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  })
}
// 타입으로 꺼내쓸수 있도록 설정
export type { ReviewsParams } from './types.local'
