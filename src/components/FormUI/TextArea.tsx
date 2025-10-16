import { forwardRef } from 'react'
import type { TextareaHTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

type Props = TextareaHTMLAttributes<HTMLTextAreaElement>

export const TextArea = forwardRef<HTMLTextAreaElement, Props>(
  ({ className, rows = 4, ...props }, ref) => (
    <textarea
      ref={ref}
      rows={rows}
      className={cn(
        'w-full rounded-md border border-neutral-200 bg-white text-sm text-neutral-900',
        'transition outline-none placeholder:text-neutral-400',
        'p-3 focus:border-amber-500 focus:ring-2 focus:ring-amber-200',
        className
      )}
      {...props}
    />
  )
)
