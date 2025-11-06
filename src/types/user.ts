export interface MappedUser {
  id: number | string;
  email: string;
  nickname: string;
  name: string;
  birthday: string;
  phone: string;
  role: "관리자" | "스태프" | "일반회원";
  status: "활성" | "비활성" | "탈퇴요청" | "active" | "inactive" | "withdraw_requested";
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
  gender: string;
  birthday: string;
  phone_number: string;
  status: string;
  role: string;
  created_at: string;
  profile_img_url?: string | null;
}