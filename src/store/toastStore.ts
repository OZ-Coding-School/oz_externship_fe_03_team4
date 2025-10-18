import { create } from 'zustand'
import { toastVariantStyle, type ToastVariant } from '../constants/toastStyle'
import { type LucideIcon } from 'lucide-react'

export interface ToastProps {
  icon: LucideIcon
  title: string
  message: string
  variant: ToastVariant
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
