// API 스키마
// 지원 상태 (서버에서 내려오는 값)
export type ApplicationStatusServer =
  | 'ACCEPTED' // 승인
  | 'APPLYING' // 지원중
  | 'REVIEWING' // 검토중
  | 'REJECTED' // 거절

export type AdminApplicationStatus = ApplicationStatusServer

// 서버에서 제공해주는 지원 내역 데이터들
export interface ApplicationApi {
  id: number // ui표시용, 고유id
  recruitment_title: string // 공고명
  applicant_nickname: string // 지원자이름
  applicant_email: string // 이메일
  status: AdminApplicationStatus // 지원 상태
  created_at: string // 지원일
  updated_at: string // 수정일
}

export type AdminApplicationApi = ApplicationApi

export interface ApplicationDetailApi extends ApplicationApi {
  // 없는 부분만 추가에유~
  self_introduction: string
  motivation: string
  objective: string
  availableTime: string
  hasStudyExperience: boolean
  studyExperience: string | null
  recruitment: {
    id: number
    title: string
    expectedHeadcount: number
    courses: Array<{ name: string; instructor: string }>
    tags: string[]
    deadline: string
  }
  applicantDetail: {
    id: number
    gender: string | null
    profileImage: string | null
  }
}

export type AdminApplicationDetailApi = ApplicationDetailApi

// 쿼리 파라미터와 정렬해주는 키
export type SortKeyApi =
  | '-created_at'
  | 'created_at'
  | '-updated_at'
  | 'updated_at'

export type AdminSortKey = SortKeyApi
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
  aid: number
  id: string
  postingTitle: string // 공고명
  applicant: Applicant
  status: ApplicationStatus
  appliedAt: string
  updatedAt: string
}

export interface ApplicationDetail extends Application {
  applicationCode?: string
  selfIntroduction: string
  motivation: string
  objective: string
  availableTime: string
  hasStudyExperience: boolean
  studyExperience: string | null
  recruitment: {
    id: number
    title: string
    expectedHeadcount: number
    courses: Array<{ name: string; instructor: string }>
    tags: string[]
    deadline: string
  }
  applicantExtra: {
    id: number
    gender: string | null
    profileImage: string | null
  }
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
export const mapApplicationApiToUi = (a: ApplicationApi): Application => ({
  aid: a.id,
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

export const mapAdminApiToUi = mapApplicationApiToUi

export const mapApplicationDetailApiToUi = (
  detail: ApplicationDetailApi,
  base?: Application
): ApplicationDetail => {
  const baseUi = base ?? mapApplicationApiToUi(detail)
  return {
    ...baseUi,
    selfIntroduction: detail.self_introduction,
    motivation: detail.motivation,
    objective: detail.objective,
    availableTime: detail.availableTime,
    hasStudyExperience: detail.hasStudyExperience,
    studyExperience: detail.studyExperience,
    recruitment: {
      id: detail.recruitment.id,
      title: detail.recruitment.title,
      expectedHeadcount: detail.recruitment.expectedHeadcount,
      courses: detail.recruitment.courses,
      tags: detail.recruitment.tags,
      deadline: detail.recruitment.deadline,
    },
    applicantExtra: {
      id: detail.applicantDetail.id,
      gender: detail.applicantDetail.gender,
      profileImage: detail.applicantDetail.profileImage,
    },
  }
}
