import { Navigate, useLocation } from 'react-router'
import { useAdminAuthGuard } from '../hooks/auth/useAdminAuthGuard'
import type { PropsWithChildren } from 'react'

export const AdminProtectedRoute = ({ children }: PropsWithChildren) => {
  const currentLocation = useLocation()
  const { status: adminGuardStatus } = useAdminAuthGuard({
    allowedRoles: ['admin'],
    routeKey: currentLocation.pathname,
    endpointPath: '/users/',
  })

  if (adminGuardStatus === 'loading') {
    return (
      <div className="grid min-h-[40vh] place-items-center p-6 text-sm text-gray-600">
        관리자 권한을 확인하고 있습니다.
      </div>
    )
  }

  if (adminGuardStatus === 'unauthorized') {
    return <Navigate to="/login" replace state={{ from: currentLocation }} />
  }

  if (adminGuardStatus === 'forbidden') {
    return (
      <div className="grid min-h-[40vh] place-items-center p-6">
        <div className="rounded-xl border border-gray-200/70 bg-white p-6 text-center">
          <p className="text-sm font-medium text-gray-900">
            접근 권한이 없습니다
          </p>
          <p className="mt-1 text-xs text-gray-500">
            관리자에게 권한을 요청하거나, 다른 페이지로 이동해주세요.
          </p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
