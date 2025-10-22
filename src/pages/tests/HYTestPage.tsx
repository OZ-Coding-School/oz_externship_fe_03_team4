import { useState, type ReactNode } from 'react'
import { Button } from '../../components/buttons/Buttons'
import { Share2 } from 'lucide-react'
import { Pagination } from '../../components/pagination/Pagination'
import { Tabs } from '../../components/tab/Tabs'

const Section = ({
  title,
  desc,
  children,
}: {
  title: string
  desc?: string
  children: ReactNode
}) => (
  <section className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6">
    <h2 className="mb-1 text-lg font-semibold">{title}</h2>
    {desc && <p className="mb-4 text-sm text-gray-600">{desc}</p>}
    {children}
  </section>
)

const HYTestPage = () => {
  // ▼ Pagination 데모 상태
  const [page, setPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(25)
  const [siblingCount, setSiblingCount] = useState<number>(1)
  const [boundaryCount, setBoundaryCount] = useState<number>(1)
  const [showFirstLast, setShowFirstLast] = useState<boolean>(true)
  const [disabled, setDisabled] = useState<boolean>(false)

  const clamp = (p: number) => Math.max(1, Math.min(totalPages, p))

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 md:py-12">
        {/* Buttons – Compact Matrix */}
        <Section
          title="Buttons (Compact)"
          desc="팔레트/사이즈/레이아웃/상태/커스텀/가로100%"
        >
          {/* 팔레트 */}
          <div className="mb-4">
            <h3 className="mb-2 text-sm font-medium">Palette</h3>
            <div className="flex flex-wrap gap-2">
              {(
                [
                  'primary',
                  'secondary',
                  'success',
                  'danger',
                  'warning',
                  'info',
                ] as const
              ).map((c) => (
                <Button key={c} color={c}>
                  {c}
                </Button>
              ))}
            </div>
          </div>

          {/* 사이즈 */}
          <div className="mb-4">
            <h3 className="mb-2 text-sm font-medium">Size (primary)</h3>
            <div className="flex flex-wrap gap-2">
              {(['small', 'medium', 'large'] as const).map((s) => (
                <Button key={s} color="primary" size={s}>
                  {s}
                </Button>
              ))}
            </div>
          </div>

          {/* 레이아웃 */}
          <div className="mb-4">
            <h3 className="mb-2 text-sm font-medium">Layout</h3>
            <div className="flex flex-wrap items-center gap-2">
              <Button color="primary">Text Only</Button>
              <Button color="primary" leftIcon={<Share2 className="h-5 w-5" />}>
                Icon + Text
              </Button>
              <Button
                iconOnly
                color="secondary"
                leftIcon={<Share2 className="h-5 w-5" />}
                aria-label="공유"
              />
            </div>
          </div>

          {/* 상태 */}
          <div className="mb-4">
            <h3 className="mb-2 text-sm font-medium">States</h3>
            <div className="flex flex-wrap gap-2">
              <Button disabled color="primary">
                Disabled
              </Button>
              <Button loading color="secondary">
                Loading
              </Button>
            </div>
          </div>

          {/* 커스텀 치수 */}
          <div className="mb-4">
            <h3 className="mb-2 text-sm font-medium">Custom Dimension</h3>
            <div className="flex flex-wrap items-center gap-2">
              <Button color="primary" customHeight={44}>
                H 44px
              </Button>
              <Button color="secondary" customHeight={40} customWidth={220}>
                H 40px / W 220px
              </Button>
              <Button
                iconOnly
                color="info"
                customHeight={42}
                leftIcon={<Share2 className="h-5 w-5" />}
                aria-label="정사각 42"
              />
            </div>
          </div>

          {/* 가로 100% */}
          <div>
            <h3 className="mb-2 text-sm font-medium">Full Width</h3>
            <Button fullWidth color="primary">
              가로 100% 버튼
            </Button>
          </div>
        </Section>

        {/* 5) Pagination (추가) */}
        <Section
          title="Pagination"
          desc="경계(boundary)/형제(sibling) 조절 + 상태 토글."
        >
          <div className="space-y-4">
            {/* 데모 */}
            <div className="rounded-xl border border-gray-200 p-4">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
                siblingCount={siblingCount}
                boundaryCount={boundaryCount}
                showFirstLast={showFirstLast}
                disabled={disabled}
              />
              <div className="mt-3 text-sm text-gray-600">
                현재 페이지: <b>{page}</b> / 총 <b>{totalPages}</b>
              </div>
            </div>

            {/* 컨트롤 */}
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div className="rounded-xl border border-gray-200 p-4">
                <h3 className="mb-2 font-medium">Controls</h3>
                <div className="grid grid-cols-2 items-center gap-2">
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
                      onChange={(e) =>
                        setPage(clamp(Number(e.target.value) || 1))
                      }
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

                <div className="pt-3">
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

              {/* 상태 미리보기 */}
              <div className="rounded-xl border border-gray-200 p-4">
                <h3 className="mb-2 font-medium">State</h3>
                <pre className="rounded-md bg-gray-50 p-3 text-xs text-gray-700">
                  {JSON.stringify(
                    {
                      page,
                      totalPages,
                      siblingCount,
                      boundaryCount,
                      showFirstLast,
                      disabled,
                    },
                    null,
                    2
                  )}
                </pre>
              </div>
            </div>
          </div>
        </Section>

        <Section title="Tabs (라우터 연동)">
          <Tabs
            defaultValue="home"
            className="w-full"
            items={[
              { id: 'home', label: 'Home', content: <div>Home Panel</div> },
              {
                id: 'search',
                label: 'Search',
                content: <div>Search Panel</div>,
              },
              {
                id: 'settings',
                label: 'Settings',
                content: <div>Settings Panel</div>,
              },
              {
                id: 'disabled',
                label: 'Disabled',
                content: <div>Disabled Panel</div>,
                disabled: true,
              },
            ]}
          />
        </Section>

        <footer className="pt-4 text-center text-xs text-gray-500">
          Lucide 아이콘은 currentColor를 상속합니다. 버튼 텍스트 색상 변경 시
          아이콘도 함께 변합니다.
        </footer>
      </div>
    </main>
  )
}

export default HYTestPage
