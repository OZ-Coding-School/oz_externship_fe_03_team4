/**
 * ButtonTestPage
 *
 * Buttons.tsx의 프리셋/커스텀 색상, 아이콘(Lucide), customHeight/Width,
 * 상태(loading/disabled/fullWidth) 조합을 한 화면에서 시각적으로 검증합니다.
 * - Section/Cell: 미니 레이아웃 헬퍼
 * - Legend: 색상 스펙 요약
 */
import { Button } from '../../components/buttons/Buttons'
import { ArrowDownToLine, Share2, Bolt, Trash2, X } from 'lucide-react'
import type { ReactNode } from 'react'

/** 데모 섹션 카드 래퍼. title/desc와 children 영역을 제공합니다. */
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

/** 라벨 캡션이 있는 셀. 버튼 아래에 조합 정보를 표시합니다. */
const Cell = ({ label, children }: { label?: string; children: ReactNode }) => (
  <div className="flex flex-col items-start gap-2">
    {children}
    {label && <span className="text-xs text-gray-500">{label}</span>}
  </div>
)

/**
 * Buttons Playground (시각 테스트 페이지)
 * - Base, Icon+Text, IconOnly, States 섹션으로 구성
 * - Cell 태그 안의 버튼을 가져다 쓰시면 신속한 개발에 도움이 됩니다.
 */
