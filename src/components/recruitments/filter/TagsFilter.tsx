import { ChevronDown } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { cn } from '../../../utils/cn'
import Modal from '../../../components/modal/Modal'
import { ModalHeader } from '../../../components/modal/ModalHeader'
import { CloseModalFooter } from '../../../components/modal/CloseModalFooter'
import { SearchInput } from '../../../components/search/SearchInput'

interface TagsFilterProps {
  availableTags: string[]
  selectedTags: string[]
  onChange: (nextValue: string[]) => void
  className?: string
  controlClassName?: string
}

const CheckMark = () => (
  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-yellow-500 text-white text-[10px]">
    ✓
  </span>
)

const TagButton = ({ 
  tag, 
  isActive, 
  onClick, 
  size = 'small' 
}: { 
  tag: string
  isActive: boolean
  onClick: () => void
  size?: 'small' | 'medium'
}) => {
  const sizeClasses = size === 'small' ? 'h-8 text-xs' : 'h-9 text-sm'
  
  return (
    <button
      onClick={onClick}
      className={cn(
        'relative cursor-pointer rounded-md border transition-all flex items-center justify-center px-2',
        sizeClasses,
        isActive
          ? 'border-yellow-400 bg-yellow-100 text-yellow-800 font-medium shadow-sm'
          : 'border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100'
      )}
    >
      {tag}
      {isActive && <CheckMark />}
    </button>
  )
}

const SelectedTag = ({ tag, onRemove }: { tag: string; onRemove: () => void }) => (
  <span
    onClick={onRemove}
    className="flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-800 cursor-pointer hover:bg-yellow-200"
  >
    {tag} ✕
  </span>
)

export const TagsFilter = ({
  availableTags,
  selectedTags,
  onChange,
  className,
  controlClassName,
}: TagsFilterProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [tempTags, setTempTags] = useState<string[]>(selectedTags)
  const [searchValue, setSearchValue] = useState('')
  const rootRef = useRef<HTMLDivElement>(null)

  const toggleTag = (tag: string) => {
    const isSelected = selectedTags.includes(tag)
    onChange(isSelected ? selectedTags.filter((t) => t !== tag) : [...selectedTags, tag])
  }

  const toggleTempTag = (tag: string) => {
    const isSelected = tempTags.includes(tag)
    setTempTags(isSelected ? tempTags.filter((t) => t !== tag) : [...tempTags, tag])
  }

  const openModal = () => {
    setTempTags(selectedTags)
    setIsModalOpen(true)
    setIsOpen(false)
  }

  const applyTags = () => {
    onChange(tempTags)
    setIsModalOpen(false)
  }

  const filteredTags = availableTags.filter((tag) =>
    tag.toLowerCase().includes(searchValue.toLowerCase())
  )

  const visibleTags = filteredTags.slice(0, 8)
  const hasMoreTags = availableTags.length > 8

  useEffect(() => {
    if (!isOpen) return
    const handleClickOutside = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setIsOpen(false)
    }
    window.addEventListener('mousedown', handleClickOutside)
    return () => window.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  return (
    <>
      <div ref={rootRef} className={cn('relative inline-block w-64', className)}>
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex h-11 w-48 items-center justify-between px-3 text-sm rounded-lg border border-neutral-200 bg-white focus:ring-primary/50 hover:border-neutral-400 focus:ring-2"
        >
          <span className="truncate">
            {selectedTags.length > 0 ? selectedTags.join(', ') : '태그를 선택하세요.'}
          </span>
          <ChevronDown size={16} className={cn('transition-transform', isOpen && 'rotate-180')} />
        </button>

        {isOpen && (
          <div className={cn('absolute left-0 z-20 mt-2 w-48 rounded-md border border-neutral-200 bg-white shadow-lg', controlClassName)}>
            <ul className="grid max-h-48 grid-cols-3 gap-2 overflow-y-auto p-2">
              {visibleTags.map((tag) => (
                <li key={tag}>
                  <TagButton tag={tag} isActive={selectedTags.includes(tag)} onClick={() => toggleTag(tag)} />
                </li>
              ))}
              {hasMoreTags && (
                <li
                  onClick={openModal}
                  className="col-span-3 mt-1 h-8 cursor-pointer rounded-md border border-gray-300 bg-gray-50 text-xs text-gray-700 hover:bg-gray-100 flex items-center justify-center"
                >
                  + 더보기
                </li>
              )}
              {visibleTags.length === 0 && (
                <li className="col-span-3 px-3 py-2 text-sm text-neutral-400">등록된 태그가 없습니다.</li>
              )}
            </ul>
          </div>
        )}
      </div>

      <Modal isOn={isModalOpen}>
        <ModalHeader title="태그 필터 선택" onClose={() => setIsModalOpen(false)} />
        
        <div className="min-w-[700px] max-w-[700px]">
          <SearchInput placeholder="태그 검색" value={searchValue} onChangeText={setSearchValue} className="mb-4" />
          
          <div className="flex items-center justify-between mb-4">
            {tempTags.length > 0 ? (
              <>
                <div className="flex flex-wrap gap-2">
                  {tempTags.map((tag) => (
                    <SelectedTag key={tag} tag={tag} onRemove={() => toggleTempTag(tag)} />
                  ))}
                </div>
                <button onClick={() => setTempTags([])} className="text-xs text-gray-500 underline hover:text-gray-700 whitespace-nowrap ml-2">
                  전체 해제
                </button>
              </>
            ) : (
              <div className="h-8"></div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-3 max-h-[450px] overflow-y-auto">
            {filteredTags.map((tag) => (
              <TagButton
                key={tag}
                tag={tag}
                size="medium"
                isActive={tempTags.includes(tag)}
                onClick={() => toggleTempTag(tag)}
              />
            ))}
            {filteredTags.length === 0 && (
              <p className="col-span-3 py-4 text-center text-gray-400 text-sm">검색 결과가 없습니다.</p>
            )}
          </div>
        </div>

        <CloseModalFooter
          onClose={() => setIsModalOpen(false)}
          onConfirm={applyTags}
          confirmLabel="적용하기"
          confirmMode
        />
      </Modal>
    </>
  )
}