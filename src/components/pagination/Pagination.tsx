import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from 'lucide-react'
import { cn } from '../../utils/cn'
import { usePaginationNav } from './usePaginationNav'
import { Ellipsis } from './Ellipsis'
import { IconButton } from './IconButton'
import { PageButton } from './PageButton'

export type PaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  siblingCount?: number
  boundaryCount?: number
  showFirstLast?: boolean
  disabled?: boolean
  className?: string
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  boundaryCount = 1,
  showFirstLast = false,
  disabled = false,
  className,
}: PaginationProps) => {
  const { tokens, prevDisabled, nextDisabled, goto } = usePaginationNav({
    totalPages,
    currentPage,
    siblingCount,
    boundaryCount,
    disabled,
    onPageChange,
  })
  if (totalPages <= 0) return null

  const ARIA = {
    nav: '페이지 탐색',
    first: '첫 페이지로 이동',
    prev: '이전 페이지로 이동',
    next: '다음 페이지로 이동',
    last: '마지막 페이지로 이동',
  } as const

  return (
    <nav
      aria-label={ARIA.nav}
      className={cn('flex items-center gap-2 select-none', className)}
    >
      {showFirstLast && (
        <IconButton
          icon={<ChevronsLeft className="h-4 w-4" />}
          label={ARIA.first}
          disabled={prevDisabled}
          onClick={() => goto(1)}
        />
      )}

      <IconButton
        icon={<ChevronLeft className="h-4 w-4" />}
        label={ARIA.prev}
        disabled={prevDisabled}
        onClick={() => goto(currentPage - 1)}
      />

      {tokens.map((t, i) =>
        t.type === 'ellipsis' ? (
          <Ellipsis key={`${t}-${i}`} />
        ) : (
          <PageButton
            key={`p-${t.page}`}
            page={t.page}
            active={t.page === currentPage}
            onClick={() => goto(t.page)}
          />
        )
      )}

      <IconButton
        icon={<ChevronRight className="h-4 w-4" />}
        label={ARIA.next}
        disabled={nextDisabled}
        onClick={() => goto(currentPage + 1)}
      />

      {showFirstLast && (
        <IconButton
          icon={<ChevronsRight className="h-4 w-4" />}
          label={ARIA.last}
          disabled={nextDisabled}
          onClick={() => goto(totalPages)}
        />
      )}
    </nav>
  )
}