const ButtonTestPage = () => {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 md:py-12">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Buttons Playground</h1>
            <p className="text-sm text-gray-600">
              프리셋/커스텀 색상, 아이콘, 높이·너비 커스터마이징을 한 화면에서
              테스트합니다.
            </p>
            <p className="text-sm text-gray-600">폰트 - Roboto</p>
          </div>
          <Legend />
        </header>

        {/* 1) Base Buttons */}
        {/* Base: preset + size 조합 확인 (secondary는 텍스트/보더 예외 규칙) */}
        <Section
          title="1) Base Buttons (텍스트만)"
          desc="size × color 조합. secondary는 글자 #374151 + 1px #D1D5DB 보더."
        >
          <div className="space-y-6">
            <div>
              <h3 className="mb-2 font-medium">
                small (폰트 크기 12px, 높이 24px, 모서리(border-radius) 4px)
              </h3>
              <Grid>
                <Cell label="small / primary">
                  <Button size="small" color="primary">
                    small / primary
                  </Button>
                </Cell>
                <Cell label="small / secondary">
                  <Button size="small" color="secondary">
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
                <Cell label="small / info">
                  <Button size="small" color="info">
                    small / info
                  </Button>
                </Cell>
              </Grid>
            </div>

            <div>
              <h3 className="mb-2 font-medium">
                medium (폰트 크기 14px, 높이 36px, 모서리(border-radius) 8px)
              </h3>
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
                <Cell label="medium / info">
                  <Button size="medium" color="info">
                    medium / info
                  </Button>
                </Cell>
              </Grid>
            </div>

            <div>
              <h3 className="mb-2 font-medium">
                large (폰트 크기 16px, 높이 48px, 모서리(border-radius) 8px)
              </h3>
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
                <Cell label="large / info">
                  <Button size="large" color="info">
                    large / info
                  </Button>
                </Cell>
              </Grid>
            </div>
          </div>
        </Section>

        {/* 2) Icon + Text */}
        {/* Icon + Text: Lucide는 currentColor 상속 → 버튼 text 색에 동기화됨 */}
        <Section
          title="2) Icon + Text"
          desc="아이콘-글자 간격 8px(gap-2). 기본 규격: 높이 38px(h-[38px]), 좌우 패딩 16px(px-4), 상하 패딩 8px(py-2), 모서리(border-radius) 8px(r-8), 폰트 크기 14px(text-sm)."
        >
          <div className="space-y-6">
            <Grid>
              <Cell label="primary / leftIcon (Share2)">
                <Button
                  color="primary"
                  leftIcon={<Share2 className="h-5 w-5" />}
                >
                  공유
                </Button>
              </Cell>
              <Cell label="secondary / rightIcon (ArrowDownToLine)">
                <Button
                  color="secondary"
                  rightIcon={<ArrowDownToLine className="h-5 w-5" />}
                >
                  다운로드
                </Button>
              </Cell>
              <Cell label="info / both (Bolt + ArrowDownToLine)">
                <Button
                  color="info"
                  leftIcon={<Bolt className="h-5 w-5" />}
                  rightIcon={<ArrowDownToLine className="h-5 w-5" />}
                >
                  실행 후 저장
                </Button>
              </Cell>
            </Grid>

            {/* customHeight/Width: Tailwind h-* 대신 inline-style로 치수 결정 */}
            <div className="space-y-2">
              <p className="text-sm text-gray-600">customHeight/Width 예시</p>
              <Button color="primary" customHeight={44}>
                높이 44px
              </Button>
              <Button color="secondary" customHeight={40} customWidth={240}>
                높이 40px / 너비 240px
              </Button>
            </div>
          </div>
        </Section>

        {/* 3) Icon Only */}
        <Section
          title="3) Icon Only"
          desc="정사각 38px × 38px 기본. customHeight로 정사각 크기도 변경 가능."
        >
          <Grid>
            <Cell label="iconOnly / primary (Share2)">
              <Button
                iconOnly
                color="primary"
                leftIcon={<Share2 className="h-5 w-5" />}
                aria-label="공유"
              />
            </Cell>
            <Cell label="iconOnly / secondary (ArrowDownToLine)">
              <Button
                iconOnly
                color="secondary"
                leftIcon={<ArrowDownToLine className="h-5 w-5" />}
                aria-label="다운로드"
              />
            </Cell>
            <Cell label="iconOnly / info (X)">
              <Button
                iconOnly
                color="info"
                leftIcon={<X className="h-5 w-5" />}
                aria-label="닫기"
              />
            </Cell>

            {/* 🔻 디자이너 커스텀 팔레트 */}
            {/* 커스텀 팔레트: #FEE2E2, #F3F4F6 적용. 대비 확보 위해 border/링 지정 */}
            <Cell label="iconOnly / custom #FEE2E2 (Trash2) / 42px x 42px">
              <Button
                iconOnly
                customHeight={42} // → 42×42 정사각
                customBgColor="#FEE2E2" // 연한 레드
                customTextColor="#DC2626" // 아이콘(스트로크) 색
                customBorderColor="#FECACA" // 부드러운 테두리
                customRingColor="focus-visible:ring-red-200"
                leftIcon={<Trash2 className="h-5 w-5" />}
                aria-label="삭제(커스텀)"
              />
            </Cell>
            <Cell label="iconOnly / custom #F3F4F6 (Bolt) / 44px x 44px">
              <Button
                iconOnly
                customHeight="44px" // 문자열도 가능
                customBgColor="#F3F4F6" // 연한 회색
                customTextColor="#374151" // 딥그레이
                customBorderColor="#E5E7EB" // gray-200 수준
                customRingColor="focus-visible:ring-gray-300"
                leftIcon={<Bolt className="h-5 w-5" />}
                aria-label="실행(커스텀)"
              />
            </Cell>
            {/* 🔺 커스텀 팔레트 끝 */}
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
              <Cell label="disabled / iconOnly (Trash2)">
                <Button
                  iconOnly
                  disabled
                  color="info"
                  leftIcon={<Trash2 className="h-5 w-5" />}
                  aria-label="삭제"
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
              <Cell label="loading / iconOnly (Bolt)">
                <Button
                  iconOnly
                  loading
                  color="success"
                  leftIcon={<Bolt className="h-5 w-5" />}
                  aria-label="실행 중"
                />
              </Cell>
            </Grid>

            <div className="space-y-2">
              <p className="text-sm text-gray-600">fullWidth 예시</p>
              <Button fullWidth color="primary">
                가로 100% 버튼
              </Button>
              <Button fullWidth color="secondary">
                가로 100% 버튼 (secondary)
              </Button>
            </div>
          </div>
        </Section>

        <footer className="pt-4 text-center text-xs text-gray-500">
          Lucide 아이콘은 currentColor를 상속합니다. 버튼 텍스트 색상 변경 시
          아이콘도 함께 변합니다.
        </footer>
      </div>
    </main>
  )
}

const Grid = ({ children }: { children: ReactNode }) => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
    {children}
  </div>
)

/** 데모 팔레트 범주(legend). preset + custom swatch를 시각화합니다. */
const Legend = () => (
  <div className="hidden items-center gap-3 text-xs text-gray-600 md:flex">
    <span className="inline-flex items-center gap-1">
      <i className="inline-block h-3 w-3 rounded-sm bg-[#2563EB]" /> primary
    </span>
    <span className="inline-flex items-center gap-1">
      <i className="inline-block h-3 w-3 rounded-sm border border-[#D1D5DB] bg-white" />{' '}
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
      <i className="inline-block h-3 w-3 rounded-sm bg-[#6B7280]" /> info
    </span>
    <span className="inline-flex items-center gap-1">
      <i className="inline-block h-3 w-3 rounded-sm border border-[#FECACA] bg-[#FEE2E2]" />{' '}
      custom:#FEE2E2
    </span>
    <span className="inline-flex items-center gap-1">
      <i className="inline-block h-3 w-3 rounded-sm border border-[#E5E7EB] bg-[#F3F4F6]" />{' '}
      custom:#F3F4F6
    </span>
  </div>
)

export default ButtonTestPage
