import { create } from 'zustand'
import type { LucideIcon } from 'lucide-react'

export type ToastVariant = 'info' | 'success' | 'warning' | 'error'

export interface ToastProps {
  icon: LucideIcon
  title: string
  message: string
  className?: string
  variant: ToastVariant
}

export const toastVariantStyle: Record<ToastVariant, string> = {
  info: 'bg-[#EFF6FF] text-[#1E3A8A] border border-[#BFDBFE]',
  success: 'bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]',
  warning: 'bg-[#FFFBEB] text-[#92400E] border border-[#FDE68A]',
  error: 'bg-[#FEF2F2] text-[#991B1B] border border-[#FCA5A5]',
}

interface ToastStore {
  toasts: ToastProps[]
  showInfo: (
    icon: LucideIcon,
    title: string,
    message: string,
    className: string
  ) => void
  showSuccess: (
    icon: LucideIcon,
    title: string,
    message: string,
    className: string
  ) => void
  showWarning: (
    icon: LucideIcon,
    title: string,
    message: string,
    className: string
  ) => void
  showError: (
    icon: LucideIcon,
    title: string,
    message: string,
    className: string
  ) => void
  removeToast: (toast: ToastProps) => void
}

export const useToastStore = create<ToastStore>((set) => {
  const addToast = (
    icon: LucideIcon,
    title: string,
    message: string,
    className: string,
    variant: ToastVariant
  ) => {
    const newToast: ToastProps = { icon, title, message, className, variant }
    set((state) => ({ toasts: [...state.toasts, newToast] }))

    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t !== newToast) }))
    }, 3000)
  }

  return {
    toasts: [],
    showInfo: (icon, title, message, className) =>
      addToast(icon, title, message, className, 'info'),
    showSuccess: (icon, title, message, className) =>
      addToast(icon, title, message, className, 'success'),
    showWarning: (icon, title, message, className) =>
      addToast(icon, title, message, className, 'warning'),
    showError: (icon, title, message, className) =>
      addToast(icon, title, message, className, 'error'),
    removeToast: (toast) => {
      set((state) => ({ toasts: state.toasts.filter((t) => t !== toast) }))
    },
  }
})
