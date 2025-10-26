// 지원내역 import 하실 때는 이 파일을 import 하시면 됩니다.
import { ApplyItem } from './ApplyItem'
import type { ApplyListProps } from '../../types/apply/types'

export const ApplyList = ({ applicants }: ApplyListProps) => {
  if (!applicants?.length) {
    return (
      <div className="flex flex-col gap-2 rounded-lg bg-gray-50 p-4">
        <span>지원자가 없습니다.</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <div>지원 내역 ({applicants.length}명)</div>
      <div className="flex flex-col gap-2 rounded-lg bg-gray-50 p-4">
        {applicants.map((applicant) => (
          <ApplyItem key={applicant.id} applicant={applicant} />
        ))}
      </div>
    </div>
  )
}
