import { removeAccessToken } from './token'

export const logout = () => {
  removeAccessToken()
  window.location.replace('/login')
}
