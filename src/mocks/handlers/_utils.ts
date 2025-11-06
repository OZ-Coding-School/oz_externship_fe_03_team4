import { HttpResponse } from 'msw'

export function requireAdminAuth(headers: Headers) {
  const auth = headers.get('Authorization') || ''
  if (!auth.startsWith('Bearer ')) {
    return HttpResponse.json(
      { detail: '인증 정보가 제공되지 않았습니다.' },
      { status: 401 }
    )
  }
  return null
}

export function paginateOffset<T>(list: T[], limit = 10, offset = 0) {
  const results = list.slice(offset, offset + limit)
  return { count: list.length, results }
}

export function toInt(v: string | null, fallback: number) {
  const n = Number(v ?? '')
  return Number.isFinite(n) && n >= 0 ? n : fallback
}
