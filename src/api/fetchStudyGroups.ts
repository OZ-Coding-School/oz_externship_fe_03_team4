import api from '../lib/axios'
import {
  mapStudyGroupDTO,
  type StudyGroup,
  type StudyGroupDetailDTO,
  type StudyGroupDetailResponse,
  type StudyGroupListResponse,
} from '../types/studyGroup/types'
import { buildQueryParams } from '../hooks/studyGroup/buildQueryParams'
import type { StudyGroupsParams } from '../hooks/studyGroup/types.local'

export type FetchStudyGroupsParams = Record<string, string | number>

export type FetchStudyGroupsReturn = {
  items: StudyGroup[]
  totalCount: number
  pageSize: number
  offset: number
  hasNext: boolean
  hasPrevious: boolean
}

export const fetchStudyGroups = async (
  params: StudyGroupsParams
): Promise<FetchStudyGroupsReturn> => {
  const queryParams = buildQueryParams(params)
  const response = await api.get<StudyGroupListResponse>(
    '/v1/studies/admin/groups/',
    {
      params: queryParams,
    }
  )

  const data = response.data
  return {
    items: data.results.map(mapStudyGroupDTO),
    totalCount: data.count ?? 0,
    pageSize: Number(queryParams.limit),
    offset: Number(queryParams.offset),
    hasNext: !!data.next,
    hasPrevious: !!data.previous,
  }
}

export const fetchStudyGroupDetail = async (
  uuid: number
): Promise<StudyGroupDetailDTO> => {
  const response = await api.get<StudyGroupDetailResponse>(
    `/api/v1/studies/admin/groups/${uuid}`
  )
  return response.data.data
}
