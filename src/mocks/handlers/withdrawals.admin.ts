import { http, HttpResponse, type JsonBodyType } from 'msw'
import { requireAdminAuth } from './_utils'

const OK = <T extends JsonBodyType>(body: T) => HttpResponse.json(body)

const pad2 = (n: number) => (n < 10 ? `0${n}` : `${n}`)
const ISO = (d: Date) => d.toISOString().replace(/\.\d{3}Z$/, 'Z')

const isValidDateStr = (s?: string | null) =>
  !!s &&
  /^\d{4}-\d{2}-\d{2}$/.test(s) &&
  !Number.isNaN(Date.parse(s + 'T00:00:00Z'))

const toInt = (v: string | null, def: number) => {
  const n = v == null ? NaN : Number(v)
  return Number.isInteger(n) && Number.isFinite(n) ? n : def
}

type User = {
  id: number
  email: string
  name: string
  role: 'user' | 'staff' | 'admin'
  birthday: string
  profile_img_url: string | null
  gender?: 'M' | 'F'
  nickname: string
  status: 'active' | 'inactive'
  joined_at: string
}

type Withdrawal = {
  id: string
  user_id: number
  reason: string
  reason_detail?: string
  created_at: string
  due_date?: string
}

const USERS: User[] = Array.from({ length: 180 }).map((_, i) => {
  const id = i + 1
  const active = i % 2 === 0 ? 'inactive' : 'active'
  const yyyy = 1985 + (i % 20)
  const mm = pad2((i % 12) + 1)
  const dd = pad2((i % 28) + 1)

  return {
    id,
    email: `user${id}@example.com`,
    name: `user${id}`,
    role: 'user',
    birthday: `${yyyy}-${mm}-${dd}`,
    profile_img_url: null,
    gender: i % 3 === 0 ? 'M' : 'F',
    nickname: `user${id}`,
    status: active,
    joined_at: ISO(new Date(Date.UTC(2023, i % 12, (i % 28) + 1, 20, 45, 0))),
  }
})

const WITHDRAWALS: Withdrawal[] = USERS.filter(
  (u) => u.status === 'inactive'
).map((u, idx) => {
  const created = new Date(
    Date.UTC(2025, 9, 1 + (idx % 28), 1 + (idx % 10), 30, 0)
  )
  const due = new Date(created.getTime() + 31 * 24 * 60 * 60 * 1000)

  const reasons = [
    '서비스 불만족',
    '개인정보 삭제 요청',
    '사용 빈도 낮음',
    '경쟁 서비스 이용',
    '기타',
  ]
  const reason = reasons[idx % reasons.length]

  return {
    id: `W${String(u.id).padStart(3, '0')}`,
    user_id: u.id,
    reason,
    reason_detail:
      reason === '서비스 불만족' ? '기능 부족 및 불편함' : undefined,
    created_at: ISO(created),
    due_date: ISO(due),
  }
})

