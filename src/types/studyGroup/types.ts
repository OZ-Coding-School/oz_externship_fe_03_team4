import { formatDate } from '../../utils/formatDate'

// API용 상태 타입
export type StudyGroupStatus = 'PENDING' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED'

export type StudyGroupLectureDTO = {
  id: number
  title: string
  instructor: string
}

export type StudyGroupLectureDetailDTO = {
  thumbnail_img_url: string
  title: string
  instructor: string
  url_link: string
}

export type StudyGroupMemberDTO = {
  nickname: string
  is_leader: boolean
}

export type StudyGroupDTO = {
  id: number
  uuid: string
  name: string
  current_headcount: number
  max_headcount: number
  profile_img_url: string
  start_at: string
  end_at: string
  status: StudyGroupStatus
  created_at: string
  updated_at: string
}

export type StudyGroupDetailDTO = {
  id: number
  uuid: string
  name: string
  current_headcount: number
  max_headcount: number
  members: StudyGroupMemberDTO[]
  profile_img_url: string
  start_at: string
  end_at: string
  status: StudyGroupStatus
  lectures: StudyGroupLectureDetailDTO[]
  created_at: string
  updated_at: string
}

export type StudyGroupListResponse = {
  count: number
  next: string | null
  previous: string | null
  results: StudyGroupDTO[]
}

export type StudyGroupDetailResponse = {
  message: string
  data: StudyGroupDetailDTO
}

// UI용 상태 타입
export type StudyGroupUiStatus = '대기중' | '진행중' | '완료' | '취소됨'

// UI용 타입
export type StudyGroup = {
  id: number
  uuid: string
  name: string
  profileImg: string
  maxHeadcount: number
  currentHeadcount: number
  startAt: string
  endAt: string
  status: StudyGroupUiStatus
  createdAt: string
  updatedAt: string
}

// UI용 타입
export type StudyGroupDetail = {
  id: number
  uuid: string
  name: string
  currentHeadcount: number
  maxHeadcount: number
  members: StudyGroupMember[]
  profileImg: string
  startAt: string
  endAt: string
  status: StudyGroupUiStatus
  lectures: StudyGroupLectureDetail[]
  createdAt: string
  updatedAt: string
}

// UI용 멤버
export type StudyGroupMember = {
  nickname: string
  isLeader: boolean
}

// UI용 상세 모달창
export type StudyGroupLectureDetail = {
  thumbnailImgUrl: string
  title: string
  instructor: string
  urlLink: string
}

// 상태 매핑
export const STUDY_GROUP_STATUS_MAP: Record<
  StudyGroupStatus,
  StudyGroupUiStatus
> = {
  PENDING: '대기중',
  ACTIVE: '진행중',
  COMPLETED: '완료',
  CANCELLED: '취소됨',
} as const // 지정한 리터럴 타입으로 고정

// UI -> API (검색필터용)
export const STUDY_GROUP_STATUS_REVERSE_MAP: Record<
  StudyGroupUiStatus,
  StudyGroupStatus
> = {
  대기중: 'PENDING',
  진행중: 'ACTIVE',
  완료: 'COMPLETED',
  취소됨: 'CANCELLED',
} as const

// 상태 Badge variant 매핑
export const STUDY_GROUP_STATUS_BADGE: Record<
  StudyGroupUiStatus,
  'success' | 'info' | 'warning' | 'danger'
> = {
  완료: 'success',
  대기중: 'info',
  진행중: 'warning',
  취소됨: 'danger',
} as const

export const STUDY_GROUP_STATUS_OPTIONS: Array<{
  value: StudyGroupUiStatus | 'ALL'
  label: string
}> = [
  { value: 'ALL', label: '전체' },
  { value: '대기중', label: '대기중' },
  { value: '진행중', label: '진행중' },
  { value: '완료', label: '완료' },
  { value: '취소됨', label: '취소됨' },
] as const

// API-> UI
export const mapStudyGroupDTO = (dto: StudyGroupDTO): StudyGroup => {
  return {
    id: dto.id,
    uuid: dto.uuid,
    name: dto.name,
    profileImg: dto.profile_img_url,
    maxHeadcount: dto.max_headcount,
    currentHeadcount: dto.current_headcount,
    startAt: dto.start_at,
    endAt: dto.end_at,
    status: STUDY_GROUP_STATUS_MAP[dto.status],
    createdAt: formatDate(dto.created_at),
    updatedAt: formatDate(dto.updated_at),
  }
}

// API-> UI
export const mapStudyGroupDetailDTO = (
  dto: StudyGroupDetailDTO
): StudyGroupDetail => {
  return {
    id: dto.id,
    uuid: dto.uuid,
    name: dto.name,
    currentHeadcount: dto.current_headcount,
    maxHeadcount: dto.max_headcount,
    members: dto.members.map((member) => ({
      nickname: member.nickname,
      isLeader: member.is_leader,
    })),
    profileImg: dto.profile_img_url,
    startAt: dto.start_at,
    endAt: dto.end_at,
    status: STUDY_GROUP_STATUS_MAP[dto.status],
    lectures: dto.lectures.map((lecture) => ({
      thumbnailImgUrl: lecture.thumbnail_img_url,
      title: lecture.title,
      instructor: lecture.instructor,
      urlLink: lecture.url_link,
    })),
    createdAt: formatDate(dto.created_at),
    updatedAt: formatDate(dto.updated_at),
  }
}
