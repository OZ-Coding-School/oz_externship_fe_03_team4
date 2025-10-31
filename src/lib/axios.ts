import axios, { AxiosError, type AxiosRequestHeaders } from 'axios'
import { getAccessToken, removeAccessToken, setAccessToken } from './token'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  withCredentials: true,
})

api.interceptors.request.use((config) => {
  const token = getAccessToken()
  if (token) {
    const url = config.url || ''
    const isAuthEndpoint =
      url.includes('/v1/auth/login') || url.includes('/v1/auth/refresh')
    if (!isAuthEndpoint) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

type RefreshResponse = { access?: string } // 리프레시 응답 타입을 지정합니닷.

api.interceptors.response.use(
  (res) => res,
  async (err: AxiosError) => {
    const originalConfig = err.config as
      | (typeof err.config & { _retry?: boolean })
      | undefined // 동일요청 반복못하도록
    // 401 x or 원채 요청했거나, 이미 시도했을 경우 종료하기
    if (
      err.response?.status !== 401 ||
      !originalConfig ||
      originalConfig._retry
    ) {
      return Promise.reject(err)
    }
    try {
      originalConfig._retry = true // 처음한번만 리프레시 시도하기
      const refreshRes = await api.post<RefreshResponse>(
        '/v1/auth/refresh', // 엔드포인트 추후 수정
        {},
        { withCredentials: true }
      )
      const newToken = refreshRes.data?.access
      if (!newToken) {
        throw new Error('다시 로그인해 주시면 계속 이용하실 수 있어요.')
      }
      setAccessToken(newToken) // 끝났니? 새로운 토큰 저장해줄게.

      const currentHeaders = // 원래 요청에 새 토큰을 덮어씀.
        (originalConfig.headers as Record<string, string> | undefined) ?? {}

      currentHeaders.Authorization = `Bearer ${newToken}`
      originalConfig.headers = currentHeaders as AxiosRequestHeaders

      return api(originalConfig) // 요청 재시도 후 결과를 반환 함
    } catch {
      // 리프레시도 못불러온다?
      removeAccessToken() // 제거
      window.location.href = '/login' // 응 ~ 로그인페이지로 잘가
      return Promise.reject(err)
    }
  }
)

export default api
