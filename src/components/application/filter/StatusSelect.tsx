import type { StatusFilter } from '../../../types/applications'
import { Accordion } from '../../Accordion/Accordion'

interface StatusSelectProps {
  value: StatusFilter
  onChange: (v: StatusFilter) => void
  open: boolean
  setOpen: (v: boolean) => void
  className?: string
}

const OPTIONS: StatusFilter[] = ['전체', '승인', '검토중', '대기', '거절']

export const StatusSelect = ({
  value,
  onChange,
  className,
  open,
  setOpen,
}: StatusSelectProps) => {
  const header = value === '전체' ? '전체 상태' : value
  return (
    <div className={className}>
      <Accordion
        value={open ? '0' : ''}
        onValueChange={(v) => setOpen(v === '0')}
        selectedLabels={{ '0': header }}
      >
        <div title="상태">
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
                  <span>{option === '전체' ? '전체 상태' : option}</span>
                </button>
              )
            })}
          </div>
        </div>
      </Accordion>
    </div>
  )
}
