import type { AdminRecruitmentsParams } from './types.local'

export type RecruitmentRequestParams = Record<string, string | number>

const clampNumber = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max)
// 검색/필터 옵션을 서버 쿼리 파라미터로 변환할 함수
export const buildRecruitmentsQueryParams = (
  options: AdminRecruitmentsParams
): RecruitmentRequestParams => {
  // 페이지 기본값 설정 및 제어
  const normalizedPageSize = clampNumber(options.pageSize ?? 20, 1, 100)
  const normalizedPageNumber = Math.max(1, options.pageNumber ?? 1)
  // 기본 파라미터
  const queryParams: RecruitmentRequestParams = {
    page: normalizedPageNumber,
    page_size: normalizedPageSize,
  }
  // 검색어
  const trimmedSearchText = (options.searchText ?? '').trim()
  if (trimmedSearchText) {
    queryParams.search = trimmedSearchText
  }
  // 상태필터
  if (options.statusFilter) {
    queryParams.status = options.statusFilter
  }
  // 선택된 태그가 여러개? -> tag1, tag2 형태로 보냄
  if (options.selectedTags && options.selectedTags.length > 0) {
    queryParams.tags = options.selectedTags.join(',')
  }
  // 정렬
  if (options.ordering) {
    queryParams.ordering = options.ordering
  }

  return queryParams
}
