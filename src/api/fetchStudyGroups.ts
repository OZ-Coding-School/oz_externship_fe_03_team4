import api from '../lib/axios'
import {
  mapStudyGroupDetailDTO,
  mapStudyGroupDTO,
  type StudyGroup,
  type StudyGroupDetail,
  type StudyGroupDetailDTO,
  type StudyGroupListResponse,
} from '../types/studyGroup/types'
import type { StudyGroupsParams } from '../hooks/studyGroup/types.local'
import { buildQueryParams } from '../utils/studyGroup/buildQueryParams'

export type FetchStudyGroupsParams = Record<string, string | number>

export type FetchStudyGroupsReturn = {
  items: StudyGroup[]
  totalCount: number
  hasNext: boolean
  hasPrevious: boolean
}

export const fetchStudyGroups = async (
  params: StudyGroupsParams
): Promise<FetchStudyGroupsReturn> => {
  const queryParams = buildQueryParams(params)
  const response = await api.get<StudyGroupListResponse>(
    '/v1/studies/admin/groups',
    {
      params: queryParams,
    }
  )

  const data = response.data

  return {
    items: data.results.map(mapStudyGroupDTO),
    totalCount: data.count,
    hasNext: !!data.next,
    hasPrevious: !!data.previous,
  }
}

// export const fetchStudyGroupDetail = async (
//   uuid: string
// ): Promise<StudyGroupDetail> => {
//   const response = await api.get<StudyGroupDetailResponse>(
//     `/v1/studies/admin/groups/${uuid}`
//   )
//   return mapStudyGroupDetailDTO(response.data.data)
// }

export const fetchStudyGroupDetail = async (
  uuid: string
): Promise<StudyGroupDetail> => {
  // response.data가 바로 DetailDTO (래퍼 없음)
  const response = await api.get<StudyGroupDetailDTO>(
    `/v1/studies/admin/groups/${uuid}`
  )

  // 타입 파일의 매퍼 함수 재사용
  return mapStudyGroupDetailDTO(response.data)
}
