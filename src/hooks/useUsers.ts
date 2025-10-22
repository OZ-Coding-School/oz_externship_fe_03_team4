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

// axios 기본 설정 (baseURL + 헤더 등)
const api = axios.create({
  baseURL: "https://api.ozcoding.site",
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
      const res = await api.get<{ data?: { users: ApiUser[] } }>(
        "/api/v1/admin/users", // base url에서 api가 제거 되었으므로 여기 추가
        {
          params: { page, limit, search, status, role },
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      return res.data.data?.users.map(mapUserResponse) ?? [];
    },
    staleTime: 1000 * 60 * 2, // 2분 캐시 유지
    retry: 1, // 실패 시 한 번만 재시도
  });

  return {
    users: query.data ?? [],
    loading: query.isLoading,
    error:
      query.isError && query.error instanceof Error
        ? query.error.message
        : null,
    refetch: query.refetch,
  };
};