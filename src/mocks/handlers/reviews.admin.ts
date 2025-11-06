import { http, HttpResponse, type JsonBodyType } from 'msw'
import { requireAdminAuth, toInt } from './_utils'

type Review = {
  id: number
  study_group: {
    id: number
    name: string
    start_date?: string
    end_date?: string
  }
  user: { id: number; nickname: string; email: string }
  star_rating: 1 | 2 | 3 | 4 | 5
  content: string
  created_at: string
  updated_at: string
  group_id: number
}

const ISO = (d: Date) => d.toISOString().replace(/\.\d{3}Z$/, 'Z')

const BASE: Review[] = Array.from({ length: 243 }).map((_, i) => {
  const id = i + 1
  const gid = (i % 37) + 1
  const created = new Date(Date.UTC(2025, 9, 1 + (i % 28), 7, 12, 10))
  const updated = new Date(created.getTime() + (i % 5) * 60 * 1000)
  return {
    id,
    study_group: {
      id: gid,
      name: `알고리즘 스터디 ${gid}`,
      start_date: '2025-09-01',
      end_date: '2025-11-30',
    },
    user: {
      id: (i % 50) + 1,
      nickname: `oz${(i % 50) + 1}`,
      email: `oz${(i % 50) + 1}@example.com`,
    },
    star_rating: ((i % 5) + 1) as 1 | 2 | 3 | 4 | 5,
    content:
      i % 3 === 0 ? '좋았어요' : i % 3 === 1 ? '괜찮아요' : '보통이었어요',
    created_at: ISO(created),
    updated_at: ISO(updated),
    group_id: gid,
  }
})

const OK = <T extends JsonBodyType>(body: T) => HttpResponse.json(body)

const isValidDateStr = (s?: string | null) =>
  !!s &&
  /^\d{4}-\d{2}-\d{2}$/.test(s) &&
  !Number.isNaN(Date.parse(s + 'T00:00:00Z'))

const SORT_KEYS = new Set([
  'created_at',
  '-created_at',
  'updated_at',
  '-updated_at',
  'rating',
  '-rating',
])

