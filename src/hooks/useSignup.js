import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import http from "../Services/httpService";

export const useSignup = () => {
  const [ error, setError ] = useState(null)
  const [ isLoading, setIsLoading ] = useState(null)
  const { dispatch } = useAuthContext();

  const signup = async (userName,email, password,check) => {
    setError(null)
    setIsLoading(true)
    const options = {
      method: 'POST',
      mode:"cors",
      headers: {"Content-Type": "application/json"}
    };
    const body = JSON.stringify({userName, email, password, check});
    
    try {
      const response = await http.post('/api/auth/signup', body, options)
      console.log('hi');
      console.log(response);
      
      //save the user to local storage
      localStorage.setItem('user', JSON.stringify(response.data.user))
      
      //update the auth context
      dispatch({type:"LOGIN", payload: response.user})

    } catch (error) {
      console.log(error);
      if (!!error.response){
        setError(error.response.data.error)
      }else{
        setError('internal error')
      }
      setIsLoading(false)
    }
    setTimeout(()=>{
      setError(null)
    }, 4000)
  }

  return {signup, isLoading, error}
}