import type { ReviewsParams } from './types.local'

export const buildQueryParams = (reviewsParams: ReviewsParams) => {
  const effectivePageSize = Math.min(
    Math.max(reviewsParams.pageSize ?? 20, 1), // 페이지 최소 1, 최대 100
    100
  )
  const effectivePageNumber = Math.max(1, reviewsParams.pageNumber ?? 1)
  const computedOffset = (effectivePageNumber - 1) * effectivePageSize

  const queryParams: Record<string, string | number> = {
    // 필수 기본 파라미터
    limit: effectivePageSize,
    offset: computedOffset,
  }

  if (reviewsParams.sortKey) {
    queryParams.sort = reviewsParams.sortKey
  }
  // 검색어 : 이메일이면 user_eamil, 그외 : user_nickname 분기
  const trimmedSearchText = (reviewsParams.searchText ?? '').trim()
  if (trimmedSearchText) {
    if (trimmedSearchText.includes('@')) {
      queryParams.user_email = trimmedSearchText
    } else {
      queryParams.user_nickname = trimmedSearchText
    }
  }

  return queryParams
}
