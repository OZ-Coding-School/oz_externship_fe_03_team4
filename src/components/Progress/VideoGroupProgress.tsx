import { useCallback } from 'react'
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
  //onProgressChange 콜백이 있을 때 무한 루프를 방지
  const calculateProgress = useCallback(() => {
    if (videos.length === 0) return 0

    //reduce로 동영상 누적 합을 구함
    const totalDuration = videos.reduce((sum, video) => sum + video.duration, 0)
    //각 비디오의 진행률
    const totalProgressScore = videos.reduce(
      (sum, video) => sum + video.progress * video.duration,
      0
    )

    return totalProgressScore / totalDuration
  }, [videos])

  const groupProgress = calculateProgress() //위 함수로 계산된 평균 진행
  const competedCount = videos.filter((value) => value.completed).length //완료된 영상갯수

  return (
    <div className={className}>
      <ProgressBar progress={groupProgress} showLabel={showLabel} />
      {showLabel && (
        <div className="mt-1 text-xs text-gray-600">
          완료: {competedCount} / {videos.length}
        </div>
      )}
    </div>
  )
}
