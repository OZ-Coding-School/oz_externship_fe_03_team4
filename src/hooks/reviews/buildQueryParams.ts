import type { ReviewsParams } from './types.local'

export const buildQueryParams = (reviewsParams: ReviewsParams) => {
  const pageSize = Math.min(Math.max(reviewsParams.pageSize ?? 20, 1), 100)
  const page = Math.max(1, reviewsParams.pageNumber ?? 1)

  const queryParams: Record<string, string | number> = {
    // 필수 기본 파라미터
    page,
    page_size: pageSize,
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
