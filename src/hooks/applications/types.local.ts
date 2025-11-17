import type { AdminSortKey } from '../../types/applications'

export type ApplicationsParams = {
  searchText?: string // 검색어
  statusFilter?: '전체' | '승인' | '검토중' | '대기' | '거절' // 필터 조건
  pageNumber?: number // 현재 페이지 번호
  pageSize: number // 한 페이지에 보여줄 목록의 개수
  sortKey: AdminSortKey
}

export type ApplicationRequestParams = Record<string, string | number>
