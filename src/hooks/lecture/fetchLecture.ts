import api from '../../lib/axios'
import {
  mapLectureDTO,
  type Lecture,
  type LectureListResponse,
} from '../../types/lectureManagement/types'

export type FetchLecturesReturn = {
  items: Lecture[]
  totalCount: number
  pageSize: number
  offset: number
  userNickname?: string
  recommendedLectures: Lecture[]
}

export const fetchLectures = async (
  queryParams: Record<string, string | number>
): Promise<FetchLecturesReturn> => {
  const response = await api.get<LectureListResponse>('/v1/admin/lectures', {
    params: queryParams,
  })

  const data = response.data

  return {
    items: data.results.map(mapLectureDTO),
    totalCount: data.count,
    pageSize: Number(queryParams.limit),
    offset: Number(queryParams.offset),
    userNickname: data.user_nickname,
    recommendedLectures: data.recommended_lectures.map(mapLectureDTO),
  }
}
