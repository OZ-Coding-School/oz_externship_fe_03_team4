export const formatDate = (date?: string) => {
  if (!date) return ''
  const myDate = new Date(date)
  if (Number.isNaN(myDate.getTime())) return ''
  const year = myDate.getFullYear()
  const month = String(myDate.getMonth() + 1).padStart(2, '0')
  const day = String(myDate.getDate()).padStart(2, '0')
  const hour = String(myDate.getHours()).padStart(2, '0')
  const minute = String(myDate.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day} ${hour}:${minute}`
}
