export const formatDate = (dateString?: string) => {
  if (!dateString) return ''
  const dateObject = new Date(dateString)
  if (Number.isNaN(dateObject.getTime())) return ''

  const dateFormatter = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(dateObject)

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    dateFormatter.find((part) => part.type === type)?.value ?? ''

  const year = get('year')
  const month = get('month')
  const day = get('day')
  const hour = get('hour')
  const minute = get('minute')

  return `${year}-${month}-${day} ${hour}:${minute}`
}
