import { uiStatusToApi } from '../../types/applications'
import type { ApplicationsParams } from './types.local'

export const buildQueryParams = (options: ApplicationsParams) => {
  const pageSize = Math.min(Math.max(options.pageSize ?? 20, 1), 100)
  const pageNumber = Math.max(1, options.pageNumber ?? 1)
  const offset = (pageNumber - 1) * pageSize

  const requestParams: Record<string, string | number> = {
    limit: pageSize,
    offset,
    sort: options.sortKey,
  }

  if (options.statusFilter && options.statusFilter !== '전체') {
    requestParams.status = uiStatusToApi[options.statusFilter]
  }

  const searchText = (options.searchText ?? '').trim()
  if (searchText) {
    const searchKey = searchText.includes('@') ? 'user_email' : 'user_nickname'
    requestParams[searchKey] = searchText
  }

  return requestParams
}
