import type { ReactNode } from 'react'

export type TableColumn<RowData> = {
  // 테이블컬럼타입 지정
  [Key in keyof RowData]: {
    // rowdata 각 필드를 key로 가지는 column만 허용,각 column은 label과 render를 선택해서 받을 수 있음
    key: Key
    label?: string
    render?: (cellValue: RowData[Key], fullRow: RowData) => ReactNode // 함수는 해당셀의값, 전체 행 데이터를 가짐
  }
}[keyof RowData]
// 컬럼 정의 도와주는 함수, 제네릭을 직접 명시하거나, 전달된데이터로부터 자동으로 추론, 단순 타입검증용 함수
export const defineColumns = <RowData>(columns: TableColumn<RowData>[]) =>
  columns
