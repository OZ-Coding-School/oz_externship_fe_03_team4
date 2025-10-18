import type { ReactNode } from 'react'

// ReactNode: 리액트가 렌더링할 수 있는 모든 타입 (문자열, 숫자, JSX, null, undefined, 배열 등)
export interface ListItem {
  id: string
  label: string
  status?: string
}

export interface AccordionItemProps {
  title: string
  children: ReactNode
}

export interface AccordionProps {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  selectedLabels?: Record<string, string>
  children: ReactNode
}

export interface AccordionListProps {
  items: ListItem[]
  onSelectItem: (item: ListItem) => void
}
export const AccordionItem = ({ children }: AccordionItemProps) => {
  return <div>{children}</div>
}
