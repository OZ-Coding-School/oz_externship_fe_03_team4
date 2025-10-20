import Cookies from 'js-cookie'

export const setAccessToken = (token: string) => {
  Cookies.set('accessToken', token, { expries: 1 }) // 만료일은 우선 "1일"로 지정하며 추후 변경가능함.
}

export const getAccessToken = (): string | null => {
  return Cookies.get('accessToken') ?? null
}

export const removeAccessToken = () => {
  Cookies.remove('accessToken')
}