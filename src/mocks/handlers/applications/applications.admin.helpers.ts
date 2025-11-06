import {
  VALID_APPLICATION_STATUSES,
  type AdminApplicationRow,
  type AdminApplicationStatus,
  type SortOrder,
} from './applications.admin.types'
import { toInt } from '../_utils'

export const DEFAULT_LIMIT = 10
export const DEFAULT_OFFSET = 0
export const DEFAULT_ORDER: SortOrder = 'desc'

// 요청 url에서 쿼리스트링을 불러옵니다.
export const parseQueryString = (
  requestUrl: string
): {
  searchText: string
  statusFilter: AdminApplicationStatus | ''
  limit: number
  offset: number
  sortOrder: SortOrder
} => {
  const url = new URL(requestUrl)

  const searchText = (url.searchParams.get('q') || '').toLowerCase()
  const rawStatus = (url.searchParams.get('status') || '').toUpperCase()
  const statusFilter = (
    VALID_APPLICATION_STATUSES as readonly string[]
  ).includes(rawStatus)
    ? (rawStatus as AdminApplicationStatus)
    : ''

  const limit = toInt(url.searchParams.get('limit'), DEFAULT_LIMIT)
  const offset = toInt(url.searchParams.get('offset'), DEFAULT_OFFSET)
  const rawOrder = (
    url.searchParams.get('order') || DEFAULT_ORDER
  ).toLowerCase()
  const sortOrder: SortOrder = rawOrder === 'asc' ? 'asc' : 'desc'

  return { searchText, statusFilter, limit, offset, sortOrder }
}

// 닉넴/이멜/공고명 부분일치 검색하기
export const applySearchFilter = (
  list: AdminApplicationRow[],
  searchText: string
): AdminApplicationRow[] => {
  if (!searchText) return list
  return list.filter(
    (row) =>
      row.recruitment_title.toLowerCase().includes(searchText) ||
      row.applicant_nickname.toLowerCase().includes(searchText) ||
      row.applicant_email.toLowerCase().includes(searchText)
  )
}

// 상태값 필터
export const applyStatusFilter = (
  list: AdminApplicationRow[],
  statusFilter: AdminApplicationStatus | ''
): AdminApplicationRow[] => {
  if (!statusFilter) return list
  return list.filter((row) => row.status === statusFilter)
}

// 생성일 기준으로 정렬해유, 기본값은 내림차순으로~
export const applySortByCreatedAt = (
  list: AdminApplicationRow[],
  sortOrder: SortOrder
): AdminApplicationRow[] => {
  return [...list].sort((a, b) =>
    sortOrder === 'asc'
      ? a.created_at.localeCompare(b.created_at)
      : b.created_at.localeCompare(a.created_at)
  )
}
