import type { StudyGroupsParams } from './types.local'

export const buildQueryParams = (params: StudyGroupsParams) => {
  const effectivePageSize = Math.min(Math.max(params.pageSize ?? 20, 1), 100)
  const effectivePageNumber = Math.max(1, params.pageNumber ?? 1)
  const computedOffset = (effectivePageNumber - 1) * effectivePageSize

  const queryParams: Record<string, string | number> = {
    limit: effectivePageSize,
    offset: computedOffset,
  }

  if (params.sortKey) {
    queryParams.ordering = params.sortKey
  }

  if (params.status) {
    queryParams.status = params.status
  }

  const trimmedSearchText = (params.searchText ?? '').trim()
  if (trimmedSearchText) {
    queryParams.search = trimmedSearchText
  }

  return queryParams
}
