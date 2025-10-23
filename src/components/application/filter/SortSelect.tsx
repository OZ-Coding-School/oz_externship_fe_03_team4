import { Select } from '../../FormUI'
import type { SortKey } from '../../../types/applications'

interface SortSelectProps {
  value: SortKey
  onChange: (v: SortKey) => void
}

export const SortSelect = ({ value, onChange }: SortSelectProps) => {
  return (
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value as SortKey)}
      className="w-50"
    >
      <option value="-appliedAt">지원일 최신순</option>
      <option value="appliedAt">지원일 오래된순</option>
      <option value="-updatedAt">수정일 최신순</option>
      <option value="updatedAt">수저일 오래된순</option>
    </Select>
  )
}
