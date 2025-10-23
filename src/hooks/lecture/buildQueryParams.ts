import type { LecturesParams } from './types.local'

export const buildQueryParams = (lecturesParams: LecturesParams) => {
  const effectivePageSize = Math.min(
    Math.max(lecturesParams.pageSize ?? 20, 1),
    100
  )
  const effectivePageNumber = Math.max(1, lecturesParams.pageNumber ?? 1)
  const computedOffset = (effectivePageNumber - 1) * effectivePageSize

  const queryParams: Record<string, string | number> = {
    limit: effectivePageSize,
    offset: computedOffset,
  }

  if (lecturesParams.sortKey) {
    queryParams.ordering = lecturesParams.sortKey
  }

  if (lecturesParams.platform) {
    queryParams.platform = lecturesParams.platform
  }

  if (lecturesParams.difficulty) {
    queryParams.difficulty = lecturesParams.difficulty
  }

  const trimmedSearchText = (lecturesParams.searchText ?? '').trim()
  if (trimmedSearchText) {
    queryParams.search = trimmedSearchText
  }

  return queryParams
}
