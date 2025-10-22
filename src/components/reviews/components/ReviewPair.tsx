import type { ReactNode } from 'react'
import { cn } from '../../../utils/cn'
import { TextField } from '../../FormUI'

interface ReviewPairProps {
  label: string
  value?: ReactNode
  className?: string
  readOnly?: boolean
  multiline?: boolean // 여러 줄일 경우
  minHeightClass?: string
}

export const ReviewPair = ({
  label,
  value,
  className,
  readOnly = true,
  multiline = false, // 여러 줄일 경우
  minHeightClass = 'min-h-[96px]', // 최소 높이
}: ReviewPairProps) => {
  const isString = typeof value === 'string'

  return (
    <div className={cn('space-y-1.5', className)}>
      <p className="text-sm text-neutral-500">{label}</p>
      {multiline ? (
        <div
          className={cn(
            'rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2',
            'text-sm whitespace-pre-line text-neutral-800',
            'overflow-y-auto',
            minHeightClass
          )}
        >
          {isString ? (value as string) : (value ?? '-')}
        </div>
      ) : isString ? (
        <TextField
          value={value as string}
          readOnly={readOnly}
          className="h-11 bg-neutral-50 text-sm text-neutral-800"
        />
      ) : (
        <div
          className={cn(
            'h-11 rounded-md border border-neutral-200 bg-neutral-50 px-3',
            'text-sm text-neutral-800',
            'flex items-center'
          )}
        >
          {value ?? '-'}
        </div>
      )}
    </div>
  )
}
