import type { ReactNode } from 'react'
import { Button } from '../buttons/Buttons'

export const IconButton = ({
  icon,
  label,
  disabled,
  onClick,
}: {
  icon: ReactNode
  label: string
  disabled?: boolean
  onClick: () => void
}) => (
  <Button
    size="medium"
    color="secondary"
    iconOnly
    leftIcon={icon}
    aria-label={label}
    disabled={disabled}
    onClick={onClick}
    className="text-secondary-button-fg"
  />
)
