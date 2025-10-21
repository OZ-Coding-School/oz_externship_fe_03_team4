import { useMemo, useState } from 'react'
import { useLocation, useNavigate, Outlet } from 'react-router'
import { cn } from '../../utils/cn'

export type TabItem = {
  id: string
  label: React.ReactNode
  content?: React.ReactNode
  disabled?: boolean
  to?: string
}

export type TabsProps = {
  items: TabItem[]
  defaultValue?: string
  className?: string
  showOutlet?: boolean
}

export const Tabs = ({ items, defaultValue, showOutlet }: TabsProps) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const routerMode = items.some((tab) => !!tab.to)
  const firstEnabledId = useMemo(
    () => items.find((tab) => !tab.disabled)?.id,
    [items]
  )
  const [active, setActive] = useState(defaultValue ?? firstEnabledId)

  const activeId = routerMode
    ? (items.find((tab) => tab.to && pathname.startsWith(tab.to))?.id ??
      firstEnabledId)
    : active

  return (
    <div className="flex w-full flex-col gap-3">
      <div className={cn('flex h-[44px] w-fit rounded-lg bg-neutral-100 p-1')}>
        {items.map((tab) => {
          const isActive = tab.id === activeId
          const onClick = () => {
            if (tab.disabled) return
            if (routerMode && tab.to) navigate(tab.to)
            else setActive(tab.id)
          }
          return (
            <button
              key={tab.id}
              type="button"
              disabled={tab.disabled}
              onClick={onClick}
              className={cn(
                '-mb-px inline-flex items-center px-4 py-2 text-sm font-medium',
                tab.disabled && 'cursor-not-allowed text-gray-400 opacity-40',
                !tab.disabled &&
                  (isActive ? 'bg-white text-yellow-600' : 'text-gray-600')
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      <div className="mt-3 w-full rounded-lg border border-gray-200 bg-white p-4">
        {routerMode
          ? showOutlet && <Outlet />
          : items.map(
              (tab) =>
                tab.id === activeId && <div key={tab.id}>{tab.content}</div>
            )}
      </div>
    </div>
  )
}
