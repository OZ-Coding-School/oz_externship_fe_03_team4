import { toastVariantStyle, type ToastProps } from '../store/toastStore'

interface ToastItemProps extends ToastProps {
  onClose: (toast: ToastProps) => void
}

export const Toast = ({
  icon: Icon,
  title,
  message,
  className = '',
  variant,
}: ToastItemProps) => {
  const style = toastVariantStyle[variant]

  return (
    <div
      className={`${style.container} animate-in fade-in slide-in-from-top-2 flex h-[74px] w-[1072px] items-start gap-[12px] p-[17px] ${className}}`}
    >
      <Icon className={`mt-0.5 h-5 w-5 flex-shrink-0 ${style.iconColor}`} />
      <div className="flex flex-col">
        <p className={style.title}>{title}</p>
        <p className={style.message}>{message}</p>
      </div>
    </div>
  )
}
