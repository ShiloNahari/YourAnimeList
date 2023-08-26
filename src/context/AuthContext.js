import { createContext, useEffect, useReducer } from "react";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";


export const AuthContext = createContext();

export const authReducer = (user, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload };

    case 'LOGOUT':
      return { user: null };

    default:
      return user;
  }
}

export const AuthContextProvider = ({ children }) => {
  const [user, dispatch] = useReducer(authReducer, {
    user: null
  })
  useEffect(()=>{
    const loadUserDataFromCookie = async() => {
      try {
        const tokenCookie = Cookies.get('token');
      if (tokenCookie){
        dispatch({type:"LOGIN", payload: await jwtDecode(tokenCookie)})
      } else {
        dispatch({type:"LOGOUT", payload:null})
      }
      } catch (error) {
        console.log(error);
      }
    }
    loadUserDataFromCookie()
  },[])


  return (
    <AuthContext.Provider value={{...user, dispatch}}>
      { children }
    </AuthContext.Provider>
  )
}