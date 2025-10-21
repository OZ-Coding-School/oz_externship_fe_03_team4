import api from './axios'

const RAW = import.meta.env.VITE_ADMIN_API_BASE ?? '/v1/admin'

// API요청을 합치는 함수
export const joinAdminPath = (suffix = '') => {
  const baseURL = (api.defaults.baseURL || '').replace(/\/+$/, '')
  const base = (RAW || '').replace(/\/+$/, '')      // let -> const 변경
  let path = `${base}${suffix}`
  if (baseURL.endsWith('/api') && path.startsWith('/api/')) {
    path = path.replace(/^\/api\//, '/')
  }
  return path
}

// 로그인한 유저의 role,토큰만료시간,로그인정보를 읽을 수 있음. 추후에 변경예정
export const parseJwt = (token?: string | null) => {
  if (!token) return null
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
    const json = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    return JSON.parse(json)
  } catch {
    return null
  }
}
