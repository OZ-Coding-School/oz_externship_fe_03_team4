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
            'absolute left-0 z-20 mt-2 w-48 rounded-md border border-neutral-200 bg-white shadow-lg',
            controlClassName
          )}
        >
          <ul className="scrollbar-hide scrollbar-hide grid max-h-48 grid-cols-2 gap-2 overflow-y-auto p-2">
            {availableTags.map((tag) => {
              const isActive = selectedTags.includes(tag)
              return (
                <li
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={cn(
                    'h-8 w-full cursor-pointer rounded-full border text-xs transition-all duration-150',
                    'flex items-center justify-center px-2 text-center',
                    isActive
                      ? 'scale-[1.03] border-gray-900 bg-gray-900 text-white shadow-sm'
                      : 'border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100'
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
