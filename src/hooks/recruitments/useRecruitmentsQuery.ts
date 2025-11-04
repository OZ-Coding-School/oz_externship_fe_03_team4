import {
  keepPreviousData,
  useQuery,
  type UseQueryResult,
} from '@tanstack/react-query'
import { AdminRecruitmentsQueryKey } from './queryKeys'
import { buildRecruitmentsQueryParams } from './buildQueryParams'
import {
  fetchRecruitments,
  type FetchRecruitmentsReturn,
} from '../../api/fetchRecruitments'
import type { AdminRecruitmentsParams } from './types.local'

const SECOND = 1_000
const STALE_TIME_RECRUITMENTS = 30 * SECOND
