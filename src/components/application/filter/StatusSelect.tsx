import { Select } from '../../FormUI'
import type { StatusFilter } from '../../../types/applications'

interface StatusSelectProps {
  value: StatusFilter
  onChange: (v: StatusFilter) => void
}

export const StatusSelect = ({ value, onChange }: StatusSelectProps) => {
  return (
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value as StatusFilter)}
    >
      <option value="전체">전체 상태</option>
      <option value="승인">승인</option>
      <option value="검토중">검토중</option>
      <option value="대기">대기</option>
      <option value="거절">거절</option>
    </Select>
  )
}
