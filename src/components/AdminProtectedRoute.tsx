import { useLocation } from 'react-router'
import { useAdminAuthGuard } from '../hooks/auth/useAdminAuthGuard'
import { useEffect, type PropsWithChildren } from 'react'
import { removeAccessToken } from '../lib/token'

const AdminProtectedRoute = ({ children }: PropsWithChildren) => {
  const currentLocation = useLocation()
  const { status: adminGuardStatus } = useAdminAuthGuard({
    allowedRoles: ['admin'],
    routeKey: currentLocation.pathname,
    endpointPath: '/users',
  })

  useEffect(() => {
    if (
      adminGuardStatus === 'unauthorized' ||
      adminGuardStatus === 'forbidden'
    ) {
      removeAccessToken()
      const timer = setTimeout(() => {
        window.location.replace('/login')
      }, 2500)
      return () => clearTimeout(timer)
    }
  }, [adminGuardStatus])

  if (adminGuardStatus === 'loading') {
    return (
      <div className="grid min-h-[40vh] place-items-center p-6 text-sm text-gray-600">
        관리자 권한을 확인하고 있습니다.
      </div>
    )
  }

  if (adminGuardStatus === 'unauthorized' || adminGuardStatus === 'forbidden') {
    return (
      <div className="grid min-h-[40vh] place-items-center p-6">
        <div className="rounded-xl border border-gray-200/70 bg-white p-6 text-center">
          <p className="text-sm font-medium text-gray-900">
            접근 권한이 없습니다
          </p>
          <p className="mt-1 text-xs text-gray-500">
            잠시 후 이전 화면으로 이동합니다.
          </p>
        </div>
      </div>
    )
  }

  return children
}
export default AdminProtectedRoute
