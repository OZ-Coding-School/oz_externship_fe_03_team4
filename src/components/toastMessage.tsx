import { useState } from 'react'
import type { ToastProps } from '../store/toastStore'

interface ToastItemProps {
  toast: ToastProps
  onClose: () => void
}
