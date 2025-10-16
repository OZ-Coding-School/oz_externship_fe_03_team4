import type { ReactNode } from 'react'
import { cn } from '../../utils/cn'

type Props = {
  id: string
  label?: ReactNode
  hint?: ReactNode
  error?: ReactNode
  className?: string
  children: ReactNode
}

export const FormField = ({
  id,
  label,
  hint,
  error,
  className,
  children,
}: Props) => {
  return (
    <div className={cn('w-full space-y-1.5', className)}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-neutral-800"
        >
          {label}
        </label>
      )}
      {children}
      <div className="min-h-[18px]">
        {error ? (
          <p className="text-xs text-red-600" role="alert">
            {error}
          </p>
        ) : hint ? (
          <p className="text-xs text-neutral-500">{hint}</p>
        ) : null}
      </div>
    </div>
  )
}
