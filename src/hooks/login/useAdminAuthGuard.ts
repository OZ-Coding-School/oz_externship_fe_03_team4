import { useEffect, useMemo } from 'react'
import { dropAccessToken, getAccessToken } from '../../lib'
import { useJwtClaims } from './useJwtClaims'
import { useAdminPing } from './useAdminPing'

export type AdminGuardStatus = 'loading' | 'ok' | 'unauthorized' | 'forbidden'

type AdminAuthOptions = {
  allowedRoles?: string[]
  routeKey?: string
  endpointPath?: string
}

export const useAdminAuthGuard = ({
  allowedRoles = ['admin'],
  routeKey,
  endpointPath = '/users/',
}: AdminAuthOptions = {}) => {
  const accessToken = getAccessToken()
  const { role: userRole, isExpired: isTokenExpired } =
    useJwtClaims(accessToken)

  useEffect(() => {
    if (isTokenExpired) dropAccessToken()
  }, [isTokenExpired])

  const localGuardStatus: AdminGuardStatus = useMemo(() => {
    if (!accessToken) return 'unauthorized'
    if (isTokenExpired) return 'unauthorized'
    if (userRole && allowedRoles.includes(userRole)) return 'ok'
    return 'loading'
  }, [accessToken, isTokenExpired, userRole, allowedRoles.join('|'), routeKey])

  const shouldRequestServerCheck = localGuardStatus === 'loading'
  const {
    data: serverCheckResult,
    isLoading: isServerCheckLoading,
    refetch: refreshServerCheck,
  } = useAdminPing(shouldRequestServerCheck, endpointPath)

  const finalGuardStatus: AdminGuardStatus = useMemo(() => {
    if (!shouldRequestServerCheck) return localGuardStatus
    if (isServerCheckLoading) return 'loading'
    if (serverCheckResult === 'ok') return 'ok'
    if (serverCheckResult === 'unauthorized') return 'unauthorized'
    if (serverCheckResult === 'forbidden') return 'forbidden'
    return 'forbidden'
  }, [
    shouldRequestServerCheck,
    localGuardStatus,
    isServerCheckLoading,
    serverCheckResult,
  ])

  useEffect(() => {
    if (serverCheckResult === 'unauthorized') dropAccessToken()
  }, [serverCheckResult])

  return { status: finalGuardStatus, refreshServerCheck }
}
