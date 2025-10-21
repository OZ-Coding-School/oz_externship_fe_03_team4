// JWT토큰에서 role, 만료시간 정보를 파싱하는 훅
import { useMemo } from 'react'
import { parseJwt } from '../../lib/authz'
//제네릭 타입으로 정의하기
export type JwtPayload = Record<string, unknown> | null

export type JwtClaims = {
  payload: JwtPayload
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
