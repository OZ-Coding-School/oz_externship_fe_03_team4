import { useQuery } from '@tanstack/react-query'
import { api, joinAdminPath } from '../../lib'

export type AdminPingResult = 'ok' | 'unauthorized' | 'forbidden'

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
        const status = error?.response?.status
        if (status === 401) return 'unauthorized'
        if (status === 403) return 'forbidden'
        return 'forbidden'
      }
    },
    staleTime: 0,
    retry: false,
  })
}
