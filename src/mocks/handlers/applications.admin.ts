import { http, HttpResponse } from 'msw'
import { paginateOffset, requireAdminAuth } from './_utils'
import {
  type AdminApplicationRow,
  type AdminApplicationStatus,
} from './applications/applications.admin.types'
import { APPLICATION_ROWS } from './applications/applications.admin.data'

import {
  DEFAULT_LIMIT,
  DEFAULT_OFFSET,
  parseQueryString,
  applySearchFilter,
  applyStatusFilter,
  applySortByCreatedAt,
} from './applications/applications.admin.helpers'

export const applicationAdminHandlers = [
  // 목록 조회하기
  http.get('*/api/v1/admin/applications', ({ request }) => {
    // 관리자 여부 확인
    const authenticationErrorResponse = requireAdminAuth(request.headers)
    if (authenticationErrorResponse) return authenticationErrorResponse
    // 쿼리를 파싱해옵니닷
    const { searchText, statusFilter, limit, offset, sortOrder } =
      parseQueryString(request.url)
    // 필터링과 정렬
    let filteredApplicationList: AdminApplicationRow[] = APPLICATION_ROWS
    filteredApplicationList = applySearchFilter(
      filteredApplicationList,
      searchText
    )
    filteredApplicationList = applyStatusFilter(
      filteredApplicationList,
      statusFilter
    )
    filteredApplicationList = applySortByCreatedAt(
      filteredApplicationList,
      sortOrder
    )

    // 페이지네이션
    const { count, results } = paginateOffset(
      filteredApplicationList,
      Number.isFinite(limit) ? limit : DEFAULT_LIMIT,
      Number.isFinite(offset) ? offset : DEFAULT_OFFSET
    )
    return HttpResponse.json({ count, results })
  }),

  // 상세 조회하기
  http.get(
    '*/api/v1/admin/applications/:applicationId',
    ({ request, params }) => {
      // 관리자 여부 확인
      const authenticationErrorResponse = requireAdminAuth(request.headers)
      if (authenticationErrorResponse) return authenticationErrorResponse

      // 쿼리 파라미터 파싱해오기
      const applicationId = Number(params.applicationId)
      const targetRow = APPLICATION_ROWS.find((row) => row.id === applicationId)

      if (!targetRow) {
        return HttpResponse.json(
          { detail: '요청하신 데이터를 찾을 수 없습니다.' },
          { status: 404 }
        )
      }

      // 상세 목업 응답 구성하기
      const applicationDetail = {
        id: targetRow.id,
        status: targetRow.status as AdminApplicationStatus,
        created_at: targetRow.created_at,
        updated_at: targetRow.updated_at,
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
          nickname: targetRow.applicant_nickname,
          gender: 'F',
          profile_image: 'https://cdn.example.com/u5.png',
          email: targetRow.applicant_email,
        },
      }

      return HttpResponse.json(applicationDetail)
    }
  ),
]
