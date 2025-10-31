import { formatDate } from '../../utils/formatDate'
import { UserIcon } from 'lucide-react'

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
      {/* 사용자 */}
      <div className="flex items-center gap-4 pb-6">
        <div className="h-20 w-20 overflow-hidden rounded-full bg-gray-100">
          {user.profile_img_url ? (
            <img
              src={user.profile_img_url}
              alt={user.nickname || user.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-gray-400">
              <UserIcon className="h-10 w-10" />
            </div>
          )}
        </div>
        <div className="min-w-0">
          <div className="truncate font-medium text-gray-900">
            <p className="text-lg font-semibold">{user.name}</p>
          </div>
          <div className="truncate text-xs text-gray-500">
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
      </div>

      {/* 사용자 정보 */}
      <div className="grid grid-cols-2 gap-4 pb-8">
        <div>
          <p className="mb-1 text-xs text-gray-500">이름</p>
          <div className="rounded-lg bg-gray-50 p-3">
            <p className="font-medium">{user.name}</p>
          </div>
        </div>
        <div>
          <p className="mb-1 text-xs text-gray-500">성별</p>
          <div className="rounded-lg bg-gray-50 p-3">
            <p className="font-medium">{user.gender}</p>
          </div>
        </div>
        <div>
          <p className="mb-1 text-xs text-gray-500">닉네임</p>
          <div className="rounded-lg bg-gray-50 p-3">
            <p className="font-medium">{user.nickname}</p>
          </div>
        </div>
        <div>
          <p className="mb-1 text-xs text-gray-500">이메일</p>
          <div className="rounded-lg bg-gray-50 p-3">
            <p className="font-medium">{user.email}</p>
          </div>
        </div>
        <div>
          <p className="mb-1 text-xs text-gray-500">권한</p>
          <div className="rounded-lg bg-gray-50 p-3">
            <p className="font-medium">{user.role}</p>
          </div>
        </div>
        <div>
          <p className="mb-1 text-xs text-gray-500">상태</p>
          <div className="rounded-lg bg-gray-50 p-3">
            <p className="font-medium">{user.status}</p>
          </div>
        </div>
        <div>
          <p className="mb-1 text-xs text-gray-500">회원가입 일시</p>
          <div className="rounded-lg bg-gray-50 p-3">
            <p className="font-medium">{formatDate(user.created_at)}</p>
          </div>
        </div>
      </div>

      {/* 탈퇴 상세 */}
      <p className="pb-4 text-lg font-semibold">탈퇴 정보</p>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="mb-1 text-xs text-gray-500">탈퇴요청 고유 ID</p>
          <div className="rounded-lg bg-gray-50 p-3">
            <p className="font-medium">{detail.withdrawal_id}</p>
          </div>
        </div>
        <div>
          <p className="mb-1 text-xs text-gray-500">탈퇴요청 일시</p>
          <div className="rounded-lg bg-gray-50 p-3">
            <p className="font-medium">{formatDate(detail.requested_at)}</p>
          </div>
        </div>
        <div>
          <p className="mb-1 text-xs text-gray-500">탈퇴사유</p>
          <div className="rounded-lg bg-gray-50 p-3">
            <p className="font-medium">{detail.reason}</p>
          </div>
        </div>

        <div>
          <p className="mb-1 text-xs text-gray-500">삭제 예정 일시</p>
          <div className="rounded-lg bg-gray-50 p-3">
            <p className="font-medium">
              {formatDate(detail.scheduled_deletion_at)}
            </p>
          </div>
        </div>
        <div className="col-span-2">
          <p className="mb-1 text-xs text-gray-500">탈퇴 상세 사유</p>
          <div className="rounded-lg bg-gray-50 p-3">
            <p className="font-medium">{detail.reason_detail}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
