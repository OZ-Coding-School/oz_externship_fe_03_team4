export type RecruitmentStatusApi = '모집중' | '마감' // API에서 내려오는 값
export type RecruitmentOrderingApi = 'latest' | 'oldest' | 'views' | 'bookmarks' // 정렬 키값

// 서버 응답
export interface RecruitmentDTO {
  id: number
  title: string
  tags: string[]
  close_at: string
  status: RecruitmentStatusApi
  views_count: number
  bookmarks_count: number
  created_at: string
  updated_at: string | null
}

export interface RecruitmentListResponseDTO {
  results: RecruitmentDTO[]
  page: number
  page_size: number
  total_count: number
}

// ui에서 사용할 값들
export interface Recruitment {
  id: number
  title: string
  tags: string[]
  closeAt: string
  status: RecruitmentStatusApi
  viewsCount: number
  bookmarksCount: number
  createdAt: string
  updatedAt: string | null
}

export const mapRecruitmentDTO = (dto: RecruitmentDTO): Recruitment => ({
  id: dto.id,
  title: dto.title,
  tags: dto.tags,
  closeAt: dto.close_at,
  status: dto.status,
  viewsCount: dto.views_count,
  bookmarksCount: dto.bookmarks_count,
  createdAt: dto.created_at,
  updatedAt: dto.updated_at,
})
