import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import http from "../Services/httpService";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const navigate = useNavigate()
  const [ error, setError ] = useState(null)
  const [ isLoading, setIsLoading ] = useState(null)
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    
    setError(null)
    setIsLoading(true)
    const options = {
      method: 'POST',
      mode:"cors",
      headers: {"Content-Type": "application/json"}
    };
    const body = JSON.stringify({ email, password, });

    try {
      
      if (Boolean(!email)  || Boolean(!password)) {
        throw Error('all fields required')         
      }
      
      const response = await http.post('/api/auth/signin', body, options)
                  
      //update the auth context
      dispatch({type:"LOGIN", payload: response.data})
      alert('logged in successfully')
      navigate('/')
      setIsLoading(false)
    } catch (error) {
      console.log(error);
      if (!!error.response){
        setError(error.response.data.error)
      }else{
        setError(error.message)
      }
      setIsLoading(false)
    }
    setTimeout(()=>{
      setError(null)
    }, 4000)
  }

  return {login, isLoading, error}
}