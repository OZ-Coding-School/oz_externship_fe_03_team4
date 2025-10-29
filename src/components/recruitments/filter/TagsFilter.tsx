import { ChevronDown } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
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
  const rootRef = useRef<HTMLDivElement>(null)

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onChange(selectedTags.filter((t) => t !== tag))
    } else {
      onChange([...selectedTags, tag])
    }
  }

  useEffect(() => {
    if (!isOpen) return
    const onClick = (e: MouseEvent) => {
      if (!rootRef.current) return
      if (!rootRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    window.addEventListener('mousedown', onClick)
    return () => window.removeEventListener('mousedown', onClick)
  }, [isOpen])

  return (
    <div ref={rootRef} className={cn('relative inline-block w-64', className)}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          'flex h-11 w-48 items-center justify-between px-3 text-sm',
          'rounded-lg border border-neutral-200 bg-white',
          'focus:ring-primary/50 hover:border-neutral-400 focus:ring-2'
        )}
      >
        <span className="truncate">
          {selectedTags.length > 0
            ? selectedTags.join(', ')
            : '태그를 선택하세요.'}
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
        <div
          className={cn(
            'absolute right-0 left-0 z-20 mt-2 rounded-md border border-neutral-200 bg-white shadow-lg',
            controlClassName
          )}
        >
          <ul className="scrollbar-hide max-h-48 overflow-y-auto p-2">
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
