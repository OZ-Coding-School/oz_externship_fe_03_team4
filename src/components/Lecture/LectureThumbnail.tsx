type LectureThumbnailProps = {
  src: string
  alt: string
}

export const LectureThumbnail = ({ src, alt }: LectureThumbnailProps) => {
  return (
    <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-lg bg-gray-100">
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        onError={(e) => {
          e.currentTarget.style.display = 'none'
        }}
      />
    </div>
  )
}
