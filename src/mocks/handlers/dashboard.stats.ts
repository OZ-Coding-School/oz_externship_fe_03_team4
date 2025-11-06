import { http, HttpResponse, type JsonBodyType } from 'msw'
import { requireAdminAuth, toInt as _toInt } from './_utils'

const pad2 = (n: number) => (n < 10 ? `0${n}` : `${n}`)
const ymd = (d: Date) =>
  `${d.getUTCFullYear()}-${pad2(d.getUTCMonth() + 1)}-${pad2(d.getUTCDate())}`
const ym = (d: Date) => `${d.getUTCFullYear()}-${pad2(d.getUTCMonth() + 1)}`

type Interval = 'month' | 'year'
const assertInterval = (
  v: string | null | undefined,
  def: Interval = 'month'
): Interval => (v === 'month' || v === 'year' ? v : def)

const monthBack = (base: Date, k: number) => {
  const d = new Date(Date.UTC(base.getUTCFullYear(), base.getUTCMonth(), 1))
  d.setUTCMonth(d.getUTCMonth() - k)
  return d
}
const yearBack = (base: Date, k: number) =>
  new Date(Date.UTC(base.getUTCFullYear() - k, 0, 1))

const rangeLast12Months = (now = new Date()) => {
  const last = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 0)
  )
  const first = monthBack(now, 11)
  return {
    from: `${first.getUTCFullYear()}-${pad2(first.getUTCMonth() + 1)}-01`,
    to: ymd(last),
  }
}
const rangeLast5Years = (now = new Date()) => {
  const start = yearBack(now, 4)
  const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 0))
  return { from: `${start.getUTCFullYear()}-01-01`, to: ymd(end) }
}

const sum = (arr: number[]) => arr.reduce((a, b) => a + b, 0)
const OK = <T extends JsonBodyType>(body: T) => HttpResponse.json(body)

export const signupsStatisticsHandler = http.get(
  '*/api/v1/users/statistics/signups',
  ({ request }) => {
    const authErr = requireAdminAuth(request.headers)
    if (authErr) return authErr

    const url = new URL(request.url)
    const interval = assertInterval(url.searchParams.get('interval'), 'month')
    const now = new Date()

    if (interval === 'month') {
      const { from, to } = rangeLast12Months(now)
      const items = Array.from({ length: 12 }).map((_, i) => {
        const d = monthBack(now, 11 - i)
        const count = 6 + ((d.getUTCMonth() * 7 + d.getUTCFullYear()) % 10)
        return { period: ym(d), count }
      })
      return OK({
        detail: '회원가입 통계 조회에 성공하였습니다.',
        data: {
          interval,
          from,
          to,
          total_signups: sum(items.map((x) => x.count)),
          items,
        },
      })
    } else {
      const { from, to } = rangeLast5Years(now)
      const items = Array.from({ length: 5 }).map((_, i) => {
        const d = yearBack(now, 4 - i)
        const count = 5 + ((d.getUTCFullYear() * 3) % 8)
        return { period: `${d.getUTCFullYear()}`, count }
      })
      return OK({
        detail: '회원가입 통계 조회에 성공하였습니다.',
        data: {
          interval,
          from,
          to,
          total_signups: sum(items.map((x) => x.count)),
          items,
        },
      })
    }
  }
)

export const withdrawalTrendsHandler = http.get(
  '*/api/v1/admin/dashboard/withdrawal-trends',
  ({ request }) => {
    const authErr = requireAdminAuth(request.headers)
    if (authErr) return authErr

    const url = new URL(request.url)
    const interval = assertInterval(url.searchParams.get('interval'), 'month')
    const now = new Date()

    if (interval === 'month') {
      const { from, to } = rangeLast12Months(now)
      const items = Array.from({ length: 12 }).map((_, i) => {
        const d = monthBack(now, 11 - i)
        const count = 2 + ((d.getUTCMonth() + d.getUTCFullYear()) % 5)
        return { period: ym(d), count }
      })
      return OK({
        detail: '탈퇴 통계 조회에 성공하였습니다.',
        data: {
          interval,
          from,
          to,
          total_withdrawals: sum(items.map((x) => x.count)),
          items,
        },
      })
    } else {
      const { from, to } = rangeLast5Years(now)
      const items = Array.from({ length: 5 }).map((_, i) => {
        const d = yearBack(now, 4 - i)
        const count = 6 + ((d.getUTCFullYear() * 5) % 7)
        return { period: `${d.getUTCFullYear()}`, count }
      })
      return OK({
        detail: '탈퇴 통계 조회에 성공하였습니다.',
        data: {
          interval,
          from,
          to,
          total_withdrawals: sum(items.map((x) => x.count)),
          items,
        },
      })
    }
  }
)

export const withdrawalReasonsAllHandler = http.get(
  '*/api/v1/admin/dashboard/withdrawal-reasons',
  ({ request }) => {
    const authErr = requireAdminAuth(request.headers)
    if (authErr) return authErr

    const items = [
      { reason_code: 'service', reason_label: '서비스 불만족', count: 450 },
      { reason_code: 'privacy', reason_label: '개인정보 우려', count: 300 },
      { reason_code: 'low_usage', reason_label: '사용 빈도 낮음', count: 240 },
      {
        reason_code: 'competitor',
        reason_label: '경쟁 서비스 이용',
        count: 120,
      },
      { reason_code: 'other', reason_label: '기타', count: 90 },
    ]
    const total = sum(items.map((x) => x.count))
    const withPct = items.map((x) => ({
      ...x,
      percentage: Math.round((x.count / total) * 10000) / 100, // 소수점 2자리
    }))

    return OK({
      detail: '회원 탈퇴 사유 분포 조회에 성공하였습니다.',
      data: {
        scope: 'all_time',
        total_withdrawals: total,
        items: withPct,
      },
    })
  }
)

const REASON_CODES = new Set([
  'NO_LONGER_NEEDED',
  'LACK_OF_INTEREST',
  'TOO_DIFFICULT',
  'FOUND_BETTER_SERVICE',
  'PRIVACY_CONCERNS',
  'POOR_SERVICE_QUALITY',
  'TECHNICAL_ISSUES',
  'LACK_OF_CONTENT',
  'OTHER',
])

export const withdrawalReasonTrendHandler = http.get(
  '*/api/v1/admin/dashboard/withdrawal-reasons/:reason',
  ({ request, params }) => {
    const authErr = requireAdminAuth(request.headers)
    if (authErr) return authErr

    const reason = String(params.reason || '')
    if (!REASON_CODES.has(reason)) {
      return HttpResponse.json(
        { error: 'reason 파라미터가 올바르지 않습니다.' },
        { status: 400 }
      )
    }

    const now = new Date()
    const { from, to } = rangeLast12Months(now)
    const items = Array.from({ length: 12 }).map((_, i) => {
      const d = monthBack(now, 11 - i)
      const seed =
        reason.length +
        (reason.charCodeAt(0) % 5) +
        d.getUTCMonth() +
        d.getUTCFullYear()
      const count = seed % 7
      return { period: ym(d), count }
    })
    const total = sum(items.map((x) => x.count))

    return OK({
      detail: '회원탈퇴 사유 추적 조회에 성공하였습니다.',
      data: {
        interval: 'month',
        from,
        to,
        total_signups: total,
        items,
      },
    })
  }
)

export const dashboardStatsHandlers = [
  signupsStatisticsHandler,
  withdrawalTrendsHandler,
  withdrawalReasonsAllHandler,
  withdrawalReasonTrendHandler,
]
