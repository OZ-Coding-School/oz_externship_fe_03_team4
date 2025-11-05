import type { LucideIcon } from 'lucide-react'
import type { PropsWithChildren, ReactNode } from 'react'

export interface PageHeaderProps extends PropsWithChildren {
  iconComponent?: LucideIcon
  koreanTitle: string
  englishSubtitle: string
  actionElements?: ReactNode
  textAlign?: 'left' | 'center'
  headerSize?: 'medium' | 'large'
  className?: string
}
