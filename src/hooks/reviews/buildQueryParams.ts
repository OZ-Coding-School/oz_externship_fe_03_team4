import type { ReviewsParams } from './types.local'

export const buildQueryParams = (reviewsParams: ReviewsParams) => {
  const effectivePageSize = Math.min(
    Math.max(reviewsParams.pageSize ?? 20, 1),
    100
  )
  const effectivePageNumber = Math.max(1, reviewsParams.pageNumber ?? 1)
  const computedOffset = (effectivePageNumber - 1) * effectivePageSize

  const queryParams: Record<string, string | number> = {
    limit: effectivePageSize,
    offset: computedOffset,
  }

  if (reviewsParams.sortKey) {
    queryParams.sort = reviewsParams.sortKey
  }

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
