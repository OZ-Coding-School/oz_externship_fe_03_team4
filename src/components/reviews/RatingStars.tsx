// 별별

import { Star } from 'lucide-react'

type RatingStarsProps = {
  value: number
  max?: number
  size?: number
}

export const RatingStars = ({
  value,
  max = 5,
  size = 18,
}: RatingStarsProps) => {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, index) => {
        const isFilled = index < value
        return (
          <Star
            key={index}
            size={size}
            className={
              isFilled ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'
            }
          />
        )
      })}
    </div>
  )
}
