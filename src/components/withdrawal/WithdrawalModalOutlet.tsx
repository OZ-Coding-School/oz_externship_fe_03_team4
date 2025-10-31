import { formatDate } from '../../utils/formatDate'
import { UserIcon } from 'lucide-react'
import { InfoField } from '../info-field/InfoField'

export type WithdrawalDetail = {
  withdrawal_id: number | string
  user: {
    id: number
    name: string
    nickname: string
    email: string
    gender: string
    role: string
    status: string
    created_at: string
    profile_img_url?: string
  }
  reason: string
  reason_detail: string
  requested_at: string
  scheduled_deletion_at: string
}

export const WithdrawalModalOutlet = ({
  detail,
}: {
  detail: WithdrawalDetail
}) => {
  const user = detail.user
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
        <InfoField label="이름" value={user.name} />
        <InfoField label="성별" value={user.gender} />
        <InfoField label="닉네임" value={user.nickname} />
        <InfoField label="이메일" value={user.email} />
        <InfoField label="권한" value={user.role} />
        <InfoField label="상태" value={user.status} />
        <InfoField label="회원가입 일시" value={formatDate(user.created_at)} />
      </div>

      {/* 탈퇴 상세 */}
      <p className="pb-4 text-lg font-semibold">탈퇴 정보</p>
      <div className="grid grid-cols-2 gap-4">
        <InfoField label="탈퇴요청 고유 ID" value={detail.withdrawal_id} />
        <InfoField
          label="탈퇴요청 일시"
          value={formatDate(detail.requested_at)}
        />
        <InfoField label="탈퇴 사유" value={detail.reason} />
        <InfoField
          label="삭제 예정 일시"
          value={formatDate(detail.scheduled_deletion_at)}
        />
        <InfoField
          label="탈퇴 상세 사유"
          value={detail.reason_detail}
          fullWidth
        />
      </div>
    </div>
  )
}
