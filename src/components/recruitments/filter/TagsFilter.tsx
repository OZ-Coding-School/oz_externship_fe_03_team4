import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { cn } from '../../../utils/cn'

interface TagsFilterProps {
  availableTags: string[]
  selectedTags: string[]
  onChange: (nextValue: string[]) => void
  className?: string
  controlClassName?: string
}

export const TagsFilter = ({
  availableTags,
  selectedTags,
  onChange,
  className,
  controlClassName,
}: TagsFilterProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onChange(selectedTags.filter((t) => t !== tag))
    } else {
      onChange([...selectedTags, tag])
    }
  }

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          'flex w-full items-center justify-between rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm',
          'focus:ring-primary/50 hover:border-neutral-400 focus:ring-2 focus:outline-none'
        )}
      >
        <span className="truncate">
          {selectedTags.length > 0
            ? selectedTags.join(', ')
            : '태그로 필터링 (선택 가능)'}
        </span>
        <ChevronDown
          size={16}
          className={cn(
            'transition-transform duration-150',
            isOpen ? 'rotate-180' : 'rotate-0'
          )}
        />
      </button>

      {isOpen && (
        <div className={controlClassName}>
          <ul className="max-h-48 overflow-y-auto p-2">
            {availableTags.map((tag) => {
              const isActive = selectedTags.includes(tag)
              return (
                <li
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={cn(
                    'cursor-pointer rounded-md px-3 py-1 text-sm hover:bg-neutral-100',
                    isActive && 'bg-primary/10 text-primary font-medium'
                  )}
                >
                  {tag}
                </li>
              )
            })}
            {availableTags.length === 0 && (
              <li className="px-3 py-2 text-sm text-neutral-400">
                등록된 태그가 없습니다.
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}