export const reviewsAdminHandlers = [
  http.get('*/api/v1/studies/admin/reviews', ({ request }) => {
    const authErr = requireAdminAuth(request.headers)
    if (authErr) return authErr

    const url = new URL(request.url)
    const limit = toInt(url.searchParams.get('limit'), 20)
    const offset = toInt(url.searchParams.get('offset'), 0)
    const sort = url.searchParams.get('sort') || '-created_at'
    const group_id = url.searchParams.get('group_id')
    const group_name = (url.searchParams.get('group_name') || '').toLowerCase()
    const user_nickname = (
      url.searchParams.get('user_nickname') || ''
    ).toLowerCase()
    const user_email = (url.searchParams.get('user_email') || '').toLowerCase()
    const rating = url.searchParams.get('rating')
    const created_from = url.searchParams.get('created_from')
    const created_to = url.searchParams.get('created_to')
    const updated_from = url.searchParams.get('updated_from')
    const updated_to = url.searchParams.get('updated_to')

    if (limit < 1 || limit > 100)
      return HttpResponse.json(
        {
          status: 400,
          message: '유효한 값이어야 합니다.',
          error: {
            code: 'LIMIT_OUT_OF_RANGE',
            detail: ['limit는 1~100 사이여야 합니다.'],
          },
        },
        { status: 400 }
      )

    if (offset < 0 || !Number.isFinite(offset))
      return HttpResponse.json(
        {
          status: 400,
          message: '유효한 값이어야 합니다.',
          error: {
            code: 'OFFSET_OUT_OF_RANGE',
            detail: ['offset는 0 이상이어야 합니다.'],
          },
        },
        { status: 400 }
      )

    if (!SORT_KEYS.has(sort))
      return HttpResponse.json(
        {
          status: 400,
          message: '유효하지 않은 정렬 키입니다.',
          error: {
            code: 'BAD_SORT',
            detail: [
              `잘못된 정렬 키입니다: sort=${sort}`,
              '허용 값: created_at, -created_at, updated_at, -updated_at, rating, -rating',
            ],
          },
        },
        { status: 400 }
      )

    if (
      (created_from && !isValidDateStr(created_from)) ||
      (created_to && !isValidDateStr(created_to))
    )
      return HttpResponse.json(
        {
          status: 400,
          message: '유효한 값이어야 합니다.',
          error: {
            code: 'INVALID_DATE_FORMAT',
            detail: ['created_from/to은 YYYY-MM-DD 형식이어야 합니다.'],
          },
        },
        { status: 400 }
      )

    if (
      (updated_from && !isValidDateStr(updated_from)) ||
      (updated_to && !isValidDateStr(updated_to))
    )
      return HttpResponse.json(
        {
          status: 400,
          message: '유효한 값이어야 합니다.',
          error: {
            code: 'INVALID_DATE_FORMAT',
            detail: ['updated_from/to은 YYYY-MM-DD 형식이어야 합니다.'],
          },
        },
        { status: 400 }
      )

    if (created_from && created_to && created_from > created_to)
      return HttpResponse.json(
        {
          status: 400,
          message: '유효한 값이어야 합니다.',
          error: {
            code: 'INVALID_DATE_RANGE',
            detail: ['created_from은 created_to보다 이전이어야 합니다.'],
          },
        },
        { status: 400 }
      )

    if (updated_from && updated_to && updated_from > updated_to)
      return HttpResponse.json(
        {
          status: 400,
          message: '유효한 값이어야 합니다.',
          error: {
            code: 'INVALID_DATE_RANGE',
            detail: ['updated_from은 updated_to보다 이전이어야 합니다.'],
          },
        },
        { status: 400 }
      )

    if (rating && !/^[1-5]$/.test(rating))
      return HttpResponse.json(
        {
          status: 400,
          message: '유효한 값이어야 합니다.',
          error: {
            code: 'RATING_OUT_OF_RANGE',
            detail: ['rating은 1~5 사이 정수여야 합니다.'],
          },
        },
        { status: 400 }
      )

    let list = BASE.slice()
    if (group_id) list = list.filter((r) => String(r.group_id) === group_id)
    if (group_name)
      list = list.filter((r) =>
        r.study_group.name.toLowerCase().includes(group_name)
      )
    if (user_nickname)
      list = list.filter((r) =>
        r.user.nickname.toLowerCase().includes(user_nickname)
      )
    if (user_email)
      list = list.filter((r) => r.user.email.toLowerCase().includes(user_email))
    if (rating) list = list.filter((r) => r.star_rating === Number(rating))

    if (created_from)
      list = list.filter((r) => r.created_at >= `${created_from}T00:00:00Z`)
    if (created_to)
      list = list.filter((r) => r.created_at <= `${created_to}T23:59:59Z`)
    if (updated_from)
      list = list.filter((r) => r.updated_at >= `${updated_from}T00:00:00Z`)
    if (updated_to)
      list = list.filter((r) => r.updated_at <= `${updated_to}T23:59:59Z`)

    list.sort((a, b) => {
      switch (sort) {
        case 'created_at':
          return a.created_at.localeCompare(b.created_at)
        case '-created_at':
          return b.created_at.localeCompare(a.created_at)
        case 'updated_at':
          return a.updated_at.localeCompare(b.updated_at)
        case '-updated_at':
          return b.updated_at.localeCompare(a.updated_at)
        case 'rating':
          return a.star_rating - b.star_rating
        case '-rating':
          return b.star_rating - a.star_rating
        default:
          return 0
      }
    })

    const count = list.length
    const results = list.slice(offset, offset + limit)
    const mkUrl = (off: number) => {
      const u = new URL(url.toString())
      u.searchParams.set('limit', String(limit))
      u.searchParams.set('offset', String(off))
      return u.toString()
    }
    const next = offset + limit < count ? mkUrl(offset + limit) : null
    const previous = offset > 0 ? mkUrl(Math.max(0, offset - limit)) : null

    return OK({
      status: 200,
      message: '조회가 완료되었습니다',
      detail: {
        count,
        next,
        previous,
        results: results.map((r) => ({
          id: r.id,
          study_group: { id: r.study_group.id, name: r.study_group.name },
          user: {
            id: r.user.id,
            nickname: r.user.nickname,
            email: r.user.email,
          },
          star_rating: r.star_rating,
          content: r.content,
          created_at: r.created_at,
          updated_at: r.updated_at,
        })),
      },
    })
  }),

  http.get('*/api/v1/studies/admin/reviews/:id', ({ request, params }) => {
    const authErr = requireAdminAuth(request.headers)
    if (authErr) return authErr

    const idNum = Number(params.id)
    if (!Number.isInteger(idNum))
      return HttpResponse.json(
        {
          status: 400,
          message: '유효한 값이어야 합니다.',
          error: { code: 'INVALID_ID', detail: ['id는 정수여야 합니다.'] },
        },
        { status: 400 }
      )

    const r = BASE.find((x) => x.id === idNum)
    if (!r)
      return HttpResponse.json(
        {
          status: 404,
          message: '리소스를 찾을 수 없습니다.',
          error: {
            code: 'REVIEW_NOT_FOUND',
            detail: [`리뷰를 찾을 수 없습니다. id=${idNum}`],
          },
        },
        { status: 404 }
      )

    return OK({
      status: 200,
      message: '리뷰 상세 조회 완료입니다.',
      detail: {
        id: r.id,
        study_group: {
          id: r.study_group.id,
          name: r.study_group.name,
          start_date: r.study_group.start_date,
          end_date: r.study_group.end_date,
        },
        user: { id: r.user.id, nickname: r.user.nickname, email: r.user.email },
        star_rating: r.star_rating,
        content: r.content,
        created_at: r.created_at,
        updated_at: r.updated_at,
      },
    })
  }),
]
