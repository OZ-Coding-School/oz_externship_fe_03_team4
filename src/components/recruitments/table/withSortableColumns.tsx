import type { ReactNode } from 'react'
import { ArrowUpDown } from 'lucide-react'
import { cn } from '../../../utils/cn'

export type SortKey = string | undefined

export interface BaseColumn<Row> {
  key: keyof Row & string
  label?: ReactNode
  render?: (value: unknown, row: Row) => ReactNode
}

interface WithSortableColumnsOptions<Row> {
  sortableKeys: Array<keyof Row & string>
  sortKey?: SortKey
  onSortChange?: (nextSortKey: string) => void
}

export const withSortableColumns = <Row,>(
  columns: Array<BaseColumn<Row>>,
  options: WithSortableColumnsOptions<Row>
): Array<BaseColumn<Row>> => {
  const { sortableKeys, sortKey, onSortChange } = options

  if (!onSortChange) {
    return columns
  }

  return columns.map((column) => {
    if (!sortableKeys.includes(column.key)) {
      return column
    }

    const columnKey = column.key
    const isActive = sortKey === columnKey || sortKey === `-${columnKey}`
    const isDescending = sortKey === `-${columnKey}`

    const nextLabel = (
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation()

          const nextSortKey =
            sortKey === columnKey
              ? `-${columnKey}` // 오름차순 → 내림차순
              : sortKey === `-${columnKey}`
                ? columnKey // 내림차순 → 오름차순
                : columnKey // 미설정 → 오름차순

          onSortChange(nextSortKey)
        }}
        className={cn(
          'flex items-center gap-1 text-xs sm:text-sm',
          isActive ? 'text-neutral-900' : 'text-neutral-600'
        )}
      >
        <span>{column.label ?? columnKey}</span>
        <ArrowUpDown
          size={14}
          className={cn(
            'transition-transform',
            isActive ? 'opacity-100' : 'opacity-40',
            isDescending ? 'rotate-180' : ''
          )}
        />
      </button>
    )

    return {
      ...column,
      label: nextLabel,
    }
  })
}
