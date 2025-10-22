import { ProgressBar } from './ProgressBar'

export interface VideoProgressData {
  videoId: string
  progress: number
  duration: number
  completed?: boolean
}

export interface VideoGroupProps {
  videos: VideoProgressData[]
  showLabel?: boolean
  className?: string
}

export const VideoGroupProgress = ({
  videos,
  showLabel = false,
  className = '',
}: VideoGroupProps) => {
  // 진행된 총 시간 / 모든 비디오의 전체 재생시간의 합
  const groupProgress =
    videos.length === 0
      ? 0
      : videos.reduce(
          (sum, video) => sum + video.progress * video.duration,
          0
        ) / videos.reduce((sum, video) => sum + video.duration, 0)

  const completedCount = videos.filter((v) => v.completed).length

  return (
    <div className={className}>
      <ProgressBar progress={groupProgress} showLabel={showLabel} />
      {showLabel && (
        <div className="mt-1 text-xs text-gray-600">
          완료: {completedCount} / {videos.length}
        </div>
      )}
    </div>
  )
}
