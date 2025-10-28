export const getFileNameFromHref = (href: string) => {
  // 1️⃣ http/https 시작 여부 체크
  const isHttp = /^https?:\/\//i.test(href)
  if (!isHttp) return '잘못된 파일명입니다'

  try {
    const url = new URL(href)
    const last = decodeURIComponent(
      url.pathname.split('/').filter(Boolean).pop() || ''
    )
    const valid =
      last.trim() !== '' &&
      (/[A-Za-z0-9가-힣]/.test(last) || last.includes('.'))
    return valid ? last : '잘못된 파일명입니다'
  } catch {
    return '잘못된 파일명입니다'
  }
}
