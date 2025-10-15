// src/App.tsx
import * as React from 'react'
import { Button } from '../components/buttons/Buttons'

// ---- Demo icons (16~20px 권장) ----
const IconSearch = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" {...props}>
    <path
      d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const IconArrowRight = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" {...props}>
    <path
      d="M5 12h14M13 5l7 7-7 7"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const IconHeart = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" {...props}>
    <path
      d="M12 21s-7-4.534-9-8.5S5.5 3 8.5 6.5L12 10l3.5-3.5C18.5 3 23 6.5 21 12.5S12 21 12 21Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
)

// ---- Layout helpers ----
const Section: React.FC<
  React.PropsWithChildren<{ title: string; desc?: string }>
> = ({ title, desc, children }) => (
  <section className="border-other-200 bg-secondary rounded-2xl border p-4 md:p-6">
    <h2 className="mb-1 text-lg font-semibold">{title}</h2>
    {desc && <p className="text-other-600 mb-4 text-sm">{desc}</p>}
    {children}
  </section>
)

const Cell: React.FC<React.PropsWithChildren<{ label?: string }>> = ({
  label,
  children,
}) => (
  <div className="flex flex-col items-start gap-2">
    {children}
    {label && <span className="text-other-500 text-xs">{label}</span>}
  </div>
)

