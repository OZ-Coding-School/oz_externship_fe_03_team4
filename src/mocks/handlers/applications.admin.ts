import { http, HttpResponse } from 'msw'
import { paginateOffset, requireAdminAuth, toInt } from './_utils'

type AdminApplicationRow = {
  id: number
  recruitment_title: string
  applicant_nickname: string
  applicant_email: string
  status: 'APPLIED' | 'REVIEWING' | 'APPROVED' | 'REJECTED'
  created_at: string
  updated_at: string
}

const APPLICATION_ROWS: AdminApplicationRow[] = Array.from({ length: 42 }).map(
  (_, i) => ({
    id: 101 + i,
    recruitment_title: i % 2 ? '프론트엔드 개발자' : '백엔드 개발자',
    applicant_nickname: `지원자${i + 1}`,
    applicant_email: `user${i + 1}@example.com`,
    status: (['APPLIED', 'REVIEWING', 'APPROVED', 'REJECTED'] as const)[i % 4],
    created_at: `2025-10-${String((i % 28) + 1).padStart(2, '0')}T09:00:00Z`,
    updated_at: `2025-10-${String((i % 28) + 1).padStart(2, '0')}T12:00:00Z`,
  })
)

export const applicationAdminHandlers = [
  http.get('*/api/v1/admin/applications', ({ request }) => {
    const authErr = requireAdminAuth(request.headers)
    if (authErr) return authErr

    const url = new URL(request.url)
    const q = (url.searchParams.get('q') || '').toLowerCase()
    const status = url.searchParams.get('status')?.toUpperCase() as
      | AdminApplicationRow['status']
      | null
    const limit = toInt(url.searchParams.get('limit'), 10)
    const offset = toInt(url.searchParams.get('offset'), 0)
    const order = (url.searchParams.get('order') || 'desc').toLowerCase() // asc|desc

    let list = APPLICATION_ROWS
    if (q) {
      list = list.filter(
        (r) =>
          r.recruitment_title.toLowerCase().includes(q) ||
          r.applicant_nickname.toLowerCase().includes(q) ||
          r.applicant_email.toLowerCase().includes(q)
      )
    }
    if (
      status &&
      ['APPLIED', 'REVIEWING', 'APPROVED', 'REJECTED'].includes(status)
    ) {
      list = list.filter((r) => r.status === status)
    }
    list = list.sort((a, b) =>
      order === 'asc'
        ? a.created_at.localeCompare(b.created_at)
        : b.created_at.localeCompare(a.created_at)
    )

    const { count, results } = paginateOffset(list, limit, offset)
    return HttpResponse.json({ count, results })
  }),

  http.get('*/api/v1/admin/applications/:aid', ({ request, params }) => {
    const authErr = requireAdminAuth(request.headers)
    if (authErr) return authErr

    const id = Number(params.aid)
    const row = APPLICATION_ROWS.find((r) => r.id === id)
    if (!row)
      return HttpResponse.json(
        { detail: '요청하신 데이터를 찾을 수 없습니다.' },
        { status: 404 }
      )

    const detail = {
      id: row.id,
      status: row.status,
      created_at: row.created_at,
      updated_at: row.updated_at,
      self_introduction: '안녕하세요, 프론트엔드에 관심이 많습니다.',
      motivation: '팀과 함께 성장하고 싶습니다.',
      objective: '개발자 취업',
      available_time: '평일 20-23시',
      has_study_experience: true,
      study_experience: '코딩 기초 6개월',
      recruitment: {
        id: 12,
        title: '프론트엔드',
        expected_headcount: 6,
        courses: [{ name: 'CS50', instructor: 'David' }],
        tags: ['프론트엔드', '코딩'],
        deadline: '2025-10-31',
      },
      applicant: {
        id: 5,
        nickname: row.applicant_nickname,
        gender: 'F',
        profile_image: 'https://cdn.example.com/u5.png',
        email: row.applicant_email,
      },
    }
    return HttpResponse.json(detail)
  }),
]
