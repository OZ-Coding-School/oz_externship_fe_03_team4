import type { ReactNode } from 'react'

export interface ListItem {
  id: string
  label: string
  status: string
}

export interface AccordionItemProps {
  title: string
  children: ReactNode
}

export const AccordionItem = ({ title, children }: AccordionItemProps) => {
  return (
    <>
      <div className="p-4 font-medium">{title}</div>
      <div className="p-4 pt-0">{children}</div>
    </>
  )
}

interface AccordionListProps {
  items: ListItem[]
  onSelectItem: (item: ListItem) => void
}

export const AccordionListContent = ({
  items,
  onSelectItem,
}: AccordionListProps) => {
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onSelectItem(item)}
          className="w-full rounded border p-3 text-left transition-colors hover:bg-slate-50"
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}
