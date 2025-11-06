import {
  useQuery,
  keepPreviousData,
  type UseQueryResult,
} from '@tanstack/react-query'
import { adminApplicationsQueryKey } from '../../utils/recruitments/queryKeys'
import { buildQueryParams } from '../../utils/recruitments/buildQueryParams'
import {
  fetchApplications,
  type FetchApplicationsReturn,
} from '../../api/fetchApplications'
import type { ApplicationsParams } from './types.local'

const SECOND = 1_000
const STALE_TIME_APPLICATIONS = 30 * SECOND

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
    queryKey: adminApplicationsQueryKey(requestParams), // 캐시 키: 파라미터가 같을 경우 캐시 재사용
    queryFn: fetchApplicationList, // 실제 호출
    placeholderData: keepPreviousData, // 페이지 이동할 때 이전 데이터를 유지함 -> 깜박임 최소화하기
    staleTime: STALE_TIME_APPLICATIONS, // 30초 동안은 프레시한 데이터로 간주함
  })
}

export type { ApplicationsParams } from './types.local'
