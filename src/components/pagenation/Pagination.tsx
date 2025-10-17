import { useMemo } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '../buttons/Buttons'
import { cn } from '../../utils/cn'
import { buildPageTokens, ELLIPSIS, PageToken } from '../../utils/pagination'

/**
 * Pagination Props
 *
 * - `currentPage`: 현재 페이지 번호
 * - `totalPages`: 전체 페이지 수
 * - `onPageChange`: 페이지 변경 시 콜백
 * - `siblingCount`: 현재 페이지 주변 표시 개수
 * - `boundaryCount`: 처음/끝 표시 개수
 * - `showFirstLast`: 첫/마지막 이동 버튼 표시 여부
 * - `disabled`: 전체 비활성화 여부
 * - `className`: 추가 클래스명
 */
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

/** 내부 토큰 타입 */
// const ELLIPSIS = '…'

// type PageToken = number | typeof ELLIPSIS

/**
 * 페이지 토큰 빌더
 * - 1 ... [siblings around current] ... total
 * - boundaryCount 로 시작/끝 고정 개수를 제어
 */
// function buildPageTokens(
//   totalPages: number,
//   currentPage: number,
//   siblingCount = 1,
//   boundaryCount = 1
// ): PageToken[] {
//   const tokens: PageToken[] = []

//   if (totalPages <= 0) return tokens

//   const startPages = range(1, Math.min(boundaryCount, totalPages))
//   const endPages = range(
//     Math.max(totalPages - boundaryCount + 1, boundaryCount + 1),
//     totalPages
//   )

//   const leftSibling = Math.max(
//     Math.min(currentPage - siblingCount, totalPages),
//     boundaryCount + 1
//   )
//   const rightSibling = Math.min(
//     Math.max(currentPage + siblingCount, 1),
//     Math.max(totalPages - boundaryCount, boundaryCount)
//   )

//   // merge
//   tokens.push(...startPages)

//   // left ellipsis
//   if (leftSibling > boundaryCount + 1) {
//     tokens.push(ELLIPSIS)
//   }

//   // middle window
//   for (let p = leftSibling; p <= rightSibling; p++) {
//     if (p >= 1 && p <= totalPages) tokens.push(p)
//   }

//   // right ellipsis
//   if (rightSibling < totalPages - boundaryCount) {
//     tokens.push(ELLIPSIS)
//   }

//   // end pages
//   for (const p of endPages) {
//     if (!tokens.includes(p)) tokens.push(p)
//   }

//   // de-dup + sorted by appearance already
//   return tokens
// }

// function range(start: number, end: number): number[] {
//   if (end < start) return []
//   return Array.from({ length: end - start + 1 }, (_, i) => start + i)
// }

/**
 * 페이지 네비게이션 컴포넌트
 */
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
  const tokens = useMemo(
    () => buildPageTokens(totalPages, currentPage, siblingCount, boundaryCount),
    [totalPages, currentPage, siblingCount, boundaryCount]
  )

  const canPrev = currentPage > 1
  const canNext = currentPage < totalPages

  const goto = (page: number) => {
    if (disabled) return
    const clamped = Math.max(1, Math.min(totalPages, page))
    if (clamped !== currentPage) onPageChange(clamped)
  }

  if (totalPages <= 0) return null

  return (
    <nav
      aria-label="Pagination"
      className={cn(
        'flex items-center gap-2 select-none',
        // 필요 시 여기에 컨테이너 스타일을 추가하세요
        className
      )}
    >
      {showFirstLast && (
        <Button
          size="medium"
          color="secondary"
          customTextColor="#000000"
          customHeight={34}
          leftIcon={<ChevronLeft className="h-4 w-4" />}
          aria-label="Go to first page"
          disabled={!canPrev || disabled}
          onClick={() => goto(1)}
        >
          {/* visually hidden text for icon-only is handled via aria-label */}
          First
        </Button>
      )}

      <Button
        size="medium"
        color="secondary"
        iconOnly
        leftIcon={<ChevronLeft className="h-4 w-4" />}
        aria-label="Go to previous page"
        disabled={!canPrev || disabled}
        onClick={() => goto(currentPage - 1)}
      />

      {tokens.map((t, i) =>
        t === ELLIPSIS ? (
          <span key={`e-${i}`} className="text-foreground/60 px-2">
            {ELLIPSIS}
          </span>
        ) : (
          <Button
            key={t}
            size="medium"
            color={t === currentPage ? 'primary' : 'secondary'}
            customTextColor={t === currentPage ? '' : '#000000'}
            customHeight={40}
            aria-current={t === currentPage ? 'page' : undefined}
            onClick={() => goto(t)}
          >
            {t}
          </Button>
        )
      )}

      <Button
        size="medium"
        color="secondary"
        customTextColor="#000000"
        customHeight={34}
        iconOnly
        leftIcon={<ChevronRight className="h-4 w-4" />}
        aria-label="Go to next page"
        disabled={!canNext || disabled}
        onClick={() => goto(currentPage + 1)}
      />

      {showFirstLast && (
        <Button
          size="medium"
          color="secondary"
          customTextColor="#000000"
          customHeight={34}
          rightIcon={<ChevronRight className="h-4 w-4" />}
          aria-label="Go to last page"
          disabled={!canNext || disabled}
          onClick={() => goto(totalPages)}
        >
          Last
        </Button>
      )}
    </nav>
  )
}
