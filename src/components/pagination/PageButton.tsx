import { Button } from '../buttons/Buttons'

export const PageButton = ({
  page,
  active,
  onClick,
}: {
  page: number
  active: boolean
  onClick: () => void
}) => (
  <Button
    size="medium"
    color={active ? 'primary' : 'secondary'}
    className={active ? undefined : 'text-secondary-button-fg'}
    aria-current={active ? 'page' : undefined}
    onClick={onClick}
  >
    {page}
  </Button>
)
