// API 스키마
// 지원 상태 (서버에서 내려오는 값)
export type ApplicationStatusServer =
  | 'ACCEPTED' // 승인
  | 'APPROVED' // 승인
  | 'APPLYING' // 지원중
  | 'APPLIED' // 대기
  | 'REVIEWING' // 검토중
  | 'REJECTED' // 거절
  | 'PENDING' // 대기
  | 'CANCELED' // 거절

export type AdminApplicationStatus = ApplicationStatusServer

// 서버에서 제공해주는 지원 내역 데이터들
export interface ApplicationApi {
  id: number // ui표시용, 고유id
  uuid?: string
  user: {
    id: number
    nickname: string
    email: string
  }
  recruitment: {
    id: number
    title: string
  }
  status: 'PENDING' | 'APPROVED' | 'CANCELED' | 'REJECTED'
  status_display: string
  created_at: string
  updated_at: string
}

export type AdminApplicationApi = ApplicationApi

export interface ApplicationDetailApi extends ApplicationApi {
  // 기존 목록에 없던 부분만 추가에유~
  self_introduction: string // 자기소개
  motivation: string // 지원동기
  objective: string // 목표
  available_time: string // 가능시간
  has_study_experience: boolean // 스터디 경험여부
  study_experience: string | null //  경험상세내용
  recruitment: {
    // 공고정보
    id: number // 공고id
    title: string // 공고제목
    expected_headcount: number // 모집인원
    courses: Array<{ name: string; instructor: string }> // 강의목록 [강의이름 / 강사명]
    tags: string[] // 태그 목록
    deadline: string // 모집마감일
    close_at?: string
  }
  applicant: {
    id: number // 지원자고유 id
    gender: string | null // 성별
    profile_image: string | null // 프로필이미지 url
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
export type ApplicationStatus = '승인' | '검토중' | '대기' | '거절'
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
  uuid?: string
  postingTitle: string // 공고명
  applicant: Applicant
  status: ApplicationStatus
  appliedAt: string
  updatedAt: string
}

export interface ApplicationDetail extends Application {
  applicationCode?: string // 추적용 코드
  selfIntroduction: string // 자기소개
  motivation: string // 지원동기
  objective: string // 목표
  availableTime: string // 가능시간
  hasStudyExperience: boolean // 스터디경험여부
  studyExperience: string | null // 경험상세내용
  recruitment: {
    // 공고정보
    id: number // 공고id
    title: string // 제목
    expectedHeadcount: number // 인원
    courses: Array<{ name: string; instructor: string }> // 강의명
    tags: string[] // 태그
    deadline: string // 모집마감일
  }
  applicantExtra: {
    // 지원자 추가정보
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
    APPROVED: '승인',
    REVIEWING: '검토중',
    PENDING: '대기',
    APPLYING: '대기',
    APPLIED: '대기',
    REJECTED: '거절',
    CANCELED: '거절',
  }

export const uiStatusToApi: Record<ApplicationStatus, AdminApplicationStatus> =
  // 요긴 반대입니당
  {
    승인: 'ACCEPTED',
    검토중: 'REVIEWING',
    대기: 'PENDING',
    거절: 'REJECTED',
  }

// api응답을 프론트에서 사용하는 걸로 변환해주는 매핑 함수
export const mapApplicationApiToUi = (a: ApplicationApi): Application => {
  const withCompat = a as ApplicationApi & {
    applied_at?: string
    nickname?: string
    email?: string
  }
  const nickname = a.user?.nickname ?? withCompat.nickname ?? ''
  const email = a.user?.email ?? withCompat.email ?? ''

  return {
    aid: a.id,
    id: `#${a.id}`,
    uuid: a.uuid,
    postingTitle: a.recruitment?.title ?? '',
    applicant: { name: nickname, email },
    status: apiStatusToUi[a.status],
    appliedAt: new Date(withCompat.applied_at ?? a.created_at).toLocaleString(
      'ko-KR',
      {
        timeZone: 'Asia/Seoul',
      }
    ), // 대한민국 시간으로 포맷팅
    updatedAt: new Date(a.updated_at).toLocaleString('ko-KR', {
      timeZone: 'Asia/Seoul',
    }), // 대한민국 시간으로 포맷팅
  }
}

export const mapAdminApiToUi = mapApplicationApiToUi

type ApplicantLike = {
  id: number
  gender?: string | null
  profile_image?: string | null
  profile_img_url?: string | null
}

export const mapApplicationDetailApiToUi = (
  detail: ApplicationDetailApi,
  base?: Application
): ApplicationDetail => {
  const baseUi: Application = base ?? mapApplicationApiToUi(detail)

  const applicantSource: ApplicantLike = detail.applicant ??
    (detail as unknown as { user?: ApplicantLike }).user ?? {
      id: baseUi.aid,
    }
  return {
    ...baseUi, // 목록의 공통 필드들을 복사합니당
    applicationCode: detail.uuid,
    selfIntroduction: detail.self_introduction,
    motivation: detail.motivation,
    objective: detail.objective,
    availableTime: detail.available_time,
    hasStudyExperience: detail.has_study_experience,
    studyExperience: detail.study_experience,
    recruitment: {
      // 공고정보
      id: detail.recruitment.id,
      title: detail.recruitment.title,
      expectedHeadcount: detail.recruitment.expected_headcount,
      courses: detail.recruitment.courses,
      tags: detail.recruitment.tags,
      deadline:
        detail.recruitment.deadline ?? detail.recruitment.close_at ?? '',
    },
    applicantExtra: {
      // 지원자 정보
      id: applicantSource.id ?? baseUi.aid,
      gender: applicantSource.gender ?? null,
      profileImage:
        applicantSource.profile_image ??
        applicantSource.profile_img_url ??
        null,
    },
  }
}
