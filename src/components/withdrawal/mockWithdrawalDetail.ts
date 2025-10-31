import type { WithdrawalDetail } from './WithdrawalModalOutlet'
import type { WithdrawalRow } from '../../types/withdraw/types'

export const buildMockWithdrawalDetail = (
  row: WithdrawalRow
): WithdrawalDetail => ({
  withdrawal_id: row.id,
  user: {
    id: 58,
    name: row.name,
    gender: '남성',
    nickname: '길동',
    email: row.email,
    role: row.role,
    status: '탈퇴요청',
    created_at: '2024-01-10T09:00:00+09:00',
    profile_img_url: '',
  },
  reason: row.reason,
  reason_detail: '기능이 불편하고 사용하기 불편함',
  requested_at: row.created_at,
  scheduled_deletion_at: '2025-10-19T14:32:00+09:00',
})
