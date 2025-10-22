import type { ReactNode } from 'react'
import { cn } from '../../../utils/cn'
import { TextField } from '../../FormUI'

interface ReviewPairProps {
  label: string
  value?: ReactNode
  className?: string
  readOnly?: boolean
}

export const ReviewPair = ({
  label,
  value,
  className,
  readOnly = true,
}: ReviewPairProps) => {
  return (
    <div className={cn('space-y-1.5', className)}>
      <p className="text-sm text-neutral-500">{label}</p>
      {typeof value === 'string' ? (
        <TextField
          value={value}
          readOnly={readOnly}
          className="rounded-md bg-neutral-50 text-neutral-800"
        />
      ) : (
        <div className="rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2 text-neutral-800">
          {value ?? '-'}
        </div>
      )}
    </div>
  )
}
