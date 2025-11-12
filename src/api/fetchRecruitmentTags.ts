import api from '../lib/axios'

export type RecruitmentTagItemDTO = { id: number; name: string }
export type RecruitmentTagsListResponseDTO = {
  count: number
  next: string | null
  previous: string | null
  results: RecruitmentTagItemDTO[]
}

export async function fetchRecruitmentTags(params?: {
  search?: string
  page?: number
  page_size?: number
}) {
  const { data } = await api.get<RecruitmentTagsListResponseDTO>(
    '/v1/recruitments/tags',
    { params }
  )
  return data
}
