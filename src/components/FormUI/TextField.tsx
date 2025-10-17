import { forwardRef } from 'react'
import type { InputHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../utils/cn'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  leftIcon?: ReactNode
  rightSlot?: ReactNode
}

export const TextField = forwardRef<HTMLInputElement, Props>(
  ({ id, className, leftIcon, rightSlot, ...props }, ref) => {
    return (
      <div className="relative">
        {leftIcon && (
          <span className="absolute top-1/2 left-3 -translate-y-1/2 text-neutral-400">
            {leftIcon}
          </span>
        )}
        <input
          id={id}
          ref={ref}
          className={cn(
            'h-11 w-full rounded-md border border-neutral-200 bg-white text-sm text-neutral-900',
            'transition outline-none placeholder:text-neutral-400',
            'focus:border-amber-500 focus:ring-2 focus:ring-amber-200',
            leftIcon ? 'pl-10' : 'pl-3',
            rightSlot ? 'pr-10' : 'pr-3',
            className
          )}
          {...props}
        />
        {rightSlot && (
          <span className="absolute inset-y-0 right-0 flex items-center pr-3">
            {rightSlot}
          </span>
        )}
      </div>
    )
  }
)
