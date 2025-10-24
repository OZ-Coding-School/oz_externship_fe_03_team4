import { Select } from '../../FormUI'
import type { AdminSortKey } from '../../../types/applications'

interface SortSelectProps {
  value: AdminSortKey
  onChange: (v: AdminSortKey) => void
}

export const SortSelect = ({ value, onChange }: SortSelectProps) => {
  return (
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value as AdminSortKey)}
      className="w-50"
    >
      <option value="-appliedAt">지원일 최신순</option>
      <option value="appliedAt">지원일 오래된순</option>
      <option value="-updatedAt">수정일 최신순</option>
      <option value="updatedAt">수정일 오래된순</option>
    </Select>
  )
}