// ---- Demo Page ----
export default function ButtonTestPage() {
  const handleClick = (name: string) => () => {
    // demo onClick
    // eslint-disable-next-line no-console
    console.log(`[clicked] ${name}`)
  }

  return (
    <main className="bg-other-50 text-other-900 min-h-screen">
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 md:py-12">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Buttons Playground</h1>
            <p className="text-other-600 text-sm">
              Tailwind + TSX · size/variant/state 조합을 한 화면에서
              테스트합니다.
            </p>
          </div>
          <Legend />
        </header>

        {/* 1) Base Buttons */}
        <Section
          title="1) Base Buttons (텍스트만)"
          desc="각 size × color 조합. secondary는 글자 #374151 + 1px #D1D5DB 보더 규칙."
        >
          <div className="space-y-6">
            <div>
              <h3 className="mb-2 font-medium">small (12px, h-24, r-4)</h3>
              <Grid>
                <Cell label="small / primary">
                  <Button
                    size="small"
                    color="primary"
                    onClick={handleClick('small/primary')}
                  >
                    small / primary
                  </Button>
                </Cell>
                <Cell label="small / secondary">
                  <Button
                    size="small"
                    color="secondary"
                    onClick={handleClick('small/secondary')}
                  >
                    small / secondary
                  </Button>
                </Cell>
                <Cell label="small / success">
                  <Button size="small" color="success">
                    small / success
                  </Button>
                </Cell>
                <Cell label="small / danger">
                  <Button size="small" color="danger">
                    small / danger
                  </Button>
                </Cell>
                <Cell label="small / warning">
                  <Button size="small" color="warning">
                    small / warning
                  </Button>
                </Cell>
                <Cell label="small / other">
                  <Button size="small" color="other">
                    small / other
                  </Button>
                </Cell>
              </Grid>
            </div>

            <div>
              <h3 className="mb-2 font-medium">medium (14px, h-36, r-8)</h3>
              <Grid>
                <Cell label="medium / primary">
                  <Button size="medium" color="primary">
                    medium / primary
                  </Button>
                </Cell>
                <Cell label="medium / secondary">
                  <Button size="medium" color="secondary">
                    medium / secondary
                  </Button>
                </Cell>
                <Cell label="medium / success">
                  <Button size="medium" color="success">
                    medium / success
                  </Button>
                </Cell>
                <Cell label="medium / danger">
                  <Button size="medium" color="danger">
                    medium / danger
                  </Button>
                </Cell>
                <Cell label="medium / warning">
                  <Button size="medium" color="warning">
                    medium / warning
                  </Button>
                </Cell>
                <Cell label="medium / other">
                  <Button size="medium" color="other">
                    medium / other
                  </Button>
                </Cell>
              </Grid>
            </div>

            <div>
              <h3 className="mb-2 font-medium">large (16px, h-48, r-8)</h3>
              <Grid>
                <Cell label="large / primary">
                  <Button size="large" color="primary">
                    large / primary
                  </Button>
                </Cell>
                <Cell label="large / secondary">
                  <Button size="large" color="secondary">
                    large / secondary
                  </Button>
                </Cell>
                <Cell label="large / success">
                  <Button size="large" color="success">
                    large / success
                  </Button>
                </Cell>
                <Cell label="large / danger">
                  <Button size="large" color="danger">
                    large / danger
                  </Button>
                </Cell>
                <Cell label="large / warning">
                  <Button size="large" color="warning">
                    large / warning
                  </Button>
                </Cell>
                <Cell label="large / other">
                  <Button size="large" color="other">
                    large / other
                  </Button>
                </Cell>
              </Grid>
            </div>
          </div>
        </Section>

        {/* 2) Icon + Text */}
        <Section
          title="2) Icon + Text"
          desc="아이콘과 텍스트 사이 간격 8px(gap-2), 기본 규격은 h-[38px], px-4 py-2, r-8, text-sm."
        >
          <div className="space-y-6">
            <Grid>
              <Cell label="medium / primary / leftIcon">
                <Button color="primary" leftIcon={<IconSearch />}>
                  검색
                </Button>
              </Cell>
              <Cell label="medium / secondary / rightIcon">
                <Button color="secondary" rightIcon={<IconArrowRight />}>
                  다음 단계
                </Button>
              </Cell>
              <Cell label="medium / other / bothIcons">
                <Button
                  color="other"
                  leftIcon={<IconSearch />}
                  rightIcon={<IconArrowRight />}
                >
                  검색 진행
                </Button>
              </Cell>
            </Grid>

            <Grid>
              <Cell label="small / success / leftIcon">
                <Button size="small" color="success" leftIcon={<IconSearch />}>
                  등록
                </Button>
              </Cell>
              <Cell label="large / danger / rightIcon">
                <Button
                  size="large"
                  color="danger"
                  rightIcon={<IconArrowRight />}
                >
                  삭제 진행
                </Button>
              </Cell>
              <Cell label="large / warning / leftIcon">
                <Button size="large" color="warning" leftIcon={<IconSearch />}>
                  확인
                </Button>
              </Cell>
            </Grid>
          </div>

          {/* --- Right Icon --- */}
          <div>
            <h3 className="mb-2 font-medium">Right Icon</h3>
            <Grid>
              <Cell label="medium / primary / rightIcon">
                <Button color="primary" rightIcon={<IconArrowRight />}>
                  다음 단계
                </Button>
              </Cell>
              <Cell label="medium / secondary / rightIcon">
                <Button color="secondary" rightIcon={<IconArrowRight />}>
                  다음 단계
                </Button>
              </Cell>
              <Cell label="medium / other / rightIcon">
                <Button color="other" rightIcon={<IconArrowRight />}>
                  다음 단계
                </Button>
              </Cell>
            </Grid>
          </div>

          {/* --- Both Icons --- */}
          <div>
            <h3 className="mb-2 font-medium">Left + Right Icon</h3>
            <Grid>
              <Cell label="medium / primary / both">
                <Button
                  color="primary"
                  leftIcon={<IconSearch />}
                  rightIcon={<IconArrowRight />}
                >
                  검색 진행
                </Button>
              </Cell>
              <Cell label="medium / secondary / both">
                <Button
                  color="secondary"
                  leftIcon={<IconSearch />}
                  rightIcon={<IconArrowRight />}
                >
                  검색 진행
                </Button>
              </Cell>
              <Cell label="medium / other / both">
                <Button
                  color="other"
                  leftIcon={<IconSearch />}
                  rightIcon={<IconArrowRight />}
                >
                  검색 진행
                </Button>
              </Cell>
            </Grid>
          </div>
        </Section>

        {/* 3) Icon Only */}
        <Section
          title="3) Icon Only"
          desc="정사각 38×38, p-2, r-8. 반드시 aria-label 제공."
        >
          <Grid>
            <Cell label="iconOnly / primary">
              <Button
                iconOnly
                color="primary"
                leftIcon={<IconHeart />}
                aria-label="좋아요"
              />
            </Cell>
            <Cell label="iconOnly / secondary">
              <Button
                iconOnly
                color="secondary"
                leftIcon={<IconSearch />}
                aria-label="검색"
              />
            </Cell>
            <Cell label="iconOnly / other">
              <Button
                iconOnly
                color="other"
                leftIcon={<IconArrowRight />}
                aria-label="다음"
              />
            </Cell>
          </Grid>
        </Section>

        {/* 4) States */}
        <Section
          title="4) States"
          desc="disabled / loading / fullWidth / focus-visible 링 확인."
        >
          <div className="space-y-6">
            <Grid>
              <Cell label="disabled / primary">
                <Button disabled color="primary">
                  비활성화
                </Button>
              </Cell>
              <Cell label="disabled / secondary">
                <Button disabled color="secondary">
                  비활성화
                </Button>
              </Cell>
              <Cell label="disabled / iconOnly">
                <Button
                  iconOnly
                  disabled
                  color="other"
                  leftIcon={<IconHeart />}
                  aria-label="좋아요"
                />
              </Cell>
            </Grid>

            <Grid>
              <Cell label="loading / primary">
                <Button loading color="primary">
                  저장 중…
                </Button>
              </Cell>
              <Cell label="loading / secondary">
                <Button loading color="secondary">
                  처리 중…
                </Button>
              </Cell>
              <Cell label="loading / iconOnly">
                <Button
                  iconOnly
                  loading
                  color="success"
                  leftIcon={<IconSearch />}
                  aria-label="검색 중"
                />
              </Cell>
            </Grid>

            <div className="space-y-2">
              <p className="text-other-600 text-sm">fullWidth 예시</p>
              <Button
                fullWidth
                color="primary"
                onClick={handleClick('fullWidth/primary')}
              >
                가로 100% 버튼
              </Button>
              <Button
                fullWidth
                color="secondary"
                onClick={handleClick('fullWidth/secondary')}
              >
                가로 100% 버튼 (secondary)
              </Button>
            </div>
          </div>
        </Section>

        {/* 5) Edge Cases */}
        <Section
          title="5) Edge Cases"
          desc="긴 텍스트, 이모지/한글/영문 혼용, onClick 동작, 키보드 포커스 등."
        >
          <Grid>
            <Cell label="긴 텍스트 (primary)">
              <Button color="primary" onClick={handleClick('long-text')}>
                정말로아주매우길게붙여쓴텍스트입니다줄바꿈없이길게가더라도버튼이깨지면안돼요
              </Button>
            </Cell>
            <Cell label="혼용 텍스트 (secondary)">
              <Button color="secondary">확인 ✅ Okay 👍 완료</Button>
            </Cell>
            <Cell label="Enter/Space 활성화 확인 (other)">
              <Button color="other">포커스 후 Enter/Space</Button>
            </Cell>
          </Grid>
        </Section>

        <footer className="text-other-500 pt-4 text-center text-xs">
          Roboto는 전역에서 font-medium로 로딩되어 있다고 가정합니다.
        </footer>
      </div>
    </main>
  )
}

// grid helper
function Grid({ children }: React.PropsWithChildren) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {children}
    </div>
  )
}

// legend
function Legend() {
  return (
    <div className="text-other-600 hidden items-center gap-3 text-xs md:flex">
      <span className="inline-flex items-center gap-1">
        <i className="inline-block h-3 w-3 rounded-sm bg-[#2563EB]" /> primary
      </span>
      <span className="inline-flex items-center gap-1">
        <i className="bg-secondary inline-block h-3 w-3 rounded-sm border border-[#D1D5DB]" />{' '}
        secondary
      </span>
      <span className="inline-flex items-center gap-1">
        <i className="inline-block h-3 w-3 rounded-sm bg-[#16A34A]" /> success
      </span>
      <span className="inline-flex items-center gap-1">
        <i className="inline-block h-3 w-3 rounded-sm bg-[#DC2626]" /> danger
      </span>
      <span className="inline-flex items-center gap-1">
        <i className="inline-block h-3 w-3 rounded-sm bg-[#EAB308]" /> warning
      </span>
      <span className="inline-flex items-center gap-1">
        <i className="inline-block h-3 w-3 rounded-sm bg-[#6B7280]" /> other
      </span>
    </div>
  )
}
