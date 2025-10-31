import type { ApiUser, MappedUser } from "../types/user";

export const mapUserResponse = (user: ApiUser): MappedUser => {
  return {
    id: user.id,
    email: user.email,
    nickname: user.nickname,
    name: user.name,
    birthday: user.birthday ?? "-",
    role: user.id === 1 ? "관리자" : "일반회원", // 관리자 판별 기준 (백엔드 변경 시 수정)
    status: user.withdrawal_requested_at ? "탈퇴요청" : "활성",
    joinedAt: new Date(user.created_at).toLocaleDateString(),
    withdrawAt: user.withdrawal_requested_at
      ? new Date(user.withdrawal_requested_at).toLocaleDateString()
      : "-",
    avatar: null,
  };
};