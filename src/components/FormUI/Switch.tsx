import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  checked: boolean
}

export const Switch = forwardRef<HTMLButtonElement, Props>(
  ({ checked, className, ...props }, ref) => (
    <button
      ref={ref}
      role="switch"
      aria-checked={checked}
      className={cn(
        'inline-flex h-6 w-11 items-center rounded-full transition',
        checked ? 'bg-amber-500' : 'bg-neutral-300',
        className
      )}
      {...props}
    >
      <span
        className={cn(
          'block h-5 w-5 rounded-full bg-white transition-transform',
          checked ? 'translate-x-5' : 'translate-x-1'
        )}
      />
    </button>
  )
)

Switch.displayName = 'Switch'
