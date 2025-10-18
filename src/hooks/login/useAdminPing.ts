import { useQuery } from '@tanstack/react-query'
import { api, joinAdminPath } from '../../lib'

export type AdminPingResult = 'ok' | 'unauthorized' | 'forbidden' | 'error'

export const useAdminPing = (
  isRequestEnabled: boolean,
  endpointPath: string = '/users/'
) => {
  return useQuery<AdminPingResult>({
    queryKey: ['adminPermissionCheck', endpointPath],
    enabled: isRequestEnabled,
    queryFn: async ({ signal }) => {
      try {
        await api.get(joinAdminPath(endpointPath), { signal })
        return 'ok'
      } catch (error: any) {
        const statusCode = error?.response?.statusCode
        if (statusCode === 401) return 'unauthorized'
        if (statusCode === 403) return 'forbidden'
        return 'error'
      }
    },
    staleTime: 0,
    retry: false,
  })
}
