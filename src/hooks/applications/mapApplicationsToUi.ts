import {
  type AdminApplicationApi,
  type Application,
  mapAdminApiToUi,
} from '../../types/applications'
// 서버 응답 형태
export type ApplicationsListResponse = {
  items: AdminApplicationApi[]
  total: number
}
// 서버에 있는 데이터를 화면에서 쓸 수 있도록 바꿔주는 함수
export const mapApplicationsToUi = (
  dto: ApplicationsListResponse
): { items: Application[]; totalCount: number } => {
  return {
    items: dto.items.map(mapAdminApiToUi),
    totalCount: dto.total,
  }
}
