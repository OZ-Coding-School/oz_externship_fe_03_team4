import {
  type AdminApplicationApi,
  type Application,
  mapAdminApiToUi,
} from '../../types/applications'
// 서버 응답 형태
type ApplicationsListResponseV1 = {
  count: number
  results: AdminApplicationApi[]
}
type ApplicationsListResponseV2 = {
  total: number
  items: AdminApplicationApi[]
}
export type ApplicationsListResponse =
  | ApplicationsListResponseV1
  | ApplicationsListResponseV2
// 서버에 있는 데이터를 화면에서 쓸 수 있도록 바꿔주는 함수
export const mapApplicationsToUi = (
  dto: ApplicationsListResponse
): { items: Application[]; totalCount: number } => {
  const items = 'items' in dto ? dto.items : dto.results
  const totalCount = 'total' in dto ? dto.total : dto.count
  return {
    items: items.map(mapAdminApiToUi),
    totalCount,
  }
}
