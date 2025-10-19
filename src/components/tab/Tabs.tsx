import { useState, type ReactNode } from 'react'

export type TabItem = {
  id: string
  label: ReactNode
  content?: ReactNode
  disabled?: boolean
}
export type TabsProps = {
  items: TabItem[]
  defaultValue?: string
  className?: string
}

export const Tabs = ({ items, defaultValue, className }: TabsProps) => {
  const [active, setActive] = useState(
    defaultValue ?? items.find((i) => !i.disabled)?.id
  )
  return (
    <div className={className}>
      <div className="flex gap-2 border-b border-gray-200">
        {items.map((i) => (
          <button
            key={i.id}
            disabled={i.disabled}
            onClick={() => !i.disabled && setActive(i.id)}
            className={`-mb-px border-b-2 px-3 py-2 text-sm font-medium ${
              i.id === active
                ? 'border-primary-button text-primary-button'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {i.label}
          </button>
        ))}
      </div>
      <div className="mt-3">
        {items.map((i) => i.id === active && <div key={i.id}>{i.content}</div>)}
      </div>
    </div>
  )
}
