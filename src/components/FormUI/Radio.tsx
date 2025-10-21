import React, { type InputHTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label?: React.ReactNode
}

export const Radio = ({ id, label, className, ...props }: RadioProps) => {
  return (
    <label
      htmlFor={id}
      className="inline-flex cursor-pointer items-center gap-2"
    >
      <input
        id={id}
        type="radio"
        className={cn('h-4 w-4 text-amber-600 focus:ring-amber-200', className)}
        {...props}
      />
      {label && <span className="text-sm text-neutral-800">{label}</span>}
    </label>
  )
}
