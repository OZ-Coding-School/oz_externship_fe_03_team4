// 지원내역 import 하실 때는 이 파일을 import 하시면 됩니다.
import { ApplyItem, type Applicant } from './ApplyItem'

type ApplyListProps = {
  applicants: Applicant[]
  onItemClick?: (id: string) => void
  onItemMoreClick?: (id: string) => void
  emptyText?: string
}

export const ApplyList = ({
  applicants,
  onItemClick,
  onItemMoreClick,
  emptyText = '지원자가 없습니다.',
}: ApplyListProps) => {
  if (!applicants?.length) {
    return (
      <div className="flex flex-col gap-2 rounded-lg bg-gray-50 p-4">
        {emptyText}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <div>지원 내역 ({applicants.length}명)</div>
      <div className="flex flex-col gap-2 rounded-lg bg-gray-50 p-4">
        {applicants.map((a) => (
          <ApplyItem
            key={a.nickname}
            applicant={a}
            onClick={onItemClick}
            onMoreClick={onItemMoreClick}
          />
        ))}
      </div>
    </div>
  )
}
