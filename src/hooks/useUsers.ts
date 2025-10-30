import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { ApiUser } from "../types/user";
import { mapUserResponse } from "../utils/user";

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

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, //.env 환경 변수
  headers: {
    "Content-Type": "application/json",
  },
});

export const useUsers = ({
  page = 1,
  limit = 1000,
  search = "",
  status = "",
  role = "",
}: UseUsersProps) => {
  const token = localStorage.getItem("access_token");

  const query = useQuery({
    queryKey: ["users", { page, limit, search, status, role }],
    queryFn: async () => {
      const res = await api.get<{
        data?: { users: ApiUser[]; pagination?: PaginationInfo };
      }>("/v1/admin/users", {
        params: { page, limit, search, status, role },
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
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