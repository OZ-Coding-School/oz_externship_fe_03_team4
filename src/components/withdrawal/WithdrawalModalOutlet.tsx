import { useState } from 'react'
import { formatDate } from '../../utils/formatDate'
import { UserIcon } from 'lucide-react'
import { ModalPair } from '../reviews/ModalPair'
import type { WithdrawalDetail } from '../../types/withdraw/types'

export const WithdrawalModalOutlet = ({
  detail,
}: {
  detail: WithdrawalDetail
}) => {
  const user = detail.user
  const [imgError, setImgError] = useState(false)

  const genderLabel = user.gender === 'M' ? '남성' : '여성'
  const roleLabel =
    user.role === 'admin'
      ? '관리자'
      : user.role === 'staff'
        ? '스태프'
        : '일반회원'
  const statusLabel =
    user.status === 'active'
      ? '활성'
      : user.status === 'inactive'
        ? '비활성'
        : '탈퇴요청'

  return (
    <div className="grow overflow-y-auto">
      <p className="pb-4 text-lg font-semibold">회원 정보</p>
      {/* 사용자 */}
      <div className="mb-6 flex items-center gap-4">
        <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-gray-200">
          {user.profile_img_url && !imgError ? (
            <img
              src={user.profile_img_url}
              alt={user.nickname || user.name}
              className="h-full w-full rounded-full object-cover"
              onError={() => setImgError(true)}
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
        <ModalPair
          valueClassName="p-3 rounded-lg bg-gray-50 border-none"
          label="이름"
          value={user.name}
        />
        <ModalPair
          valueClassName="p-3 rounded-lg bg-gray-50 border-none"
          label="성별"
          value={genderLabel}
        />
        <ModalPair
          valueClassName="p-3 rounded-lg bg-gray-50 border-none"
          label="닉네임"
          value={user.nickname}
        />
        <ModalPair
          valueClassName="p-3 rounded-lg bg-gray-50 border-none"
          label="이메일"
          value={user.email}
        />
        <ModalPair
          valueClassName="p-3 rounded-lg bg-gray-50 border-none"
          label="권한"
          value={roleLabel}
        />
        <ModalPair
          valueClassName="p-3 rounded-lg bg-gray-50 border-none"
          label="상태"
          value={statusLabel}
        />
        <ModalPair
          valueClassName="p-3 rounded-lg bg-gray-50 border-none"
          label="회원가입 일시"
          value={formatDate(user.joined_at)}
        />
      </div>

      {/* 탈퇴 상세 */}
      <p className="pb-4 text-lg font-semibold">탈퇴 정보</p>
      <div className="grid grid-cols-2 gap-4">
        <ModalPair
          valueClassName="p-3 rounded-lg bg-gray-50 border-none"
          label="탈퇴요청 고유 ID"
          value={detail.withdrawal.id}
        />
        <ModalPair
          valueClassName="p-3 rounded-lg bg-gray-50 border-none"
          label="탈퇴요청 일시"
          value={formatDate(detail.withdrawal.created_at)}
        />
        <ModalPair
          valueClassName="p-3 rounded-lg bg-gray-50 border-none"
          label="탈퇴 사유"
          value={detail.withdrawal.reason}
        />
        <ModalPair
          valueClassName="p-3 rounded-lg bg-gray-50 border-none"
          label="삭제 예정 일시"
          value={formatDate(detail.withdrawal.due_date)}
        />
        <ModalPair
          valueClassName="p-3 rounded-lg bg-gray-50 border-none"
          label="탈퇴 상세 사유"
          value={detail.withdrawal.reason_detail || '-'}
        />
      </div>
    </div>
  )
}
