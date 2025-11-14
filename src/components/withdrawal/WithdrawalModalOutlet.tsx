import { formatDate } from '../../utils/formatDate'
import { UserIcon } from 'lucide-react'
import { ModalPair } from '../reviews/ModalPair'
import type { WithdrawalDetail } from '../../types/withdraw/types'
import {
  ROLE_CODE_TO_LABEL,
  WITHDRAW_REASON_CODE_TO_LABEL,
} from '../../constants/withdrawal'

export const WithdrawalModalOutlet = ({
  detail,
  isRestored = false,
}: {
  detail: WithdrawalDetail
  isRestored?: boolean
}) => {
  const user = detail.user
  const genderLabel =
    user.gender === 'M' ? '남성' : user.gender === 'F' ? '여성' : '-'
  const roleLabel =
    ROLE_CODE_TO_LABEL[user.role as keyof typeof ROLE_CODE_TO_LABEL] || '-'

  const statusLabel = isRestored
    ? '활성'
    : user.status === 'active'
      ? '활성'
      : user.status === 'inactive'
        ? '비활성'
        : user.status === 'withdrawal_pending'
          ? '탈퇴요청'
          : '-'

  const reasonLabel =
    WITHDRAW_REASON_CODE_TO_LABEL[detail.withdrawal.reason] ||
    detail.withdrawal.reason

  return (
    <div className="grow overflow-y-auto">
      <p className="pb-4 text-lg font-semibold">회원 정보</p>
      {/* 사용자 */}
      <div className="mb-6 flex items-center gap-4">
        <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-gray-200">
          {user.profile_img_url ? (
            <img
              src={user.profile_img_url}
              alt={user.nickname || user.name}
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-gray-400">
              <UserIcon className="h-10 w-10" />
            </div>
          )}
        </div>
        <div>
          <p className="text-lg font-semibold">{user.name}</p>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>

      {/* 사용자 정보 */}
      <div className="grid grid-cols-2 gap-4 pb-8">
        <ModalPair label="이름" value={user.name} noBorder />
        <ModalPair label="성별" value={genderLabel} noBorder />
        <ModalPair label="닉네임" value={user.nickname} noBorder />
        <ModalPair label="이메일" value={user.email} noBorder />
        <ModalPair label="권한" value={roleLabel} noBorder />
        <ModalPair label="상태" value={statusLabel} noBorder />
        <ModalPair
          label="회원가입 일시"
          value={formatDate(user.joined_at)}
          noBorder
        />
      </div>

      {/* 탈퇴 상세 */}
      <p className="pb-4 text-lg font-semibold">탈퇴 정보</p>
      <div className="grid grid-cols-2 gap-4">
        <ModalPair
          label="탈퇴요청 고유 ID"
          value={detail.withdrawal.id}
          noBorder
        />
        <ModalPair
          label="탈퇴요청 일시"
          value={formatDate(detail.withdrawal.created_at)}
          noBorder
        />
        <ModalPair label="탈퇴 사유" value={reasonLabel} noBorder />
        <ModalPair
          label="삭제 예정 일시"
          value={formatDate(detail.withdrawal.due_date)}
          noBorder
        />
        <ModalPair
          label="탈퇴 상세 사유"
          value={detail.withdrawal.reason_detail}
          noBorder
        />
      </div>
    </div>
  )
}
