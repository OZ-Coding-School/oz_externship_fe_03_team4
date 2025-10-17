import {
  Info,
  Check,
  AlertTriangle,
  XCircle,
  type LucideIcon,
} from 'lucide-react'

export type ToastVariant = 'info' | 'success' | 'warning' | 'error'

const TOAST_STYLE = {
  Container: 'rounded-[8px] p-3',
  title: 'font-semibold text-[12px]',
  message: 'text-[12px]',
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
    container: `bg-[#EFF6FF] border border-[#BFDBFE] ${TOAST_STYLE.Container}`,
    title: `text-[#1E40AF] ${TOAST_STYLE.title}`,
    message: `text-[#1D4ED8] ${TOAST_STYLE.message}`,
    icon: Info,
    iconColor: 'text-[#2563EB]',
  },
  success: {
    container: `bg-[#F0FDF4] border border-[#BBF7D0] ${TOAST_STYLE.Container}`,
    title: `text-[#166534] ${TOAST_STYLE.title}`,
    message: `text-[#15803D] ${TOAST_STYLE.message}`,
    icon: Check,
    iconColor: 'text-[#16A34A]',
  },
  warning: {
    container: `bg-[#FEFCE8] border border-[#FEF08A] ${TOAST_STYLE.Container}`,
    title: `text-[#854D0E] ${TOAST_STYLE.title}`,
    message: `text-[#A16207] ${TOAST_STYLE.message}`,
    icon: AlertTriangle,
    iconColor: 'text-[#CA8A04]',
  },
  error: {
    container: `bg-[#FEF2F2] border border-[#FECACA] ${TOAST_STYLE.Container}`,
    title: `text-[#991B1B] ${TOAST_STYLE.title}`,
    message: `text-[#B91C1C] ${TOAST_STYLE.message}`,
    icon: XCircle,
    iconColor: 'text-[#DC2626]',
  },
}
