export const ROLE_CODE_TO_LABEL = {
  admin: '관리자',
  staff: '스태프',
  user: '일반회원',
} as const

export const ROLE_LABEL_TO_CODE: Record<
  '관리자' | '스태프' | '일반회원',
  'admin' | 'staff' | 'user'
> = {
  관리자: 'admin',
  스태프: 'staff',
  일반회원: 'user',
}

export const WITHDRAW_REASONS = [
  '서비스 불만족',
  '개인정보 우려',
  '사용 빈도 낮음',
  '경쟁 서비스 이용',
  '기타',
] as const

export type WithdrawReason = (typeof WITHDRAW_REASONS)[number]