const listHandler = http.get(
  '*/api/v1/admin/users/withdrawals',
  ({ request }) => {
    const authErr = requireAdminAuth(request.headers)
    if (authErr) return authErr

    const url = new URL(request.url)
    const page = toInt(url.searchParams.get('page'), 1)
    const limit = toInt(url.searchParams.get('limit'), 20)
    const start_date = url.searchParams.get('start_date')
    const end_date = url.searchParams.get('end_date')
    const reason = (url.searchParams.get('reason') || '').toLowerCase()
    const keyword = (url.searchParams.get('keyword') || '').toLowerCase()

    // 유효성
    if (limit < 1 || limit > 100) {
      return HttpResponse.json(
        { error: '잘못된 요청입니다..' },
        { status: 400 }
      )
    }
    if (page < 1) {
      return HttpResponse.json(
        { error: '잘못된 요청입니다..' },
        { status: 400 }
      )
    }

    if ((start_date && !end_date) || (!start_date && end_date)) {
      return HttpResponse.json(
        { error: '잘못된 요청입니다..' },
        { status: 400 }
      )
    }
    if (start_date && end_date) {
      if (!isValidDateStr(start_date) || !isValidDateStr(end_date)) {
        return HttpResponse.json(
          { error: 'start_date 또는 end_date 형식이 올바르지 않습니다.' },
          { status: 400 }
        )
      }
    }

    let list = WITHDRAWALS.map((w) => {
      const u = USERS.find((x) => x.id === w.user_id)!
      return {
        id: u.id,
        email: u.email,
        name: u.name,
        role: u.role,
        birthday: u.birthday,
        reason: w.reason,
        created_at: w.created_at,
      }
    })

    if (start_date && end_date) {
      const from = `${start_date}T00:00:00Z`
      const to = `${end_date}T23:59:59Z`
      list = list.filter(
        (item) => item.created_at >= from && item.created_at <= to
      )
    }

    if (reason) {
      list = list.filter((item) => item.reason.toLowerCase().includes(reason))
    }

    if (keyword) {
      list = list.filter(
        (item) =>
          item.name.toLowerCase().includes(keyword) ||
          item.email.toLowerCase().includes(keyword)
      )
    }

    list.sort((a, b) => b.created_at.localeCompare(a.created_at))

    const count = list.length
    const totalPages = Math.max(1, Math.ceil(count / limit))
    const current = Math.min(page, totalPages)
    const start = (current - 1) * limit
    const paged = list.slice(start, start + limit)

    const mkPageUrl = (p: number) => {
      const u = new URL(url.toString())
      u.searchParams.set('page', String(p))
      u.searchParams.set('limit', String(limit))
      return u.toString()
    }

    const next = current < totalPages ? mkPageUrl(current + 1) : null
    const previous = current > 1 ? mkPageUrl(current - 1) : null

    return OK({
      detail: '회원 탈퇴 내역 목록 조회에 성공하였습니다.',
      data: {
        count,
        next,
        previous,
        result: paged,
      },
    })
  }
)

const detailHandler = http.get(
  '*/api/v1/admin/users/withdrawals/:user_id',
  ({ request, params }) => {
    const authErr = requireAdminAuth(request.headers)
    if (authErr) return authErr

    const id = Number(params.user_id)
    if (!Number.isInteger(id)) {
      return HttpResponse.json(
        { error: '잘못된 요청입니다. user_id를 확인하세요.' },
        { status: 400 }
      )
    }

    const user = USERS.find((u) => u.id === id)
    const wd = WITHDRAWALS.find((w) => w.user_id === id)

    if (!user || !wd) {
      return HttpResponse.json(
        { error: '해당 회원의 탈퇴 내역이 존재하지 않습니다.' },
        { status: 404 }
      )
    }

    return OK({
      detail: '탈퇴 내역 상세 조회에 성공하였습니다.',
      data: {
        user: {
          profile_img_url:
            user.profile_img_url || 'https://example.com/images/profile.png',
          id: user.id,
          name: user.name,
          gender: user.gender ?? 'M',
          nickname: user.nickname,
          email: user.email,
          role: user.role,
          status: 'inactive',
          joined_at: user.joined_at,
        },
        withdrawal: {
          id: wd.id,
          reason: wd.reason,
          reason_detail: wd.reason_detail ?? '',
          created_at: wd.created_at,
          due_date: wd.due_date ?? '',
        },
      },
    })
  }
)

const restoreHandler = http.post(
  '*/api/v1/admin/users/restore/:user_id',
  async ({ request, params }) => {
    const authErr = requireAdminAuth(request.headers)
    if (authErr) return authErr

    const id = Number(params.user_id)
    if (!Number.isInteger(id)) {
      return HttpResponse.json(
        { error: '잘못된 요청입니다. user_id를 확인하세요.' },
        { status: 400 }
      )
    }

    const user = USERS.find((u) => u.id === id)
    if (!user) {
      return HttpResponse.json(
        { error: '탈퇴 내역을 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    if (user.status === 'active') {
      return OK({ detail: '이미 활성화된 계정입니다.' })
    }

    const wdIdx = WITHDRAWALS.findIndex((w) => w.user_id === id)
    if (wdIdx === -1) {
      return HttpResponse.json(
        { error: '탈퇴 내역을 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    user.status = 'active'
    WITHDRAWALS.splice(wdIdx, 1)

    return OK({ detail: '회원 복구에 성공하였습니다.' })
  }
)

export const withdrawalsAdminHandlers = [
  listHandler,
  detailHandler,
  restoreHandler,
]
