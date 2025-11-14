import type { StudyGroupsParams } from '../../hooks/studyGroup/types.local'

export const buildQueryParams = (params: StudyGroupsParams) => {
  const { pageSize = 10, pageNumber = 1, sortKey, searchText, status } = params

  const queryParams: Record<string, string | number> = {
    limit: pageSize,
    offset: (pageNumber - 1) * pageSize,
  }

  // 정렬
  if (sortKey) {
    queryParams.ordering = sortKey
  }

  // 검색
  if (searchText?.trim()) {
    queryParams.search = searchText.trim()
  }

  // 상태 필터
  if (status) {
    queryParams.status = status
  }

  return queryParams
}
