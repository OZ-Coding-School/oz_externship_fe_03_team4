// import { http, HttpResponse } from 'msw'
// import { requireAdminAuth, toInt } from './_utils'
// import type {
//   StudyGroupDetailResponse,
//   StudyGroupDTO,
//   StudyGroupListResponse,
// } from '../../types/studyGroup/types'

// type SGStatus = 'PENDING' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED'

// type StudyGroup = {
//   id: number
//   uuid: string
//   name: string
//   current_headcount: number
//   max_headcount: number
//   profile_img_url: string
//   start_at: string
//   end_at: string
//   status: SGStatus
//   created_at: string
//   updated_at: string
// }

// const SG_LIST: StudyGroup[] = Array.from({ length: 42 }).map((_, i) => ({
//   id: i + 1,
//   uuid: `00000000-0000-0000-0000-${String(i + 1).padStart(12, '0')}`,
//   name: `리액트 스터디 ${i + 1}`,
//   current_headcount: (i % 7) + 2,
//   max_headcount: 12,
//   profile_img_url: 'https://picsum.photos/seed/study/200/200',
//   start_at: `2025-09-${String((i % 28) + 1).padStart(2, '0')}`,
//   end_at: `2025-12-${String((i % 28) + 1).padStart(2, '0')}`,
//   status: (['PENDING', 'ACTIVE', 'COMPLETED', 'CANCELLED'] as const)[i % 4],
//   created_at: `2025-09-${String((i % 28) + 1).padStart(2, '0')}`,
//   updated_at: `2025-10-${String((i % 28) + 1).padStart(2, '0')}`,
// }))

// export const studyGroupAdminHandlers = [
//   // 목록 조회
//   http.get('*/api/v1/studies/admin/groups/', ({ request }) => {
//     // 인증 체크
//     const authErr = requireAdminAuth(request.headers)
//     if (authErr) return authErr

//     const url = new URL(request.url)
//     const search = (url.searchParams.get('search') || '').toLowerCase()
//     const status = url.searchParams.get('status') as SGStatus | null
//     const ordering = url.searchParams.get('ordering') || '-created_at'

//     const limit = toInt(url.searchParams.get('limit'), 10)
//     const offset = toInt(url.searchParams.get('offset'), 0)

//     let list = [...SG_LIST]

//     // 검색 필터
//     if (search) {
//       list = list.filter((g) => g.name.toLowerCase().includes(search))
//     }

//     // 상태 필터
//     if (status) {
//       list = list.filter((g) => g.status === status)
//     }

//     // 정렬
//     list = list.sort((a, b) => {
//       switch (ordering) {
//         case 'created_at':
//           return a.created_at.localeCompare(b.created_at)
//         case '-created_at':
//           return b.created_at.localeCompare(a.created_at)
//         case 'name':
//           return a.name.localeCompare(b.name)
//         case '-name':
//           return b.name.localeCompare(a.name)
//         case 'start_at':
//           return a.start_at.localeCompare(b.start_at)
//         case '-start_at':
//           return b.start_at.localeCompare(a.start_at)
//         default:
//           return b.created_at.localeCompare(a.created_at)
//       }
//     })

//     const totalCount = list.length
//     const paginatedList = list.slice(offset, offset + limit)
//     const mappedResults: StudyGroupDTO[] = paginatedList.map((item) => ({
//       id: item.id,
//       uuid: item.uuid,
//       name: item.name,
//       current_headcount: item.current_headcount,
//       max_headcount: item.max_headcount,
//       profile_img_url: item.profile_img_url,
//       start_at: item.start_at,
//       end_at: item.end_at,
//       status: item.status,
//       created_at: item.created_at,
//       updated_at: item.updated_at,
//     }))

//     return HttpResponse.json<StudyGroupListResponse>({
//       status: 200,
//       message: '어드민용 스터디 그룹 목록 조회에 성공했습니다.',
//       data: {
//         study_groups: mappedResults,
//         total_count: totalCount,
//       },
//     })
//   }),

//   // 상세 조회
//   http.get('*/api/v1/studies/admin/groups/:uuid', ({ request, params }) => {
//     // 인증 체크
//     const authErr = requireAdminAuth(request.headers)
//     if (authErr) return authErr as any

//     const uuid = String(params.uuid)
//     const item = SG_LIST.find((s) => s.uuid === uuid)

//     if (!item) {
//       return HttpResponse.json(
//         {
//           status: 404,
//           message: '페이지를 찾을 수 없습니다.',
//           error: {
//             code: 'STUDY_GROUP_NOT_FOUND',
//             detail: '해당 UUID 값의 스터디 그룹이 존재하지 않습니다.',
//           },
//         },
//         { status: 404 }
//       )
//     }

//     return HttpResponse.json<StudyGroupDetailResponse>({
//       status: 200,
//       message: '어드민용 스터디 그룹 상세 조회에 성공했습니다.',
//       data: {
//         id: item.id,
//         uuid: item.uuid,
//         name: item.name,
//         current_headcount: item.current_headcount,
//         max_headcount: item.max_headcount,
//         members: [
//           { nickname: '경복', is_leader: true },
//           { nickname: '단비', is_leader: false },
//           { nickname: '현진', is_leader: false },
//         ],
//         profile_img_url: item.profile_img_url,
//         start_at: item.start_at,
//         end_at: item.end_at,
//         status: item.status,
//         lectures: [
//           {
//             thumbnail_img_url: 'https://picsum.photos/seed/lecture/400/300',
//             title: 'React 19 완벽 가이드',
//             instructor: 'Dan Abramov',
//             url_link: 'https://react.dev',
//           },
//         ],
//         created_at: item.created_at,
//         updated_at: item.updated_at,
//       },
//     })
//   }),
// ]
