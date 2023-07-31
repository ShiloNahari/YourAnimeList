import { createContext, useEffect, useReducer } from "react";
import jwtDecode from "jwt-decode";


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
    // const user = JSON.parse(localStorage.getItem('user'))

    // if(user){
    //   dispatch({type:'LOGIN', payload:user})
    // }
  },[])

  console.log('AuthContest user: ', user);

  return (
    <AuthContext.Provider value={{...user, dispatch}}>
      { children }
    </AuthContext.Provider>
  )
}