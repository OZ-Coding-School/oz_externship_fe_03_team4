import { useQuery } from "@tanstack/react-query";
import type { MappedUser } from "../types/user";
import api from "../lib/axios";
import { getAccessToken } from "../lib/token"; // token 가져오기

// 백엔드 응답 타입
interface ApiUserDetail {
  id: number;
  email: string;
  name: string;
  nickname: string;
  phone_number: string;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  status: "active" | "inactive" | "withdrawn";
  created_at: string;
  profile_img_url: string;
  birthday?: string;
}

// ApiUserDetail → MappedUser 변환
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
  birthday: data.birthday ?? "",
  role: data.is_superuser
    ? "관리자"
    : data.is_staff
    ? "스태프"
    : "일반회원",
  avatar: data.profile_img_url || "",
});

export const useUserDetail = (userId?: string | number) => {
  const token = getAccessToken(); // lib/token 사용

  return useQuery({
    queryKey: ["userDetail", userId],
    queryFn: async () => {
      if (!userId) throw new Error("userId is required");

      const res = await api.get<ApiUserDetail>(`/v1/admin/users/${userId}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      return mapUserDetail(res.data);
    },
    enabled: !!userId, // userId가 있을 때만 실행
    staleTime: 1000 * 60 * 2,
  });
};