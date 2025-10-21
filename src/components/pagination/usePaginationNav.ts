import { useMemo } from 'react'
import { buildPageItems, ELLIPSIS } from '../../utils/pagination'

export type NavItem =
  | { type: 'page'; page: number; key: string }
  | { type: 'ellipsis'; key: string }

export const usePaginationNav = ({
  totalPages,
  currentPage,
  siblingCount = 1,
  boundaryCount = 1,
  disabled = false,
  onPageChange,
}: {
  totalPages: number
  currentPage: number
  siblingCount?: number
  boundaryCount?: number
  disabled?: boolean
  onPageChange: (page: number) => void
}) => {
  const items = useMemo<NavItem[]>(() => {
    const raw = buildPageItems(
      totalPages,
      currentPage,
      siblingCount,
      boundaryCount
    )
    return raw.map((pageOrEllipsis, idx) =>
      pageOrEllipsis === ELLIPSIS
        ? { type: 'ellipsis', key: `ellipsis:${idx}` }
        : {
            type: 'page',
            page: pageOrEllipsis as number,
            key: `page:${pageOrEllipsis}`,
          }
    )
  }, [totalPages, currentPage, siblingCount, boundaryCount])

  const canPrev = currentPage > 1
  const canNext = currentPage < totalPages
  const prevDisabled = disabled || !canPrev
  const nextDisabled = disabled || !canNext

  const goto = (p: number) => {
    if (disabled) return
    const c = Math.max(1, Math.min(totalPages, p))
    if (c !== currentPage) onPageChange(c)
  }

  return { items, canPrev, canNext, prevDisabled, nextDisabled, goto }
}
