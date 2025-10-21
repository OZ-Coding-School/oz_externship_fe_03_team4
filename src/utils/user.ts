import type { ApiUser, MappedUser } from "../types/user";

export const mapUserResponse = (user: ApiUser): MappedUser => ({
  id: user.id,
  email: user.email,
  nickname: user.nickname,
  name: user.name,
  birthday: user.birthday,
  role: user.is_superuser ? "관리자" : user.is_staff ? "스태프" : "일반회원",
  status: user.withdrawal_requested_at
    ? "탈퇴요청"
    : user.is_active
    ? "활성"
    : "비활성",
  joinedAt: new Date(user.created_at).toLocaleDateString(),
  withdrawAt: user.withdrawal_requested_at
    ? new Date(user.withdrawal_requested_at).toLocaleDateString()
    : "-",
});