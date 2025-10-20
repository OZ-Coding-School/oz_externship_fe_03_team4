import { useMemo } from 'react'
import { parseJwt } from '../../lib/authz'

export type JwtClaims = {
  payload: any | null
  role: string | null
  exp: number | null
  isExpired: boolean
}

export const useJwtClaims = (token: string | null) => {
  const claims: JwtClaims = useMemo(() => {
    const payload = parseJwt(token)
    const rawRole =
      payload?.role ?? payload?.roles?.[0] ?? payload?.permissions?.role ?? null

    const role = rawRole ? String(rawRole).toLowerCase() : null
    const exp = typeof payload?.exp === 'number' ? payload.exp : null
    const isExpired = typeof exp === 'number' ? Date.now() >= exp * 1000 : false

    return { payload, role, exp, isExpired }
  }, [token])

  return claims
}
