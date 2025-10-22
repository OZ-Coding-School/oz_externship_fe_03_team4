import type { ReactNode } from 'react'
import { cn } from '../../../utils/cn'

interface ReviewPairProps {
  label: string
  value?: ReactNode
  className?: string
  stacked?: boolean
}

export const ReviewPair = ({
  label,
  value,
  className,
  stacked = true,
}: ReviewPairProps) => {
  return (
    <div
      className={cn(
        stacked ? 'flex flex-col' : 'flex items-center justify-between',
        className
      )}
    >
      <p className="text-neutral text-sm">{label}</p>
      <p className="font-medium text-neutral-900">{value ?? '-'}</p>
    </div>
  )
}
