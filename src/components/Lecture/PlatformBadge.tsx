import { Badge } from '../Badge'

type PlatformBadgeProps = {
  platform: 'Udemy' | 'Inflearn'
}

export const PlatformBadge = ({ platform }: PlatformBadgeProps) => {
  const variant = platform === 'Udemy' ? 'info' : 'success'

  return <Badge variant={variant} label={platform} />
}
