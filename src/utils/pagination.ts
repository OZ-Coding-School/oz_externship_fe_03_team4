/**
 * Pagination Utilities (robust windowing)
 * - range: 숫자 범위 배열 생성 [start..end]
 * - buildPageItems: 좌/우 경계(boundary)와 형제(sibling) 개수를 고려한 안전한 페이지 항목 시퀀스 생성 함수
 *   · 중앙 윈도우(start..end)를 먼저 산출한 뒤, 경계와의 간격에 따라 Ellipsis 삽입
 */

export const ELLIPSIS = '…' as const
export type PageItem = number | typeof ELLIPSIS

/** [start..end] 범위 배열 생성 (end < start면 빈 배열) */
export const range = (start: number, end: number): number[] => {
  if (!Number.isFinite(start) || !Number.isFinite(end)) return []
  if (end < start) return []
  const length = Math.floor(end - start + 1)
  if (length <= 0) return []
  return Array.from({ length: length }, (_, index) => start + index)
}

/**
 * 페이지 항목 시퀀스 생성 함수 (안정적 윈도우 방식)
 *
 * 규칙:
 * 1) 시작 경계: [1 .. boundaryCount]
 * 2) 중앙 윈도우: currentPage 기준으로 siblingCount 좌/우 포함 (총 2*sibling+1)
 *    - 경계와 겹치지 않도록 윈도우 시작/끝을 먼저 안전하게 산출
 * 3) 끝 경계: [totalPages-boundaryCount+1 .. totalPages]
 * 4) 경계와 윈도우 사이에 간격이 존재하면 Ellipsis(…)
 */
export const buildPageItems = (
  totalPages: number,
  currentPage: number,
  siblingCount = 1,
  boundaryCount = 1
): PageItem[] => {
  const items: PageItem[] = []

  // 유효성 보정
  if (!Number.isFinite(totalPages) || totalPages <= 0) return items
  const total = Math.floor(totalPages)
  const current = Math.min(Math.max(1, Math.floor(currentPage)), total)
  const siblings = Math.max(0, Math.floor(siblingCount))
  const boundaries = Math.max(0, Math.floor(boundaryCount))

  // 전체가 매우 작을 때는 모든 페이지를 그대로 반환
  const middleDesired = 2 * siblings + 1
  if (total <= boundaries * 2 + middleDesired) {
    return range(1, total)
  }

  // 1) 시작/끝 경계 구간
  const startPages = boundaries > 0 ? range(1, boundaries) : []
  const endPages = boundaries > 0 ? range(total - boundaries + 1, total) : []

  // 2) 중앙 윈도우 시작/끝 산출
  // 중앙 윈도우는 경계 구간을 침범하지 않아야 함
  const minWindowStart = boundaries + 1
  const maxWindowEnd = total - boundaries

  // 기본 중심: current - siblings .. current + siblings
  let windowStart = current - siblings
  let windowEnd = current + siblings

  // 윈도우가 최소/최대 범위를 벗어나지 않도록 1차 보정
  if (windowStart < minWindowStart) {
    const shift = minWindowStart - windowStart
    windowStart += shift
    windowEnd += shift
  }
  if (windowEnd > maxWindowEnd) {
    const shift = windowEnd - maxWindowEnd
    windowStart -= shift
    windowEnd -= shift
  }

  // 윈도우 길이 보장 (총 middleDesired개) — 경계와의 여유 내에서 재보정
  const currentLength = windowEnd - windowStart + 1
  if (currentLength < middleDesired) {
    const deficit = middleDesired - currentLength
    // 최대한 왼쪽/오른쪽으로 균형 있게 확장하되 경계를 넘지 않음
    const addLeft = Math.min(deficit, Math.max(0, windowStart - minWindowStart))
    const addRight = deficit - addLeft
    windowStart -= addLeft
    windowEnd = Math.min(maxWindowEnd, windowEnd + addRight)
  }

  // 안전 클램프
  windowStart = Math.max(minWindowStart, windowStart)
  windowEnd = Math.min(maxWindowEnd, windowEnd)

  // 3) 페이지 목록 구성: 시작·중앙·끝 구간 순으로 이어붙이기
  items.push(...startPages)

  // 왼쪽 Ellipsis: 시작 경계 마지막과 중앙 시작 사이에 간격이 있을 때만
  const leftGapExists =
    startPages.length > 0
      ? windowStart > startPages[startPages.length - 1] + 1
      : windowStart > 1
  if (leftGapExists) items.push(ELLIPSIS)

  items.push(...range(windowStart, windowEnd))

  // 오른쪽 Ellipsis: 중앙 끝과 끝 경계 시작 사이에 간격이 있을 때만
  const rightGapExists =
    endPages.length > 0 ? windowEnd < endPages[0] - 1 : windowEnd < total
  if (rightGapExists) items.push(ELLIPSIS)

  items.push(...endPages)

  return items
}
