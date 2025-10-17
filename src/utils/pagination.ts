/**
 * Pagination Utilities
 * - range: 숫자 범위 배열 생성 [start..end]
 * - buildPageTokens: 페이지 토큰(숫자 | ELLIPSIS) 시퀀스 생성
 */

export const ELLIPSIS = '…' as const
export type PageToken = number | typeof ELLIPSIS

/**
 * [start..end] 범위 배열 생성 (end < start면 빈 배열)
 */
export function range(start: number, end: number): number[] {
  if (!Number.isFinite(start) || !Number.isFinite(end)) return []
  if (end < start) return []
  const len = Math.floor(end - start + 1)
  if (len <= 0) return []
  return Array.from({ length: len }, (_, i) => start + i)
}

/**
 * 페이지 토큰 시퀀스 생성
 *
 * 결과 형태 예시 (boundaryCount=1, siblingCount=1):
 * 1, …, 9, 10, 11, …, 20
 */
export function buildPageTokens(
  totalPages: number,
  currentPage: number,
  siblingCount = 1,
  boundaryCount = 1
): PageToken[] {
  const tokens: PageToken[] = []

  if (!Number.isFinite(totalPages) || totalPages <= 0) return tokens
  const safeCurrent = Math.min(Math.max(1, Math.floor(currentPage)), totalPages)
  const safeSibling = Math.max(0, Math.floor(siblingCount))
  const safeBoundary = Math.max(0, Math.floor(boundaryCount))

  const startPages = range(1, Math.min(safeBoundary, totalPages))
  const endPages = range(
    Math.max(totalPages - safeBoundary + 1, safeBoundary + 1),
    totalPages
  )

  const leftSibling = Math.max(
    Math.min(safeCurrent - safeSibling, totalPages),
    safeBoundary + 1
  )
  const rightSibling = Math.min(
    Math.max(safeCurrent + safeSibling, 1),
    Math.max(totalPages - safeBoundary, safeBoundary)
  )

  // 시작 경계
  tokens.push(...startPages)

  // 왼쪽 생략부
  if (leftSibling > safeBoundary + 1) {
    tokens.push(ELLIPSIS)
  }

  // 중앙 윈도우
  for (let p = leftSibling; p <= rightSibling; p++) {
    if (p >= 1 && p <= totalPages) tokens.push(p)
  }

  // 오른쪽 생략부
  if (rightSibling < totalPages - safeBoundary) {
    tokens.push(ELLIPSIS)
  }

  // 끝 경계 (중복 방지)
  for (const p of endPages) {
    if (!tokens.includes(p)) tokens.push(p)
  }

  return tokens
}
