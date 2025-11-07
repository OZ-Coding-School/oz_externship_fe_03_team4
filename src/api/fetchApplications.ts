import api from '../lib/axios'
import type { Application } from '../types/applications'
import type { ApplicationRequestParams } from '../hooks/applications/types.local'
import {
  mapApplicationsToUi,
  type ApplicationsListResponse,
} from '../hooks/applications/mapApplicationsToUi'

export type FetchApplicationsReturn = {
  items: Application[]
  totalCount: number
  pageSize: number
  offset: number
}

export const fetchApplications = async (
  requestParams: ApplicationRequestParams
): Promise<FetchApplicationsReturn> => {
  const response = await api.get<ApplicationsListResponse>(
    '/v1/admin/applications',
    { params: requestParams }
  )

  const { items, totalCount } = mapApplicationsToUi(response.data)

  return {
    items,
    totalCount,
    pageSize: Number(requestParams.limit ?? 20),
    offset: Number(requestParams.offset ?? 0),
  }
}
