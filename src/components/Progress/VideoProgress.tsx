import { RefObject, useEffect, useState } from 'react'
import { ProgressBar } from './ProgressBar'

export interface VideoProgressProps {
  videoRef: RefObject<HTMLVideoElement> //제어할 video element의 ref
  showLabel?: boolean
  onProgressChange?: (progress: number) => void
  className?: string
}

export function VideoProgress({
  videoRef,
  showLabel = false,
  onProgressChange,
  className = '',
}: VideoProgressProps) {
  const [progress, setProgress] = useState(0)

  //동영상 재생 확인용 함수
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // 영상 재생중 시간이 변할 때마다 이벤트 발생
    const handleTimeUpdate = () => {
      const current = video.currentTime //현재 재생 위치
      const total = video.duration //전체 재생 길이
      if (total > 0) {
        // 현재 진행률 계산
        const newProgress = (current / total) * 100
        setProgress(newProgress)
        onProgressChange?.(newProgress)
      }
    }
    // 비디오 재생 시간 변화를 실시간 감지
    video.addEventListener('timeupdate', handleTimeUpdate)

    // 컴포넌트가 사라지면 변화 감지를 지워서 메모리 누수 방지
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
    }
    //의존성 배열 lint 오류 제거 주석
    //eslint-disable-next-line
  }, [onProgressChange])

  return (
    <ProgressBar
      progress={progress}
      showLabel={showLabel}
      className={className}
    />
  )
}
