export interface ProgressBarProps {
  progress: number
  showLabel?: boolean // 퍼센트 표시 라벨
  className?: string
}

export const ProgressBar = ({
  progress,
  showLabel = false,
  className = '',
}: ProgressBarProps) => {
  const progressPercent = Math.max(0, Math.min(100, progress))

  // Tailwind 클래스 대신 style을 사용해서 런타임에 계산된 값을 progressPercent에 넣어서 (%)표시
  return (
    <div className={`relative w-full ${className}`}>
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-blue-600 transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {showLabel && (
        <div className="mt-1 text-right text-xs text-gray-600">
          {progressPercent.toFixed(0)}%
        </div>
      )}
    </div>
  )
}
