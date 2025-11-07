import { useEffect } from 'react'

export const useBodyScrollLock = (isScrollLocked: boolean): void => {
  useEffect(() => {
    if (!isScrollLocked) return

    const previousBodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousBodyOverflow
    }
  }, [isScrollLocked])
}
