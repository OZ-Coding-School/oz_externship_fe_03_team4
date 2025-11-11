export type AdminRecruitmentsParams = {
  searchText?: string // 검색어
  statusFilter?: '모집중' | '마감' // 상태 필터
  selectedTags?: string[] // 태그 필터
  ordering: 'latest' | 'oldest' | 'views' | 'bookmarks' // 정렬 방식
  pageNumber?: number // 페이지 번호
  pageSize?: number // 페이지당 출력될 항목의 수
}
export type RecruitmentOrdering = AdminRecruitmentsParams['ordering']
