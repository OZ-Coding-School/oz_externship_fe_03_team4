interface BadgeProps {
  className?: string
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
  label: string
}

const Badge = ({ className = '', variant = 'default', label }: BadgeProps) => {
  const variantStyles = {
    default: 'bg-[#f3f4f6 ]text-[#1F2937]',
    primary: 'bg-[#DBEAFE] text-[#1E40AF]]',
    success: 'bg-[#DCFCE7]] text-[#166534]',
    warning: 'bg-[#FEF9C3] text-[#854D0E]',
    danger: 'bg-[#FEE2E2] text-[#991B1B]',
    info: 'bg-[#F3E8FF] text-[#6B21A8]',
  }

  return (
    <button
      className={`rounded-full px-6 py-3 text-lg font-semibold ${variantStyles[variant]} ${className} `}
      type="button"
    >
      {label}
    </button>
  )
}

// 사용 테스트
const BadgeTest = () => {
  return (
    <div className="mb-12 flex flex-wrap gap-4">
      <Badge variant="default" label="Default" />
      <Badge variant="primary" label="Primary" />
      <Badge variant="success" label="Success" />
      <Badge variant="warning" label="Warning" />
      <Badge variant="danger" label="Danger" />
      <Badge variant="info" label="Info" />
    </div>
  )
}

export default BadgeTest
export { Badge }
