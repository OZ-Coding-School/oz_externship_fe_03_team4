import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { cn } from '../../../utils/cn'

interface TagsFilterProps {
  availableTags: string[]
  selectedTags: string[]
  onChange: (nextValue: string[]) => void
}

export const TagsFilter = ({
  availableTags,
  selectedTags,
  onChange,
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
    <div className="relative w-full sm:w-64">
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
    </div>
  )
}
