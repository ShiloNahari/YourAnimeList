import Cookies from 'js-cookie'
import { useAuthContext } from './useAuthContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const logout = () => {
    //remove user from Cookies
    Cookies.remove('token')

    //dispatch logout action
    dispatch({ type: 'LOGOUT' })
  }

  return { logout }
}

