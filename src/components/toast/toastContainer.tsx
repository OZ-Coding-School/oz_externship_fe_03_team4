import { useToastStore } from '../../store/toastStore'
import { Toast } from './toastMessage'

export const ToastContainer = () => {
  const toasts = useToastStore((state) => state.toasts)
  const removeToast = useToastStore((state) => state.removeToast)

  return (
    <div className="pointer-events-none fixed top-4 right-1 z-50 flex justify-end pr-4">
      <div className="pointer-events-none flex h-auto w-[320px] flex-col gap-2">
        {toasts.map((toast) => (
          <Toast
            key={`${toast.title}-${toast.message}-${toast.variant}`}
            {...toast}
            onClose={removeToast}
          />
        ))}
      </div>
    </div>
  )
}
