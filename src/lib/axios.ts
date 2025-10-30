import axios, { AxiosError } from 'axios'
import { getAccessToken, removeAccessToken, setAccessToken } from './token'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  withCredentials: true,
})

api.interceptors.request.use((config) => {
  const token = getAccessToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (res) => res,
  async (err: AxiosError) => {
    if (err.response?.status === 401) {
      try {
        const refreshRes = await api.post(
          '/v1/auth/refresh', // 엔드포인트 추후 수정
          {},
          { withCredentials: true }
        )
        const newToken = refreshRes.data.access
        if (!newToken)
          throw new Error('다시 로그인해 주시면 계속 이용하실 수 있어요.')
        setAccessToken(newToken)

        if (err.config?.headers) {
          err.config.headers.Authorization = `Bearer ${newToken}`
        }
        return api(err.config!)
      } catch {
        removeAccessToken()
        window.location.href = '/login'
      }
    }
    return Promise.reject(err)
  }
)

export default api
