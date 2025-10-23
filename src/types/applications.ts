// 지원관리 페이지용
export type ApplicationStatus = '승인' | '검토중' | '대기' | '거절'
export type StatusFilter = '전체' | ApplicationStatus

export type SortKey = '-appliedAt' | 'appliedAt' | '-updatedAt' | 'updatedAt'

export interface Applicant {
  name: string
  email: string
}

export interface Application {
  id: string
  postingTitle: string  // 공고명
  applicant: Applicant
  status: ApplicationStatus
  appliedAt: string
  updatedAt: string
}
