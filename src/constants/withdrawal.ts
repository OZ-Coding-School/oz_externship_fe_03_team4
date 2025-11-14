export const ROLE_CODE_TO_LABEL = {
  admin: '관리자',
  staff: '스태프',
  user: '일반회원',
} as const

export const ROLE_LABEL_TO_CODE: Record<
  string,
  keyof typeof ROLE_CODE_TO_LABEL
> = {
  관리자: 'admin',
  스태프: 'staff',
  일반회원: 'user',
}

// ✅ 탈퇴 사유 코드 → 한글 매핑 추가
export const WITHDRAW_REASON_CODE_TO_LABEL: Record<string, string> = {
  NO_LONGER_NEEDED: '서비스 이용할 시간이 없음',
  LACK_OF_INTEREST: '관심이 사라짐',
  TOO_DIFFICULT: '서비스를 이용하기가 너무 어려움',
  FOUND_BETTER_SERVICE: '더 좋은 대안을 찾음',
  PRIVACY_CONCERNS: '개인정보/보안 우려',
  POOR_SERVICE_QUALITY: '서비스 품질 불만',
  TECHNICAL_ISSUES: '기술적 문제(버그 등)',
  LACK_OF_CONTENT: '원하는 콘텐츠나 기능의 부족',
  OTHER: '기타',
}

// ✅ 한글 → 코드 매핑 추가 (필요한 경우)
export const WITHDRAW_REASON_LABEL_TO_CODE: Record<string, string> = {
  '서비스 이용할 시간이 없음': 'NO_LONGER_NEEDED',
  '관심이 사라짐': 'LACK_OF_INTEREST',
  '서비스를 이용하기가 너무 어려움': 'TOO_DIFFICULT',
  '더 좋은 대안을 찾음': 'FOUND_BETTER_SERVICE',
  '개인정보/보안 우려': 'PRIVACY_CONCERNS',
  '서비스 품질 불만': 'POOR_SERVICE_QUALITY',
  '기술적 문제(버그 등)': 'TECHNICAL_ISSUES',
  '원하는 콘텐츠나 기능의 부족': 'LACK_OF_CONTENT',
  기타: 'OTHER',
}

export const WITHDRAW_REASONS = [
  '서비스 이용할 시간이 없음',
  '관심이 사라짐',
  '서비스를 이용하기가 너무 어려움',
  '더 좋은 대안을 찾음',
  '개인정보/보안 우려',
  '서비스 품질 불만',
  '기술적 문제(버그 등)',
  '원하는 콘텐츠나 기능의 부족',
  '기타',
] as const

export type WithdrawReason = (typeof WITHDRAW_REASONS)[number]
