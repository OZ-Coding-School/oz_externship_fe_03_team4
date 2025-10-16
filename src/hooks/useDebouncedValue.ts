import { useEffect, useRef, useState } from 'react'

export function useDebouncedValue<T>(value: T, delayMilliseconds = 250) {
  const [debouncedValue, setDebouncedValue] = useState(value)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    if (timerRef.current) window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(
      () => setDebouncedValue(value),
      Math.max(0, delayMilliseconds)
    ) as unknown as number

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
    }
  }, [value, delayMilliseconds])

  return debouncedValue
}
