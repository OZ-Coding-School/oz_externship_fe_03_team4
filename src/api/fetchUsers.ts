import api from "../lib/axios";
import { getAccessToken } from "../lib/token";

export interface FetchUsersParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
  status?: string;
}

export interface FetchedUser {
  id: number;
  email: string;
  nickname: string;
  name: string;
  birthday: string;
  is_active: boolean;
  is_superuser: boolean;
  is_staff: boolean;
  created_at: string;
  withdrawal_requested_at: string | null;
}

export interface FetchUsersResponse {
  detail: string;
  data: {
    users: FetchedUser[];
    pagination: {
      page: number;
      limit: number;
      total_items: number;
      total_pages: number;
    };
  };
}

// 실제 호출 함수 (axios 인스턴스 및 getAccessToken 적용)
export async function fetchUsers({
  page = 1,
  limit = 20,
  search = "",
  role = "",
  status = "",
}: FetchUsersParams): Promise<FetchUsersResponse> {
  const accessToken = getAccessToken();

  const response = await api.get("/v1/admin/users", {
    params: {
      page,
      limit,
      search: search || undefined,
      role: role || undefined,
      status: status || undefined,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
}