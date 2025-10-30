import { type WithdrawReason } from '../../constants/withdrawal'

export type WithdrawalRow = {
  id: string
  email: string
  name: string
  role: '관리자' | '스태프' | '일반회원'
  birthday: string
  reason: WithdrawReason
  created_at: string
}
