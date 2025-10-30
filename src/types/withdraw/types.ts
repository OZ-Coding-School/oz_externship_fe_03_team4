export type WithdrawalRow = {
  id: string
  email: string
  name: string
  role: '관리자' | '스태프' | '일반회원'
  birthday: string
  reason: string
  created_at: string
}
