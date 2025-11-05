import type { ReactNode } from 'react'
import { cn } from '../../utils/cn'
import { TextField } from '../FormUI'

interface ModalPairProps {
  label: string
  value?: ReactNode
  className?: string
  valueClassName?: string
  readOnly?: boolean
  multiline?: boolean // 여러 줄일 경우
  minHeightClass?: string
  noBorder?: boolean // 테투리 없는 스타일
}

export const ModalPair = ({
  label,
  value,
  className,
  valueClassName,
  readOnly = true,
  multiline = false, // 여러 줄일 경우
  minHeightClass = 'min-h-[96px]', // 최소 높이
  noBorder = false,
}: ModalPairProps) => {
  const isString = typeof value === 'string'

  // noBorder가 true일 때
  if (noBorder) {
    return (
      <div className={cn('space-y-1', className)}>
        <p className="text-sm text-gray-600">{label}</p>
        {isString ? (
          <p className="text-sm text-gray-800">{value as string}</p>
        ) : (
          <div className="text-sm text-gray-800">{value ?? '-'}</div>
        )}
      </div>
    )
  }

  return (
    <div className={cn('space-y-1.5', className)}>
      <p className="text-sm text-neutral-500">{label}</p>
      {multiline ? (
        <div
          className={cn(
            'rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2',
            'text-sm whitespace-pre-line text-neutral-800',
            'overflow-y-auto',
            minHeightClass,
            valueClassName
          )}
        >
          {isString ? (value as string) : (value ?? '-')}
        </div>
      ) : isString ? (
        <TextField
          value={value as string}
          readOnly={readOnly}
          className={cn(
            'h-11 bg-neutral-50 text-sm text-neutral-800',
            valueClassName
          )}
        />
      ) : (
        <div
          className={cn(
            'h-11 rounded-md border border-neutral-200 bg-neutral-50 px-3',
            'text-sm text-neutral-800',
            'flex items-center',
            valueClassName
          )}
        >
          {value ?? '-'}
        </div>
      )}
    </div>
  )
}
