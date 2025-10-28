import {
  useQuery,
  keepPreviousData,
  type UseQueryResult,
} from '@tanstack/react-query'
import { adminApplicationsQueryKey } from './queryKeys'
import { buildQueryParams } from './buildQueryParams'
import {
  fetchApplications,
  type FetchApplicationsReturn,
} from './fetchApplications'
import type { ApplicationsParams } from './types.local'

export const useApplicationsQuery = (
  options: ApplicationsParams
): UseQueryResult<FetchApplicationsReturn, Error> => {
  const requestParams = buildQueryParams(options)
  const fetchApplicationList = () => fetchApplications(requestParams)

  return useQuery<
    FetchApplicationsReturn,
    Error,
    FetchApplicationsReturn,
    ReturnType<typeof adminApplicationsQueryKey>
  >({
    queryKey: adminApplicationsQueryKey(requestParams),
    queryFn: fetchApplicationList,
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  })
}

export type { ApplicationsParams } from './types.local'
