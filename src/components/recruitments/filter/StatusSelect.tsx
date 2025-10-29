import { Select } from '../../FormUI'
import type { RecruitmentStatusApi } from '../../../types/recruitments'

interface StatusSelectProps {
  value: RecruitmentStatusApi | '전체'
  onChange: (nextValue: RecruitmentStatusApi | '전체') => void
}

export const StatusSelect = ({ value, onChange }: StatusSelectProps) => {
  return (
    <Select
      value={value}
      onChange={(event) =>
        onChange(event.target.value as RecruitmentStatusApi | '전체')
      }
      className="w-48"
    >
      <option value="전체">전체 상태</option>
      <option value="모집중">모집중</option>
      <option value="마감">마감</option>
    </Select>
  )
}
