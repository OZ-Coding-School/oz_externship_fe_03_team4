import { cn } from '../../../utils/cn'

interface TagPillsProps {
  tags: string[]
  max?: number // 한 행에 표시할 최대 개수를 지정함
  className?: string
  pillClassName?: string
  emptyFallback?: React.ReactNode
}

export const TagPills = ({
  tags,
  max = 3,
  className = '',
  pillClassName = '',
}: TagPillsProps) => {
  const shown = tags.slice(0, max)
  const rest = tags.length - shown.length

  return (
    <div className={`flex flex-wrap gap-1.5 ${className}`}>
      {shown.map((tag) => (
        <span
          key={tag}
          className={cn(
            'inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-[11px] font-medium text-neutral-700',
            pillClassName
          )}
        >
          {tag}
        </span>
      ))}
      {rest > 0 && (
        <span
          className={`inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-[11px] font-medium text-neutral-600 ${pillClassName}`}
        >
          +{rest}
        </span>
      )}
    </div>
  )
}
