import { createContext, useEffect, useState } from "react"
import Cookies from "js-cookie"
import jwtDecode from "jwt-decode"
import { signin, signout, signup } from '../Services/userService'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({ first: "shilo", age: 29 })
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const loadUserDataFromCookie = async () => {
      const tokenCookie = Cookies.get('token')
      if (tokenCookie){
        setUserData(await jwtDecode(tokenCookie))
        setIsAuthenticated(true)
      } else {
        setUserData(null)
        setIsAuthenticated(false)
      }
    }
    loadUserDataFromCookie();
  }, [])

  const signin = async (email, password) => {
    const options = {
      method: 'POST',
      mode:"cors",
      headers: {"Content-Type": "application/json"}
    };
    const body = JSON.stringify({ email, password, });


    try {
      
      const response = await signin(body, options)
      console.log('hi');
      console.log(response);
      console.log(response.data.user);
    } catch (error) {
      console.error("error: "+error);
    }
  }

  const signout = async () => {}

  const signup = async (email, password) => {}

  return (
    <UserContext.Provider
      value={{ userData, isAuthenticated, signin, signout, signup }}
    >
      {children}
    </UserContext.Provider>
  )
}
