import { forwardRef } from 'react'
import type { InputHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../utils/cn'

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label?: ReactNode
}

export const Checkbox = forwardRef<HTMLInputElement, Props>(
  ({ className, label, id, ...props }, ref) => (
    <label
      htmlFor={id}
      className="inline-flex cursor-pointer items-center gap-2"
    >
      <input
        id={id}
        ref={ref}
        type="checkbox"
        className={cn(
          'h-4 w-4 rounded border-neutral-300 text-amber-600 focus:ring-amber-200',
          className
        )}
        {...props}
      />
      {label && <span className="text-sm text-neutral-800">{label}</span>}
    </label>
  )
)
