import {
  keepPreviousData,
  useQuery,
  type UseQueryResult,
} from '@tanstack/react-query'
import { adminRecruitmentsQueryKey } from './queryKeys'
import { buildRecruitmentsQueryParams } from './buildQueryParams'
import {
  fetchRecruitments,
  type FetchRecruitmentsReturn,
} from '../../api/fetchRecruitments'
import type { AdminRecruitmentsParams } from './types.local'

const SECOND = 1_000
const STALE_TIME_RECRUITMENTS = 30 * SECOND

export const useAdminRecruitmentsQuery = (
  options: AdminRecruitmentsParams
): UseQueryResult<FetchRecruitmentsReturn, Error> => {
  const requestParams = buildRecruitmentsQueryParams(options)
  const queryFn = () => fetchRecruitments(requestParams)

  return useQuery<
    FetchRecruitmentsReturn,
    Error,
    FetchRecruitmentsReturn,
    ReturnType<typeof adminRecruitmentsQueryKey>
  >({
    queryKey: adminRecruitmentsQueryKey(requestParams),
    queryFn,
    placeholderData: keepPreviousData,
    staleTime: STALE_TIME_RECRUITMENTS,
  })
}
