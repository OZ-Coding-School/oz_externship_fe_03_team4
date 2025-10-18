import type { ReactNode } from 'react';

interface ModalButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export default function ModalButton({ 
  children, 
  onClick, 
  disabled = false
}: ModalButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        h-[36px] px-4 py-2 rounded-lg font-medium transition
        bg-[#2563EB] text-[#FFFFFF]
        hover:bg-[#1d4ed8]
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
    >
      {children}
    </button>
  );
}