import { create } from 'zustand'
import {
  Info,
  Check,
  AlertTriangle,
  XCircle,
  type LucideIcon,
} from 'lucide-react'

export type ToastVariant = 'info' | 'success' | 'warning' | 'error'

export interface ToastProps {
  icon: LucideIcon
  title: string
  message: string
  variant: ToastVariant
}

export const toastVariantStyle: Record<
  ToastVariant,
  {
    container: string
    title: string
    message: string
    icon: LucideIcon
    iconColor: string
  }
> = {
  info: {
    container: 'bg-[#EFF6FF] border border-[#BFDBFE] rounded-[8px]',
    title: 'text-[#1E40AF] font-semibold text-[12px]',
    message: 'text-[#1D4ED8] text-[12px]',
    icon: Info,
    iconColor: 'text-[#2563EB]',
  },
  success: {
    container: 'bg-[#F0FDF4] border border-[#BBF7D0] rounded-[8px]',
    title: 'text-[#166534] font-semibold text-[12px]',
    message: 'text-[#15803D] text-[12px]',
    icon: Check,
    iconColor: 'text-[#16A34A]',
  },
  warning: {
    container: 'bg-[#FEFCE8] border border-[#FEF08A] rounded-[8px]',
    title: 'text-[#854D0E] font-semibold text-[12px]',
    message: 'text-[#A16207] text-[12px]',
    icon: AlertTriangle,
    iconColor: 'text-[#CA8A04]',
  },
  error: {
    container: 'bg-[#FEF2F2] border border-[#FECACA] rounded-[8px]',
    title: 'text-[#991B1B] font-semibold text-[12px]',
    message: 'text-[#B91C1C] text-[12px]',
    icon: XCircle,
    iconColor: 'text-[#DC2626]',
  },
}

interface ToastStore {
  toasts: ToastProps[]
  showSuccess: (title: string, message: string) => void
  showError: (title: string, message: string) => void
  showWarning: (title: string, message: string) => void
  showInfo: (title: string, message: string) => void
  removeToast: (toast: ToastProps) => void
}

export const useToastStore = create<ToastStore>((set) => {
  const addToast = (variant: ToastVariant, title: string, message: string) => {
    const { icon } = toastVariantStyle[variant]
    const newToast: ToastProps = { icon, title, message, variant }

    set((state) => ({ toasts: [...state.toasts, newToast] }))

    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t !== newToast) }))
    }, 3000)
  }

  return {
    toasts: [],
    showSuccess: (title, message) => addToast('success', title, message),
    showError: (title, message) => addToast('error', title, message),
    showWarning: (title, message) => addToast('warning', title, message),
    showInfo: (title, message) => addToast('info', title, message),
    removeToast: (toast) =>
      set((state) => ({
        toasts: state.toasts.filter((t) => t !== toast),
      })),
  }
})
