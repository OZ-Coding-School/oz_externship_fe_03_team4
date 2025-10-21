import { useEffect, useMemo } from 'react'
import { useJwtClaims } from './useJwtClaims'
import { useAdminPing } from './useAdminPing'
import { getAccessToken, removeAccessToken } from '../../lib/token'

export type AdminGuardStatus = 'loading' | 'ok' | 'unauthorized' | 'forbidden'

type AdminAuthOptions = {
  allowedRoles?: string[]
  endpointPath?: string
}

export const useAdminAuthGuard = ({
  allowedRoles = ['admin'],
  endpointPath = '/users/',
}: AdminAuthOptions = {}) => {
  const accessToken = getAccessToken()
  const { role: userRole, isExpired: isTokenExpired } =
    useJwtClaims(accessToken)

  useEffect(() => {
    if (isTokenExpired) removeAccessToken()
  }, [isTokenExpired])

  const allowedRolesSet = useMemo(() => new Set(allowedRoles), [allowedRoles])

  const localGuardStatus: AdminGuardStatus = useMemo(() => {
    if (!accessToken) return 'unauthorized'
    if (isTokenExpired) return 'unauthorized'
    if (userRole && allowedRolesSet.has(userRole)) return 'ok'
    return 'loading'
  }, [accessToken, isTokenExpired, userRole, allowedRolesSet])

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
    if (serverCheckResult === 'unauthorized') removeAccessToken()
  }, [serverCheckResult])

  return { status: finalGuardStatus, refreshServerCheck }
}
