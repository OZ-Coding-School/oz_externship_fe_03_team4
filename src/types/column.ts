import type { ReactNode } from 'react'

export type TableColumn<RowData> = {
  [Key in keyof RowData]: {
    key: Key
    label?: string
    render?: (cellValue: RowData[Key], fullRow: RowData) => ReactNode
  }
}[keyof RowData]

export const defineColumns = <RowData>(columns: TableColumn<RowData>[]) =>
  columns
