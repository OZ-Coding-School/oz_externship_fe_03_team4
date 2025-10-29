import axios from "axios";

export interface FetchUsersParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
  status?: string;
  accessToken: string;
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

// 실제 호출 함수
export async function fetchUsers({
  page = 1,
  limit = 20,
  search = "",
  role = "",
  status = "",
  accessToken,
}: FetchUsersParams): Promise<FetchUsersResponse> {
  const response = await axios.get("/api/v1/admin/users", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      page,
      limit,
      search: search || undefined,
      role: role || undefined,
      status: status || undefined,
    },
  });
  return response.data;
}