/**
 * 숫자만 남기고 3-4-4 형식으로 전화번호 변환
 * @param phone 서버에서 받은 전화번호 문자열
 * @returns 포맷된 전화번호 문자열 (예: 010-1234-5678)
 */

export const formatPhone = (phone: string): string => {
  const digits = phone.replace(/\D/g, ""); // 숫자만 추출
  if (digits.length === 11) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
  } else if (digits.length === 10) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return phone; // 포맷 불가능 시 원래 문자열 반환
};