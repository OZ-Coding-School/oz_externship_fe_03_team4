import { useMemo } from 'react'
import { buildPageTokens, ELLIPSIS } from '../../utils/pagination'

export type NavItem = { type: 'page'; page: number } | { type: 'ellipsis' }

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
  const raw = useMemo(
    () => buildPageTokens(totalPages, currentPage, siblingCount, boundaryCount),
    [totalPages, currentPage, siblingCount, boundaryCount]
  )

  const tokens = useMemo<NavItem[]>(
    () =>
      raw.map((t) =>
        t === ELLIPSIS
          ? { type: 'ellipsis' }
          : { type: 'page', page: t as number }
      ),
    [raw]
  )

  const canPrev = currentPage > 1
  const canNext = currentPage < totalPages
  const prevDisabled = disabled || !canPrev
  const nextDisabled = disabled || !canNext

  const clamp = (p: number) => Math.max(1, Math.min(totalPages, p))
  const goto = (p: number) => {
    if (disabled) return
    const c = clamp(p)
    if (c !== currentPage) onPageChange(c)
  }

  return { tokens, canPrev, canNext, prevDisabled, nextDisabled, goto }
}
