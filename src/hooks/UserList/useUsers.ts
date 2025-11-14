import { useQuery } from "@tanstack/react-query";
import { mapUserResponse } from "../../utils/user";
import api from "../../lib/axios";
import { getAccessToken } from "../../lib/token";

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
        params: { page, limit, q: search, status, role },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const raw = res.data.data;

      const users = raw.users.map(mapUserResponse);

      return {
        users,
        pagination: {
          total_items: raw.pagination.total,
          total_pages: raw.pagination.pages,
          current_page: raw.pagination.page,
          limit: raw.pagination.limit,
          next: raw.pagination.next,
          previous: raw.pagination.previous,
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