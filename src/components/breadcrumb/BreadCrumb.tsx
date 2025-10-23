import { Link, useLocation } from 'react-router'
import { ChevronRight, Home } from 'lucide-react'
import { BREADCRUMB_LABELS as LABELS } from './breadcrumbLabels'

export const BreadCrumbs = () => {
  const { pathname } = useLocation()
  const pathSegments = pathname.split('/').filter(Boolean)

  const items: { label: string; to?: string }[] = []
  items.push({
    label: LABELS['/'] || '관리자',
    to: pathSegments.length ? '/' : undefined,
  })

  let pathSoFar = ''
  pathSegments.forEach((segment, index) => {
    pathSoFar += `/${segment}`
    const isLast = index === pathSegments.length - 1
    const label = LABELS[pathSoFar] ?? decodeURIComponent(segment)
    items.push({ label, to: isLast ? undefined : pathSoFar })
  })

  const MAX_DEPTH = 2
  const displayItems =
    items.length > MAX_DEPTH
      ? [items[0], { label: '…' }, items[items.length - 1]]
      : items

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center gap-1 text-sm">
        <li className="flex items-center">
          <Home className="h-4 w-4 text-gray-300" />
        </li>

        {displayItems.length > 1 && (
          <li aria-hidden="true">
            <ChevronRight className="mx-1 h-4 w-4 text-gray-300" />
          </li>
        )}
        {displayItems.map((item, index) => {
          const isLast = index === displayItems.length - 1
          return (
            <li key={`${item.label}-${index}`} className="flex items-center">
              {item.to ? (
                <Link
                  className="text-gray-600 transition-colors hover:text-gray-900"
                  to={item.to}
                >
                  {item.label}
                </Link>
              ) : (
                <span className="font-medium text-gray-900">{item.label}</span>
              )}
              {!isLast && (
                <ChevronRight
                  className="mx-1 h-4 w-4 text-gray-300"
                  aria-hidden="true"
                />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
