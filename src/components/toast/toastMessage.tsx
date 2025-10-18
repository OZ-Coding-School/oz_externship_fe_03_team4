import { useEffect, useState } from 'react'
import { toastVariantStyle } from '../../constants/toastStyle'
import type { ToastProps } from '../../store/toastStore'

interface ToastItemProps extends ToastProps {
  onClose: (toast: ToastProps) => void
}

export const Toast = ({
  icon: Icon,
  title,
  message,
  variant,
  onClose,
}: ToastItemProps) => {
  const style = toastVariantStyle[variant]
  const [progress, setProgress] = useState(100)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(interval)
          return 0
        }
        return prev - 100 / 30
      })
    }, 100)

    const timer = setTimeout(() => {
      onClose({
        icon: Icon,
        title,
        message,
        variant,
      })
    }, 3000)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [Icon, title, message, variant, onClose])

  const progressBarColor = {
    info: 'bg-[#2563EB]',
    success: 'bg-[#16A34A]',
    warning: 'bg-[#CA8A04]',
    error: 'bg-[#DC2626]',
  }

  return (
    <div
      className={`${style.container} flex w-full flex-col overflow-hidden rounded-lg p-3`}
    >
      <div className="flex items-center gap-2">
        <Icon className={`h-4 w-4 flex-shrink-0 ${style.iconColor}`} />
        <div className="flex flex-col">
          <p className={`${style.title}`}>{title}</p>
          <p className={`${style.message}`}>{message}</p>
        </div>
      </div>

      <div className="-mx-3 mt-2 -mb-3 h-1 bg-black/10">
        <div
          className={`h-full ${progressBarColor[variant]} transition-all duration-100`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
