import type { LucideIcon } from 'lucide-react'
import type { PropsWithChildren, ReactNode } from 'react'

export interface PagerHeaderProps extends PropsWithChildren {
  iconComponents?: LucideIcon
  koreanTitle: string
  englishSubtitle: string
  metaContent?: ReactNode
  actionElements?: ReactNode
  textAlign?: 'left' | 'center'
  headerSize?: 'medium' | 'large'
  className?: string
}
