import type { RecruitmentStatusApi } from '../../../types/recruitments'
import { useState } from 'react'
import { Accordion } from '../../Accordion/Accordion'

interface StatusSelectProps {
  value: RecruitmentStatusApi | '전체'
  onChange: (nextValue: RecruitmentStatusApi | '전체') => void
  className?: string
}

const OPTIONS: Array<RecruitmentStatusApi | '전체'> = ['전체', '모집중', '마감']

export const StatusSelect = ({
  value,
  onChange,
  className,
}: StatusSelectProps) => {
  const [open, setOpen] = useState('')
  const header = value === '전체' ? '전체 상태' : `${value}`
  return (
    <div className={className}>
      <Accordion
        value={open}
        onValueChange={setOpen}
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
                    setOpen('')
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
