import type { WithdrawalDetail } from './WithdrawalModalOutlet'
import type { WithdrawalRow } from '../../types/withdraw/types'

export const buildMockWithdrawalDetail = (
  row: WithdrawalRow
): WithdrawalDetail => ({
  withdrawal_id: Number(row.id.replace(/\D/g, '')),
  user: {
    id: 58,
    name: '홍길동',
    gender: 'M',
    nickname: '길동',
    email: 'hong@example.com',
    role: '일반회원',
    status: '탈퇴요청',
    created_at: '2024-01-10T09:00:00+09:00',
    profile_img_url: '',
  },
  reason: row.reason,
  reason_detail: '기능이 불편하고 사용하기 불편함',
  requested_at: '2025-10-12T14:32:00+09:00',
  scheduled_deletion_at: '2025-10-19T14:32:00+09:00',
})
