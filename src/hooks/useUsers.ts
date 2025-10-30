import { useQuery } from "@tanstack/react-query";
import type { ApiUser } from "../types/user";
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

interface PaginationInfo {
  total_pages: number;
  total_items: number;
  current_page: number;
}

export const useUsers = ({
  page = 1,
  limit = 1000,
  search = "",
  status = "",
  role = "",
}: UseUsersProps) => {
  const accessToken = getAccessToken();

  const query = useQuery({
    queryKey: ["users", { page, limit, search, status, role }],
    queryFn: async () => {
      const res = await api.get<{
        data?: { users: ApiUser[]; pagination?: PaginationInfo };
      }>("/v1/admin/users", {
        params: { page, limit, search, status, role },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = res.data.data;

      return {
        users: data?.users?.map(mapUserResponse) ?? [],
        pagination: data?.pagination,
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