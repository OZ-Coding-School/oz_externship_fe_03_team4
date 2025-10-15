import { forwardRef } from 'react'
import type { ButtonHTMLAttributes } from 'react'
import { AdminFormClassName } from '../../utils/AdminFormClassName'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  checked: boolean
}

export const Switch = forwardRef<HTMLButtonElement, Props>(
  ({ checked, className, ...props }, ref) => (
    <button
      ref={ref}
      role="switch"
      aria-checked={checked}
      className={AdminFormClassName(
        'inline-flex h-6 w-11 items-center rounded-full transition',
        checked ? 'bg-amber-500' : 'bg-neutral-300',
        className
      )}
      {...props}
    >
      <span
        className={AdminFormClassName(
          'block h-5 w-5 rounded-full bg-white transition-transform',
          checked ? 'translate-x-5' : 'translate-x-1'
        )}
      />
    </button>
  )
)
