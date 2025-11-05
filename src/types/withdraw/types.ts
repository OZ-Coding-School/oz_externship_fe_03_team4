import { type WithdrawReason } from '../../constants/withdrawal'

export type WithdrawalRow = {
  id: number
  email: string
  name: string
  role: string
  birthday: string
  reason: WithdrawReason
  created_at: string
}

export type WithdrawalDetail = {
  user: {
    profile_img_url: string
    id: number
    name: string
    gender: string
    nickname: string
    email: string
    role: string
    status: string
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
