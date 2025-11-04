import api from '../lib/axios'
import {
  type Recruitment,
  type RecruitmentListResponseDTO,
  type RecruitmentDTO,
  mapRecruitmentDTO,
} from '../types/recruitments'
import type { RecruitmentRequestParams } from '../hooks/recruitments/buildQueryParams'

export type FetchRecruitmentsReturn = {
  items: Recruitment[]
  page: number
  pageSize: number
  totalCount: number
}

export const fetchRecruitments = async (
  params: RecruitmentRequestParams
): Promise<FetchRecruitmentsReturn> => {
  const url = '/v1/recruitments/admin/'
  const { data } = await api.get<RecruitmentListResponseDTO>(url, { params })

  const items = data.results.map((dto: RecruitmentDTO) =>
    mapRecruitmentDTO(dto)      // dto -> ui 매핑
  )
}
