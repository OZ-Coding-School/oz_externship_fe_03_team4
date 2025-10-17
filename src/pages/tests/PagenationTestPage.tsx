import { useMemo, useState, useEffect, useCallback } from 'react'
import { Pagination } from '../../components/pagenation/Pagination'
import { Button } from '../../components/buttons/Buttons'

/**
 * Pagination 데모 / 테스트 페이지
 * - 페이지 전환, sibling/boundary, 첫/끝 이동 버튼 토글, 전체 비활성화 등 확인
 */
export default function PaginationTestPage() {
  const [totalPages, setTotalPages] = useState<number>(25)
  const [page, setPage] = useState<number>(1)
  const [siblingCount, setSiblingCount] = useState<number>(1)
  const [boundaryCount, setBoundaryCount] = useState<number>(1)
  const [showFirstLast, setShowFirstLast] = useState<boolean>(true)
  const [disabled, setDisabled] = useState<boolean>(false)

  const clamp = useCallback(
    (p: number) => Math.max(1, Math.min(totalPages, p)),
    [totalPages]
  )

  // totalPages 변경 시 현재 페이지 보정
  useEffect(() => {
    setPage((p) => clamp(p))
  }, [clamp])

  const info = useMemo(
    () => ({
      page,
      totalPages,
      siblingCount,
      boundaryCount,
      showFirstLast,
      disabled,
    }),
    [page, totalPages, siblingCount, boundaryCount, showFirstLast, disabled]
  )

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">Pagination Test</h1>
        <p className="text-foreground/70 text-sm">
          컴포넌트 동작을 빠르게 검증하기 위한 데모 페이지입니다.
        </p>
      </header>

      {/* Controls */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-3 rounded-2xl border p-4">
          <h2 className="font-semibold">Controls</h2>
          <div className="grid grid-cols-2 items-center gap-3">
            <label className="text-sm">Total Pages</label>
            <input
              type="number"
              min={1}
              value={totalPages}
              onChange={(e) =>
                setTotalPages(Math.max(1, Number(e.target.value) || 1))
              }
              className="h-9 rounded-md border px-2"
            />

            <label className="text-sm">Current Page</label>
            <div className="flex items-center gap-2">
              <Button
                size="small"
                color="secondary"
                onClick={() => setPage((p) => clamp(p - 1))}
              >
                -1
              </Button>
              <input
                type="number"
                min={1}
                max={totalPages}
                value={page}
                onChange={(e) => setPage(clamp(Number(e.target.value) || 1))}
                className="h-9 w-24 rounded-md border px-2"
              />
              <Button
                size="small"
                color="secondary"
                onClick={() => setPage((p) => clamp(p + 1))}
              >
                +1
              </Button>
            </div>

            <label className="text-sm">Sibling Count</label>
            <input
              type="number"
              min={0}
              max={5}
              value={siblingCount}
              onChange={(e) =>
                setSiblingCount(
                  Math.max(0, Math.min(5, Number(e.target.value) || 0))
                )
              }
              className="h-9 rounded-md border px-2"
            />

            <label className="text-sm">Boundary Count</label>
            <input
              type="number"
              min={0}
              max={3}
              value={boundaryCount}
              onChange={(e) =>
                setBoundaryCount(
                  Math.max(0, Math.min(3, Number(e.target.value) || 0))
                )
              }
              className="h-9 rounded-md border px-2"
            />

            <label className="text-sm">Show First/Last</label>
            <input
              type="checkbox"
              checked={showFirstLast}
              onChange={(e) => setShowFirstLast(e.target.checked)}
              className="h-5 w-5"
            />

            <label className="text-sm">Disabled</label>
            <input
              type="checkbox"
              checked={disabled}
              onChange={(e) => setDisabled(e.target.checked)}
              className="h-5 w-5"
            />
          </div>

          <div className="pt-2">
            <Button
              size="small"
              color="danger"
              onClick={() => {
                setPage(1)
                setSiblingCount(1)
                setBoundaryCount(1)
                setShowFirstLast(true)
                setDisabled(false)
                setTotalPages(25)
              }}
            >
              Reset
            </Button>
          </div>
        </div>

        <div className="space-y-2 rounded-2xl border p-4">
          <h2 className="font-semibold">State</h2>
          <pre className="bg-muted overflow-auto rounded-md p-3 text-sm">
            {JSON.stringify(info, null, 2)}
          </pre>
        </div>
      </section>

      {/* Demo */}
      <section className="space-y-4 rounded-2xl border p-6">
        <h2 className="font-semibold">Demo</h2>
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
          siblingCount={siblingCount}
          boundaryCount={boundaryCount}
          showFirstLast={showFirstLast}
          disabled={disabled}
        />

        <div className="flex items-center gap-2 pt-2">
          <Button size="small" color="secondary" onClick={() => setPage(1)}>
            First
          </Button>
          <Button
            size="small"
            color="secondary"
            onClick={() => setPage((p) => clamp(p - 1))}
          >
            Prev
          </Button>
          <Button
            size="small"
            color="secondary"
            onClick={() => setPage((p) => clamp(p + 1))}
          >
            Next
          </Button>
          <Button
            size="small"
            color="secondary"
            onClick={() => setPage(totalPages)}
          >
            Last
          </Button>
        </div>
      </section>

      <footer className="text-foreground/60 text-xs">
        Tailwind 기반 · 접근성 속성(aria-label/aria-current) 적용됨
      </footer>
    </div>
  )
}
