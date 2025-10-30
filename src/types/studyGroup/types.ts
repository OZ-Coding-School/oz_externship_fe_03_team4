import { formatDate } from '../../utils/formatDate'

// API용 상태 타입
export type StudyGroupStatus = 'PENDING' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED'

export type StudyGroupLectureDTO = {
  id: number
  title: string
  instructor: string
}

export type StudyGroupDTO = {
  id: number
  name: string
  profile_img_url: string
  max_headcount: number
  start_at: string
  end_at: string
  status: StudyGroupStatus
  current_headcount: number
  is_leader: boolean
  lectures: StudyGroupLectureDTO[]
  created_at: string
  updated_at: string
}

export type StudyGroupListResponse = {
  count?: number
  next?: string | null
  previous?: string | null
  results: StudyGroupDTO[]
}

// UI용 상태 타입
export type StudyGroupUiStatus = '대기중' | '진행중' | '완료' | '취소됨'

// UI용 타입
export type StudyGroup = {
  id: number
  name: string
  profileImg: string
  maxHeadcount: number
  currentHeadcount: number
  startAt: string
  endAt: string
  status: StudyGroupUiStatus
  isLeader: boolean
  lectures: StudyGroupLectureDTO[]
  createdAt: string
  updatedAt: string
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
    name: dto.name,
    profileImg: dto.profile_img_url,
    maxHeadcount: dto.max_headcount,
    currentHeadcount: dto.current_headcount,
    startAt: dto.start_at,
    endAt: dto.end_at,
    status: STUDY_GROUP_STATUS_MAP[dto.status],
    isLeader: dto.is_leader,
    lectures: dto.lectures,
    createdAt: formatDate(dto.created_at),
    updatedAt: formatDate(dto.updated_at),
  }
}
