import { type ReactNode } from 'react'
import { Tabs } from '../../components/tab/Tabs'
import { BreadCrumbs } from '../../components/breadcrumb/BreadCrumb'
import { FileAttachList } from '../../components/file-attach/FileAttachList'
import { ApplyList } from '../../components/apply-list/ApplyList'
import {
  mapAdminApiToUi,
  type AdminApplicationApi,
} from '../../types/applications'
import { formatDate } from '../../utils/formatDate'

const apiData: AdminApplicationApi[] = [
  {
    id: 1,
    recruitment_title: 'FE Intern',
    applicant_nickname: '홍길동',
    applicant_email: 'hong@example.com',
    status: 'REVIEWING',
    created_at: '2025-10-01T09:00:00Z',
    updated_at: '2025-10-01T10:00:00Z',
  },
  {
    id: 2,
    recruitment_title: 'BE Intern',
    applicant_nickname: '김지원',
    applicant_email: 'jiwon@example.com',
    status: 'REJECTED',
    created_at: '2025-10-02T09:00:00Z',
    updated_at: '2025-10-02T10:00:00Z',
  },
  {
    id: 3,
    recruitment_title: 'Design Intern',
    applicant_nickname: '이밀란',
    applicant_email: 'milanLee@example.com',
    status: 'ACCEPTED',
    created_at: '2025-10-03T09:00:00Z',
    updated_at: '2025-10-03T10:00:00Z',
  },
  {
    id: 4,
    recruitment_title: 'QA Intern',
    applicant_nickname: '강복순',
    applicant_email: 'boksoon@example.com',
    status: 'APPLYING',
    created_at: '2025-10-04T09:00:00Z',
    updated_at: '2025-10-04T10:00:00Z',
  },
]
const applications = apiData.map(mapAdminApiToUi).map((ui, i) => ({
  ...ui,
  // created_at(ISO) 기준으로 "YYYY-MM-DD HH:mm" 형식 보장
  appliedAt: formatDate(apiData[i].created_at),
}))

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
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 md:py-12">
        <BreadCrumbs />

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

        <Section title="File Attach List">
          <FileAttachList
            files={[
              { url: '/api/download/123' },
              { url: 'https://cdn.example.com/a/b/c.png' },
            ]}
          />
        </Section>

        <Section title="Apply List">
          <ApplyList applications={applications} />
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
