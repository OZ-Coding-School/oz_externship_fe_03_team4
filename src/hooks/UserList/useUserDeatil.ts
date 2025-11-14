import { useQuery } from "@tanstack/react-query";
import type { MappedUser } from "../../types/user";
import api from "../../lib/axios";
import { getAccessToken } from "../../lib/token";

// 백엔드 응답 타입
interface ApiUserDetail {
  id: number
  email: string
  name: string
  nickname: string
  phone_number: string
  is_active: boolean
  status: 'active' | 'inactive' | 'withdraw_requested'
  created_at: string
  profile_img_url: string
  birthday?: string
  role: 'admin' | 'staff' | 'user'
  gender?: 'M' | 'F' | null
}

interface ApiUserDetailResponse {
  detail: string
  data: ApiUserDetail
}

// ApiUserDetail → MappedUser 변환
const mapUserDetail = (data: ApiUserDetail): MappedUser => ({
  id: data.id.toString(),
  email: data.email,
  name: data.name,
  nickname: data.nickname,
  phone: data.phone_number,
  status:
    data.status === 'active'
      ? '활성'
      : data.status === 'inactive'
        ? '비활성'
        : '탈퇴요청',
  joinedAt: new Date(data.created_at).toLocaleDateString(),
  withdrawAt: '',
  birthday: data.birthday ? data.birthday.slice(0, 10) : '',
  role:
    data.role === 'admin'
      ? '관리자'
      : data.role === 'staff'
        ? '스태프'
        : '일반회원',
<<<<<<< HEAD
<<<<<<< HEAD
  avatar: data.profile_img_url || '',
  gender: data.gender ?? 'M',
=======
  avatar: null,
  gender: data.gender ?? 'M',
  profileUrl: data.profile_img_url ?? '',
>>>>>>> 93724da (fix(git):깃 문제 수정)
=======
  avatar: data.profile_img_url || '',
  gender: data.gender ?? 'M',
>>>>>>> eb9de85 (fix(타입 수정):일부 파일들의 타입 문제 수정)
});

export const useUserDetail = (userId?: string | number) => {
  const token = getAccessToken();

  return useQuery({
    queryKey: ["userDetail", userId],
    queryFn: async () => {
      if (!userId) throw new Error("userId is required");

      const res = await api.get<ApiUserDetailResponse>(`/v1/admin/users/${userId}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      return mapUserDetail(res.data.data);
    },
    enabled: !!userId, // userId가 있을 때만 실행
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};