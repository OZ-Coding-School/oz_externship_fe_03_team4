import axios from "axios";

/**
 * 회원 권한 변경 API
 *
 * @param userId - 권한을 변경할 사용자 ID
 * @param role - 변경할 권한 ("user" | "staff" | "admin")
 * @param token - 관리자 인증용 access_token
 * @returns 서버 응답 데이터 (성공 시 "회원 권한이 변경되었습니다." 등의 메시지 포함)
 */
export const updateUserRole = async (
  userId: number,
  role: "user" | "staff" | "admin",
  token: string
) => {
  try {
    const response = await axios.patch(
      `https://api.ozcoding.site/v1/admin/role`, // ✅ 실제 엔드포인트 확인 필요
      {
        user_id: userId,
        role,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // 관리자 권한 필요
        },
      }
    );

    return response.data; // { detail: "회원 권한이 변경되었습니다.", data: { ... } }
  } catch (error: any) {
    console.error("❌ 권한 변경 실패:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.detail || "권한 변경 중 오류가 발생했습니다."
    );
  }
};