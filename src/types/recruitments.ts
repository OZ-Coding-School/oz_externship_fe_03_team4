import {
  type StudyGroupDTO,
  type StudyGroup,
  mapStudyGroupDTO,
} from './studyGroup/types'

import {
  type ApplicationApi,
  type Application,
  mapApplicationApiToUi,
} from './applications'

import type { LectureDTO } from './lectureManagement/types'

export type RecruitmentStatusApi = '모집중' | '마감' // API에서 내려오는 값
export type RecruitmentOrderingApi = 'latest' | 'oldest' | 'views' | 'bookmarks' // 정렬 키값

// 서버 응답
export interface RecruitmentDTO {
  id: number
  uuid: string
  title: string
  tags: string[]
  is_closed: boolean
  close_at: string
  status: string
  views_count: number
  bookmarks_count: number
  created_at: string
  updated_at: string | null
}
export interface RecruitmentListResponseDTO {
  count: number
  next: string | null
  previous: string | null
  results: RecruitmentDTO[]
}
// ui에서 사용할 값들
export interface Recruitment {
  id: number
  uuid: string
  title: string
  tags: string[]
  isClosed: boolean
  closeAt: string
  status: string
  viewsCount: number
  bookmarksCount: number
  createdAt: string
  updatedAt: string | null
}

export const mapRecruitmentDTO = (dto: RecruitmentDTO): Recruitment => ({
  id: dto.id,
  uuid: dto.uuid,
  title: dto.title,
  tags: dto.tags,
  isClosed: dto.is_closed,
  closeAt: dto.close_at,
  status: dto.status,
  viewsCount: dto.views_count,
  bookmarksCount: dto.bookmarks_count,
  createdAt: dto.created_at,
  updatedAt: dto.updated_at,
})
export interface RecruitmentAttachmentDTO {
  file_name: string
  file_url: string
}
export interface RecruitmentTagDTO {
  name: string
}
export type RecruitmentLectureDTO = Pick<
  LectureDTO,
  'thumbnail_img_url' | 'title' | 'instructor' | 'url_link'
>
// tags만 제외하고 상속하기
export interface RecruitmentDetailDTO extends Omit<RecruitmentDTO, 'tags'> {
  uuid: string
  content: string // markdown 호환
  attachments: RecruitmentAttachmentDTO[]
  expected_headcount: number
  estimated_fee: number
  study_lectures: RecruitmentLectureDTO[]
  tags: RecruitmentTagDTO[]
  is_closed: boolean
  applications: ApplicationApi[]
  study_group?: StudyGroupDTO | null
}

export interface RecruitmentDetail extends Recruitment {
  uuid: string
  content: string
  attachments: { fileName: string; fileUrl: string }[]
  expectedHeadcount: number
  estimatedFee: number
  lectures: {
    thumbnail: string
    title: string
    instructor: string
    link: string
  }[]
  isClosed: boolean
  applications: Application[]
  studyGroup?: StudyGroup | null
}

export const mapRecruitmentDetailDTO = (
  detailDto: RecruitmentDetailDTO
): RecruitmentDetail => {
  const baseUi: Recruitment = mapRecruitmentDTO({
    ...detailDto,
    tags: detailDto.tags.map((tag) => tag.name),
  })
  const attachments = detailDto.attachments.map((attachment) => ({
    fileName: attachment.file_name,
    fileUrl: attachment.file_url,
  }))
  const lectures = detailDto.study_lectures.map((lecture) => ({
    thumbnail: lecture.thumbnail_img_url ?? '',
    title: lecture.title,
    instructor: lecture.instructor,
    link: lecture.url_link,
  }))

  const applicationsUi = detailDto.applications.map((applicationApi) =>
    mapApplicationApiToUi(applicationApi)
  )

  const studyGroupUi =
    detailDto.study_group != null
      ? mapStudyGroupDTO(detailDto.study_group)
      : null

  return {
    ...baseUi,
    uuid: detailDto.uuid,
    content: detailDto.content,
    attachments,
    expectedHeadcount: detailDto.expected_headcount,
    estimatedFee: detailDto.estimated_fee,
    lectures,
    isClosed: detailDto.is_closed,
    applications: applicationsUi,
    studyGroup: studyGroupUi,
  }
}
export interface AdminRecruitmentsParams {
  searchText?: string
  statusFilter?: RecruitmentStatusApi
  selectedTags?: string[]
  ordering?: RecruitmentOrderingApi
  pageSize?: number
  pageNumber?: number
}
