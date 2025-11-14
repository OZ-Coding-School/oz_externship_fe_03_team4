import type { AdminRecruitmentsParams } from './types.local'

type RecruitmentOrderingApi = NonNullable<AdminRecruitmentsParams['ordering']>

const ORDERING_MAP: Record<RecruitmentOrderingApi, string> = {
  latest: '-created_at',
  oldest: 'created_at',
  views: '-views_count',
  bookmarks: '-bookmarks_count',
}

export type RecruitmentRequestParams = {
  page?: number
  page_size?: number
  keyword?: string
  status?: string
  ordering?: string
  tag?: string[]
}

// 검색/필터 옵션을 서버 쿼리 파라미터로 변환할 함수
export const buildRecruitmentsQueryParams = (
  options: AdminRecruitmentsParams
): RecruitmentRequestParams => {
  // 페이지 기본값 설정 및 제어
  const page = Math.max(1, options.pageNumber ?? 1)
  const pageSize = Math.min(Math.max(options.pageSize ?? 10, 1), 100)
  // 기본 파라미터
  const queryParams: RecruitmentRequestParams = {
    page,
    page_size: pageSize,
  }
  // 검색어
  const trimmedSearchText = (options.searchText ?? '').trim()
  if (trimmedSearchText) {
    queryParams.keyword = trimmedSearchText
  }
  // 상태필터
  if (options.statusFilter) {
    queryParams.status = options.statusFilter
  }
  // 선택된 태그가 여러개? -> tag1, tag2 형태로 보냄
  if (options.selectedTags && options.selectedTags.length > 0) {
    queryParams.tag = options.selectedTags
  }
  // 정렬
  if (options.ordering) {
    const mapped = ORDERING_MAP[options.ordering]
    if (mapped) {
      queryParams.ordering = mapped
    }
  }
  return queryParams
}
