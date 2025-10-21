import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  showValue?: boolean
}

export const Slider = forwardRef<HTMLInputElement, Props>(
  ({ className, showValue, value, ...props }, ref) => (
    <div className="w-full">
      <input
        ref={ref}
        type="range"
        className={cn(
          'h-2 w-full appearance-none rounded-full bg-neutral-200 outline-none',
          '[&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none',
          '[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber-500',
          '[&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-amber-500',
          className
        )}
        value={value}
        {...props}
      />
      {showValue && (
        <p className="mt-1 text-xs text-neutral-500">값: {value}</p>
      )}
    </div>
  )
)

Slider.displayName = 'Slider'
