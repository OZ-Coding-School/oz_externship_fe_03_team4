import { useQuery } from "@tanstack/react-query";
import { mapUserResponse } from "../utils/user";
import api from "../lib/axios";
import { getAccessToken } from "../lib/token";

interface UseUsersProps {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  role?: string;
}

export const useUsers = ({
  page = 1,
  limit = 20,
  search = "",
  status = "",
  role = "",
}: UseUsersProps) => {
  const accessToken = getAccessToken();

  const query = useQuery({
    queryKey: ["users", { page, limit, search, status, role }],
    queryFn: async () => {
      const res = await api.get("/v1/admin/users", {
        params: { page, limit, search, status, role },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // 응답이 배열인 경우 처리
      const raw = Array.isArray(res.data)
        ? { users: res.data, pagination: null }
        : res.data.data || res.data;

      const users = (raw.users ?? []).map(mapUserResponse);

      return {
        users,
        pagination: raw.pagination ?? {
          total_pages: 1,
          total_items: users.length,
          current_page: page,
        },
      };
    },
    staleTime: 1000 * 60 * 2,
    retry: 1,
  });

  return {
    users: query.data?.users ?? [],
    pagination: query.data?.pagination,
    loading: query.isLoading,
    error:
      query.isError && query.error instanceof Error
        ? query.error.message
        : null,
    refetch: query.refetch,
  };
};