import { Table } from '../../Data-Indicate/Table'
import type { Application } from '../../../types/applications'
import { applicationColumns } from './TableColumn'

interface ApplicationTableSectionProps {
  data: Application[]
  onRowClick?: (row: Application) => void
}

type ApplicationRow = Application & Record<string, unknown>

export const ApplicationTableSection = ({
  data,
  onRowClick,
}: ApplicationTableSectionProps) => {
  const rows = data as ApplicationRow[]

  return (
    <section className="rounded-xl border border-neutral-200 bg-white shadow-sm">
      <div className="rounded-xl">
        <Table<ApplicationRow>
          columns={applicationColumns}
          data={rows}
          className="rounded-none border-t border-neutral-200"
          onRowClick={(row) => onRowClick?.(row as Application)}
        />
      </div>
    </section>
  )
}
