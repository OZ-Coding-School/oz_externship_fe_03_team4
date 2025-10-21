import { useState, useEffect } from "react";
import axios from "axios";
import type { ApiUser, MappedUser } from "../types/user";
import { mapUserResponse } from "../utils/user";

interface UseUsersProps {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  role?: string;
}

export const useUsers = ({
  page = 1,
  limit = 1000,
  search = "",
  status = "",
  role = "",
}: UseUsersProps) => {
  const [users, setUsers] = useState<MappedUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("access_token");
        const res = await axios.get<{
          detail: string;
          data?: { users: ApiUser[] };
        }>("/api/v1/admin/users", {
          params: { page, limit, search, status, role },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(res.data.data?.users?.map(mapUserResponse) ?? []);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.detail || "회원 목록 조회 실패");
        } else {
          setError("회원 목록 조회 실패");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page, limit, search, status, role]);

  return { users, loading, error };
};