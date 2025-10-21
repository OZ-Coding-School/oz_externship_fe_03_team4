// 관리자 권한 확인을 위한 서버 핑
import { useQuery } from '@tanstack/react-query'
import { joinAdminPath } from '../../lib/authz'
import api from '../../lib/axios'

export type AdminPingResult = 'ok' | 'unauthorized' | 'forbidden'

type AxiosErrorResponse = {
  response?: {
    status?: number
  }
}

export const useAdminPing = (
  isRequestEnabled: boolean,
  endpointPath: string = '/users/' // 엔드포인트는 추후 변경가능, 임시적용
) => {
  return useQuery<AdminPingResult>({
    queryKey: ['adminPermissionCheck', endpointPath],
    enabled: isRequestEnabled,
    queryFn: async ({ signal }) => {
      try {
        await api.get(joinAdminPath(endpointPath), { signal })
        return 'ok'
      } catch (error: unknown) {
        const err = error as AxiosErrorResponse
        const responseStatus = err?.response?.status
        if (responseStatus === 401) return 'unauthorized'
        if (responseStatus === 403) return 'forbidden'
        return 'forbidden'
      }
    },
    staleTime: 0,
    retry: false,
  })
}
