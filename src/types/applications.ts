// API 스키마
// 지원 상태 (서버에서 내려오는 값)
export type AdminApplicationStatus =
  | 'ACCEPTED' // 승인
  | 'APPLYING' // 지원중
  | 'REVIEWING' // 검토중
  | 'REJECTED' // 거절
// 서버에서 제공해주는 지원 내역 데이터들
export interface AdminApplicationApi {
  id: number // 고유id
  recruitment_title: string // 공고명
  applicant_nickname: string // 지원자이름
  applicant_email: string // 이메일
  status: AdminApplicationStatus // 지원 상태
  created_at: string // 지원일
  updated_at: string // 수정일
}
// 쿼리 파라미터와 정렬해주는 키
export type AdminSortKey =
  | '-created_at'
  | 'created_at'
  | '-updated_at'
  | 'updated_at'

// ui용
export type ApplicationStatus = '승인' | '지원중' | '검토중' | '거절'
export type StatusFilter = '전체' | ApplicationStatus // 상태 필터 옵션
// 지원자 정보
export interface Applicant {
  name: string
  email: string
}
// 우리가 사용하는 지원 내역 데이터 구조
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
  // api -> 상태
  {
    ACCEPTED: '승인',
    APPLYING: '지원중',
    REVIEWING: '검토중',
    REJECTED: '거절',
  }

export const uiStatusToApi: Record<ApplicationStatus, AdminApplicationStatus> =
  // 요긴 반대입니당
  {
    승인: 'ACCEPTED',
    지원중: 'APPLYING',
    검토중: 'REVIEWING',
    거절: 'REJECTED',
  }

// api응답을 프론트에서 사용하는 걸로 변환해주는 매핑 함수
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
