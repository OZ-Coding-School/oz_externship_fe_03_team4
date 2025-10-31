export interface MappedUser {
  id: number | string;
  email: string;
  nickname: string;
  name: string;
  birthday: string;
  phone: string;
  role: "관리자" | "스태프" | "일반회원";
  status: "활성" | "비활성" | "탈퇴요청";
  joinedAt: string;
  withdrawAt: string;
  avatar?: string | null;
  [key: string]: unknown; // Table 제네릭 호환용
}

export interface ApiUser {
  id: number | string;
  email: string;
  nickname: string;
  name: string;
  birthday: string;
  is_superuser: boolean;
  is_staff: boolean;
  is_active: boolean;
  created_at: string;
  withdrawal_requested_at: string | null;
}