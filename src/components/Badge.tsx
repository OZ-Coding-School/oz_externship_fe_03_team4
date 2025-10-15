interface BadgeProps {
  className?: string
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
  label: string
}

const Badge = ({ className = '', variant = 'default', label }: BadgeProps) => {
  const variantStyles = {
    default: 'bg-gray-200 text-gray-800',
    primary: 'bg-blue-200 text-blue-800',
    success: 'bg-green-200 text-green-800',
    warning: 'bg-yellow-200 text-yellow-800',
    danger: 'bg-red-200 text-red-800',
    info: 'bg-purple-200 text-purple-800',
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
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-2xl font-bold">Badge Component Demo</h1>

        <div className="mb-12 flex flex-wrap gap-4">
          <Badge variant="default" label="Default" />
          <Badge variant="primary" label="Primary" />
          <Badge variant="success" label="Success" />
          <Badge variant="warning" label="Warning" />
          <Badge variant="danger" label="Danger" />
          <Badge variant="info" label="Info" />
        </div>
      </div>
    </div>
  )
}

export default BadgeTest
export { Badge }
