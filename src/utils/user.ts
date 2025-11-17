import type { ApiUser, MappedUser } from "../types/user";

export const mapUserResponse = (user: ApiUser): MappedUser => {
  let role: "관리자" | "스태프" | "일반회원" = "일반회원";

  if (user.role === "admin") role = "관리자";
  else if (user.role === "staff") role = "스태프";

  let status: "활성" | "비활성" | "탈퇴요청" = "활성";
  if (user.status === "inactive") status = "비활성";
  else if (user.status === "withdrawal_pending") status = "탈퇴요청";

  return {
    id: user.id,
    email: user.email,
    nickname: user.nickname,
    name: user.name,
    birthday: user.birthday ?? "-",
    phone: user.phone_number ?? "",
    role,
    status,
    joinedAt: new Date(user.created_at).toLocaleDateString(),
    withdrawAt: "-",
    avatar: user.profile_img_url ?? null
  };
};
