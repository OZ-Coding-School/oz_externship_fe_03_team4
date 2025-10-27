import { User } from 'lucide-react'
import { StatusBadge } from '../application/table/StatusBadge'
import type { Application } from '../../types/applications'

export const ApplyItem = ({ application }: { application: Application }) => {
  const { id, applicant, status, appliedAt } = application

  return (
    <div
      role="button"
      data-id={id}
      className="flex w-full items-center gap-4 rounded-xl border border-gray-200 bg-white p-4"
    >
      <div className="flex w-full flex-col">
        <div className="mb-2 flex justify-between gap-2">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <div className="truncate text-sm font-semibold">
              {applicant.name}
            </div>
          </div>

          <StatusBadge status={status} />
        </div>

        <div className="mt-1 flex flex-col gap-1 text-xs text-gray-600">
          {applicant.email && <span>이메일: {applicant.email}</span>}
          {appliedAt && <span>지원 일시: {appliedAt}</span>}
        </div>
      </div>
    </div>
  )
}
