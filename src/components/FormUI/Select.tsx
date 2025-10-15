import { forwardRef } from 'react'
import type { SelectHTMLAttributes } from 'react'
import { AdminFormClassName } from '../../utils/AdminFormClassName'

type Props = SelectHTMLAttributes<HTMLSelectElement>

export const Select = forwardRef<HTMLSelectElement, Props>(
  ({ className, children, ...props }, ref) => (
    <select
      ref={ref}
      className={AdminFormClassName(
        'h-11 w-full rounded-md border border-neutral-200 bg-white pr-9 pl-3 text-sm',
        'appearance-none transition outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200',
        `bg-[url("data:image/svg+xml;utf8,<svg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill='%23666'><path d='M5.25 7.5L10 12.25 14.75 7.5'/></svg>")] bg-[length:18px_18px] bg-[right_10px_center] bg-no-repeat`,
        className
      )}
      {...props}
    >
      {children}
    </select>
  )
)
