import { Table } from '../../Data-Indicate/Table'
import type { Application } from '../../../types/applications'
import { applicationColumns } from './TableColumn'

interface ApplicationTableSectionProps {
  data: Application[]
}

type ApplicationRow = Application & Record<string, unknown>

export const ApplicationTableSection = ({
  data,
}: ApplicationTableSectionProps) => {
  const rows = data as ApplicationRow[]

  return (
    <section className="rounded-xl border border-neutral-200 bg-white shadow-sm">
      <div className="max-h-[520px] overflow-auto rounded-xl">
        <Table<ApplicationRow>
          columns={applicationColumns}
          data={rows}
          className="rounded-none border-t border-neutral-200"
        />
      </div>
    </section>
  )
}
