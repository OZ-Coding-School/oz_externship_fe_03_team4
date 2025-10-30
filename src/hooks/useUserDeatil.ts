import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { MappedUser } from "../types/user";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// API 타입 (백엔드 응답 기반)
interface ApiUserDetail {
  id: number;
  email: string;
  name: string;
  nickname: string;
  phone_number: string;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  status: string;
  created_at: string;
  profile_img_url: string;
}

// API → MappedUser 변환
const mapUserDetail = (data: ApiUserDetail): MappedUser => ({
  id: data.id.toString(),
  email: data.email,
  name: data.name,
  nickname: data.nickname,
  phone: data.phone_number,
  status:
    data.status === "active"
      ? "활성"
      : data.status === "withdrawn"
      ? "탈퇴요청"
      : "비활성",
  joinedAt: new Date(data.created_at).toLocaleDateString(),
  withdrawAt: "",
  birthday: "",
  role: data.is_superuser
    ? "관리자"
    : data.is_staff
    ? "스태프"
    : "일반회원",
  avatar: data.profile_img_url || "",
});

export const useUserDetail = (userId?: string | number) => {
  const token = localStorage.getItem("access_token");

  return useQuery({
    queryKey: ["userDetail", userId],
    queryFn: async () => {
      const res = await api.get<ApiUserDetail>(
        `/api/v1/admin/users/${userId}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      return mapUserDetail(res.data);
    },
    enabled: !!userId, // userId가 있을 때만 실행
    staleTime: 1000 * 60 * 2,
  });
};