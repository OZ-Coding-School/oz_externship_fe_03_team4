import { type WithdrawReason } from '../../constants/withdrawal'

export type UserRole = 'user' | 'staff' | 'admin'
export type UserStatus = 'active' | 'inactive' | 'withdrawal_pending'

export type WithdrawalRow = {
  id: number
  email: string
  name: string
  role: UserRole
  birthday: string
  reason: WithdrawReason
  withdrawn_at: string
}

export interface FetchWithdrawalsResponse {
  count: number
  next: string | null
  previous: string | null
  results: WithdrawalRow[] // ✅ result → results
}

export type WithdrawalDetail = {
  user: {
    profile_img_url: string
    id: number
    name: string
    gender: string
    nickname: string
    email: string
    role: UserRole
    status: UserStatus
    joined_at: string
  }
  withdrawal: {
    id: string
    reason: string
    reason_detail: string
    created_at: string
    due_date: string
  }
}
