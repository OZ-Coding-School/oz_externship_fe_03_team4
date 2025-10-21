import axios from 'axios'
import { getAccessToken, removeAccessToken } from './token'
import Cookies from 'js-cookie'

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
  async (err) => {
    if (err.response?.status === 401) {
      try {
        const refreshRes = await axios.post(
          '/auth/refresh', // 엔드포인트 추후 수정
          {},
          { withCredentials: true }
        )
        const newToken = refreshRes.data.accessToken
        Cookies.set('accessToken', newToken)
        err.config.headers.Authorization = `Bearer ${newToken}`
        return api(err.config)
      } catch (e) {
        removeAccessToken()
        window.location.href = '/login'
      }
    }
    return Promise.reject(err)
  }
)

export default api
