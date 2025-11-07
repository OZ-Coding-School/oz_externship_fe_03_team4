import { http, HttpResponse } from 'msw'
import { paginateOffset, requireAdminAuth, toInt } from './_utils'

type AdminRecruitmentListItem = {
  id: number
  title: string
  tags: string[]
  close_at: string
  status: '모집중' | '마감'
  views_count: number
  bookmarks_count: number
  created_at: string
  updated_at: string | null
}

const RECR_LIST: AdminRecruitmentListItem[] = Array.from({ length: 28 }).map(
  (_, i) => ({
    id: i + 1,
    title: `스터디 구인 공고 제목 ${i + 1}`,
    tags: i % 2 ? ['Python', 'Django'] : ['React', 'TypeScript'],
    close_at: `2025-10-${String((i % 28) + 1).padStart(2, '0')}T23:59:59Z`,
    status: i % 5 === 0 ? '마감' : '모집중',
    views_count: 100 + i,
    bookmarks_count: 20 + (i % 10),
    created_at: `2025-10-${String((i % 28) + 1).padStart(2, '0')}T12:00:00Z`,
    updated_at:
      i % 3
        ? `2025-10-${String((i % 28) + 1).padStart(2, '0')}T15:00:00Z`
        : null,
  })
)

const RECR_DETAIL = (id: number) => ({
  id,
  uuid: '550e8400-e29b-41d4-a716-446655440000',
  title: '스터디 구인 공고 제목',
  status: id % 5 === 0 ? '마감' : '모집중',
  content: '공고 내용 (마크다운 적용)',
  attachments: [
    {
      file_name: 'example.pdf',
      file_url: 'https://example.com/files/example.pdf',
    },
  ],
  expected_headcount: 5,
  estimated_fee: 100000,
  study_lectures: [
    {
      thumbnail_img_url: 'https://example.com/thumbnail.jpg',
      title: '강의 이름',
      instructor: '강사명',
      url_link: 'https://example.com/lecture',
    },
  ],
  tags: [{ name: 'Python' }, { name: 'Backend' }],
  close_at: '2025-10-30 23:59',
  is_closed: false,
  created_at: '2025-10-16 13:00',
  updated_at: '2025-10-16 15:00',
  views_count: 123,
  bookmarks_count: 10,
  applications: [
    {
      id: 901,
      recruitment_title: '스터디 구인 공고 제목 1',
      applicant_nickname: '홍길동',
      applicant_email: 'hong@example.com',
      created_at: '2025-10-16T14:30:00+09:00',
      updated_at: '2025-10-16T15:10:00+09:00',
      status: 'APPLIED',
    },
    {
      id: 902,
      recruitment_title: '스터디 구인 공고 제목 1',
      applicant_nickname: '김영희',
      applicant_email: 'young@example.com',
      created_at: '2025-10-17T09:05:00+09:00',
      updated_at: '2025-10-17T11:20:00+09:00',
      status: 'REVIEWING',
    },
    {
      id: 902,
      recruitment_title: '스터디 구인 공고 제목 1',
      applicant_nickname: '코코볼',
      applicant_email: 'young@example.com',
      created_at: '2025-10-17T09:05:00+09:00',
      updated_at: '2025-10-17T11:20:00+09:00',
      status: 'REVIEWING',
    },
  ],
})

export const recruitmentAdminHandlers = [
  http.get('*/api/v1/admin/recruitments', ({ request }) => {
    const authErr = requireAdminAuth(request.headers)
    if (authErr) return authErr

    const url = new URL(request.url)
    const search = (url.searchParams.get('search') || '').toLowerCase()
    const status = url.searchParams.get('status')
    const tags = (url.searchParams.getAll('tags') || [])
      .flatMap((v) => v.split(','))
      .filter(Boolean)
    const ordering = url.searchParams.get('ordering') || 'latest'
    const limit = toInt(url.searchParams.get('limit'), 20)
    const offset = toInt(url.searchParams.get('offset'), 0)

    let list = RECR_LIST
    if (search)
      list = list.filter((i) => i.title.toLowerCase().includes(search))
    if (status) list = list.filter((i) => i.status === status)
    if (tags.length)
      list = list.filter((i) => i.tags.some((t) => tags.includes(t)))

    list = list.sort((a, b) => {
      switch (ordering) {
        case 'oldest':
          return a.created_at.localeCompare(b.created_at)
        case 'views':
          return b.views_count - a.views_count
        case 'bookmarks':
          return b.bookmarks_count - a.bookmarks_count
        default:
          return b.created_at.localeCompare(a.created_at) // latest
      }
    })

    const { results } = paginateOffset(list, limit, offset)
    return HttpResponse.json({
      results,
      page: Math.floor(offset / limit) + 1,
      page_size: limit,
      total_count: list.length,
    })
  }),

  http.get('*/api/v1/admin/recruitments', ({ request }) => {
    const authErr = requireAdminAuth(request.headers)
    if (authErr) return authErr

    const url = new URL(request.url)
    const tags = (url.searchParams.getAll('tags') || [])
      .flatMap((v) => v.split(','))
      .filter(Boolean)
    const page = toInt(url.searchParams.get('page'), 1)
    const pageSize = toInt(url.searchParams.get('page_size'), 10)

    let list = RECR_LIST
    if (tags.length)
      list = list.filter((i) => i.tags.some((t) => tags.includes(t)))

    const offset = (page - 1) * pageSize
    const { results } = paginateOffset(list, pageSize, offset)
    return HttpResponse.json({
      results,
      page,
      page_size: pageSize,
      total_count: list.length,
    })
  }),

  http.get('*/api/v1/admin/recruitments/:id/', ({ request, params }) => {
    const authErr = requireAdminAuth(request.headers)
    if (authErr) return authErr

    const id = Number(params.id)
    const exists = RECR_LIST.some((r) => r.id === id)
    if (!exists)
      return HttpResponse.json(
        { detail: '조회하려는 공고가 존재하지 않습니다.' },
        { status: 404 }
      )

    return HttpResponse.json(RECR_DETAIL(id))
  }),

  http.delete('*/api/v1/admin/recruitments/:id', ({ request, params }) => {
    const authErr = requireAdminAuth(request.headers)
    if (authErr) return authErr

    const id = Number(params.id)
    const idx = RECR_LIST.findIndex((r) => r.id === id)
    if (idx === -1)
      return HttpResponse.json(
        { detail: '삭제하려는 공고를 찾을 수 없습니다.' },
        { status: 404 }
      )

    RECR_LIST.splice(idx, 1)
    return new HttpResponse(null, { status: 204 })
  }),
]
