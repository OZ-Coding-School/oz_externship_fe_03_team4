import type { AdminRecruitmentsParams } from './types.local'

export type RecruitmentRequestParams = Record<string, string | number>

const clampNumber = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max)

export const buildRecruitmentsQueryParams = (
  options: AdminRecruitmentsParams
): RecruitmentRequestParams => {
  const normalizedPageSize = clampNumber(options.pageSize ?? 20, 1, 100)
  const normalizedPageNumber = Math.max(1, options.pageNumber ?? 1)

  const queryParams: RecruitmentRequestParams = {
    page: normalizedPageNumber,
    page_size: normalizedPageSize
  }

  const trimmedSearchText = (options.searchText ?? '').trim()
  if (trimmedSearchText) {
    queryParams.search = trimmedSearchText
  }

  if (options.statusFilter) {
    queryParams.status = options.statusFilter
  }

  if (options.selectedTags && options.selectedTags.length>0) {
    queryParams.tags = options.selectedTags.join(',')
  }
}
