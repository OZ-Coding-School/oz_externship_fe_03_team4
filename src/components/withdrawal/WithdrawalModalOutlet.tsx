import { formatDate } from '../../utils/formatDate'

export type WithdrawalDetail = {
  withdrawal_id: number
  user: {
    id: number
    name: string
    gender: string
    nickname: string
    email: string
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
  return (
    <div className="space-y-3 text-sm">
      <div className="grid grid-cols-3 gap-2">
        <span className="text-gray-500">요청 ID</span>
        <span className="col-span-2 font-medium text-gray-900">
          {detail.withdrawal_id}
        </span>

        <span className="text-gray-500">사용자 ID</span>
        <span className="col-span-2 font-medium text-gray-900">
          {detail.user.id}
        </span>

        <span className="text-gray-500">탈퇴 사유</span>
        <span className="col-span-2 text-gray-900">{detail.reason}</span>

        <span className="text-gray-500">상세 사유</span>
        <span className="col-span-2 text-gray-900">{detail.reason_detail}</span>

        <span className="text-gray-500">요청 일시</span>
        <span className="col-span-2 text-gray-900">
          {formatDate(detail.requested_at)}
        </span>

        <span className="text-gray-500">삭제 예정 일시</span>
        <span className="col-span-2 text-gray-900">
          {formatDate(detail.scheduled_deletion_at)}
        </span>
      </div>
    </div>
  )
}
