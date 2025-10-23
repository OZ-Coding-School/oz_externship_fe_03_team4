import { ImageIcon } from 'lucide-react'
import { useState } from 'react'

type LectureThumbnailProps = {
  src: string
  alt: string
}

export const LectureThumbnail = ({ src, alt }: LectureThumbnailProps) => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  if (!src || hasError) {
    return (
      <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gray-100">
        <ImageIcon className="h-6 w-6 text-gray-400" />
      </div>
    )
  }

  return (
    <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-lg bg-gray-100">
      {isLoading && (
        <div className="absolute inset-0 animate-pulse bg-gray-200" />
      )}

      <img
        src={src}
        alt={alt}
        className={`h-full w-full object-cover transition-opacity duration-200 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false)
          setHasError(true)
        }}
      />
    </div>
  )
}
