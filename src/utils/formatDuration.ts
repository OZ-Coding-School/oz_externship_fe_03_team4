export const formatDuration = (minutes: number): string => {
  if (!minutes || minutes === 0) return '0분'

  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  if (hours === 0) return `${remainingMinutes}분`
  if (remainingMinutes === 0) return `${hours}시간`
  return `${hours}시간 ${remainingMinutes}분`
}
