// import type { WithdrawalDetail } from './WithdrawalModalOutlet'
import type {
  WithdrawalRow,
  WithdrawalDetail,
} from '../../types/withdraw/types'

export const buildMockWithdrawalDetail = (
  row: WithdrawalRow
): WithdrawalDetail => ({
  user: {
    profile_img_url: '',
    id:
      typeof row.id === 'number'
        ? row.id
        : Number(String(row.id).replace(/\D/g, '')) || 58,
    name: row.name,
    gender: 'M',
    nickname: row.name,
    email: row.email,
    role: row.role,
    status: '탈퇴요청',
    joined_at: '2024-01-10T09:00:00+09:00',
  },
  withdrawal: {
    id: String(row.id),
    reason: row.reason,
    reason_detail: '기능이 불편하고 사용하기 불편함',
    created_at: '2025-10-12T14:32:00+09:00',
    due_date: '2025-10-19T14:32:00+09:00',
  },
})
