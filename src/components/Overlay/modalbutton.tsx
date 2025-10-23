import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface ModalButtonProps {
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
}

const ModalButton = ({ 
  children, 
  onClick, 
  disabled = false,
  className
}: ModalButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "h-[36px] px-4 py-2 rounded-lg font-medium transition",
        "bg-blue-600 text-white hover:bg-blue-700",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
    >
      {children}
    </button>
  )
}

export default ModalButton