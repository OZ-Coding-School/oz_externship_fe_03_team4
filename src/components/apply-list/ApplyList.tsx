// 지원내역 import 하실 때는 이 파일을 import 하시면 됩니다.
import { ApplyItem } from './ApplyItem'
// import type { ApplyListProps } from '../../types/apply/types'
import type { Application } from '../../types/applications'

// type ApplicationCard = Pick<
//   Application,
//   'id' | 'applicant' | 'status' | 'appliedAt'
// >

export const ApplyList = ({
  applications,
}: {
  applications: Application[]
}) => {
  if (!applications?.length) {
    return (
      <div className="flex flex-col gap-2 rounded-lg bg-gray-50 p-4">
        <span>지원자가 없습니다.</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <div>지원 내역 ({applications.length}명)</div>
      <div className="flex flex-col gap-2 rounded-lg bg-gray-50 p-4">
        {applications.map((application) => (
          <ApplyItem key={application.id} application={application} />
        ))}
      </div>
    </div>
  )
}
