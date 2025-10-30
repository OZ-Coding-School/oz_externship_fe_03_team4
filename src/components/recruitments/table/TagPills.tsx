interface TagPillsProps {
  tags: string[]
  max?: number // 한 행에 표시할 최대 개수를 지정함
}

export const TagPills = ({ tags, max = 3 }: TagPillsProps) => {
  const shown = tags.slice(0, max)
  const rest = tags.length - shown.length

  return (
    <div className="flex flex-wrap gap-1.5">
      {shown.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-[11px] font-medium text-neutral-700"
        >
          {tag}
        </span>
      ))}
      {rest > 0 && (
        <span className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-[11px] font-medium text-neutral-600">
          +{rest}
        </span>
      )}
    </div>
  )
}
