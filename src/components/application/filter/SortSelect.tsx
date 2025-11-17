import type { AdminSortKey } from '../../../types/applications'
import { Accordion } from '../../Accordion/Accordion'

interface SortSelectProps {
  value: AdminSortKey
  onChange: (v: AdminSortKey) => void
  className?: string
  open: boolean
  setOpen: (v: boolean) => void
}

const OPTIONS: AdminSortKey[] = [
  '-created_at',
  'created_at',
  '-updated_at',
  'updated_at',
]

const LABEL_MAP: Record<AdminSortKey, string> = {
  '-created_at': '지원일 최신순',
  created_at: '지원일 오래된순',
  '-updated_at': '수정일 최신순',
  updated_at: '수정일 오래된순',
  '-applied_at': '지원일 최신순',
  applied_at: '지원일 오래된순',
}

export const SortSelect = ({
  value,
  onChange,
  className,
  open,
  setOpen,
}: SortSelectProps) => {
  const header = LABEL_MAP[value]

  return (
    <div className={className}>
      <Accordion
        value={open ? '0' : ''}
        onValueChange={(v) => setOpen(v === '0')}
        selectedLabels={{ '0': header }}
      >
        <div title="정렬">
          <div className="absolute z-20 w-40 overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg">
            {OPTIONS.map((option) => {
              const selected = option === value
              return (
                <button
                  key={option}
                  onClick={() => {
                    onChange(option)
                    setOpen(false)
                  }}
                  className={[
                    'flex w-full items-center justify-between px-3 py-3 text-sm',
                    selected
                      ? 'bg-amber-100 font-medium text-gray-900'
                      : 'text-gray-700',
                    'transition-colors hover:bg-amber-100',
                  ].join(' ')}
                >
                  <span>{LABEL_MAP[option]}</span>
                </button>
              )
            })}
          </div>
        </div>
      </Accordion>
    </div>
  )
}
