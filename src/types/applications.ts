// API 스키마
export type AdminApplicationStatus =
  | 'APPROVED'
  | 'APPLIED'
  | 'PENDING'
  | 'REJECTED'

export interface AdminApplicationApi {
  id: number
  recruitment_title: string
  applicant_nickname: string
  applicant_email: string
  status: AdminApplicationStatus
  created_at: string
  updated_at: string
}
// 쿼리 파라미터와 정렬해주는 키
export type AdminSortKey =
  | '-created_at'
  | 'created_at'
  | '-updated_at'
  | 'updated_at'

export type ApplicationStatus = '승인' | '검토중' | '대기' | '거절'
export type StatusFilter = '전체' | ApplicationStatus

export interface Applicant {
  name: string
  email: string
}

export interface Application {
  id: string
  postingTitle: string // 공고명
  applicant: Applicant
  status: ApplicationStatus
  appliedAt: string
  updatedAt: string
}

// 상태/라벨 매핑하기
export const apiStatusToUi: Record<AdminApplicationStatus, ApplicationStatus> =
  {
    APPROVED: '승인',
    APPLIED: '검토중',
    PENDING: '대기',
    REJECTED: '거절',
  }

export const uiStatusToApi: Record<ApplicationStatus, AdminApplicationStatus> =
  {
    승인: 'APPROVED',
    검토중: 'APPLIED',
    대기: 'PENDING',
    거절: 'REJECTED',
  }

export const mapAdminApiToUi = (a: AdminApplicationApi): Application => ({
  id: `#${a.id}`,
  postingTitle: a.recruitment_title,
  applicant: {
    name: a.applicant_nickname,
    email: a.applicant_email,
  },
  status: apiStatusToUi[a.status],
  appliedAt: new Date(a.created_at).toLocaleString('ko-KR', {
    timeZone: 'Asia/Seoul',
  }), // 대한민국 시간으로 포맷팅
  updatedAt: new Date(a.updated_at).toLocaleString('ko-KR', {
    timeZone: 'Asia/Seoul',
  }), // 대한민국 시간으로 포맷팅
})
