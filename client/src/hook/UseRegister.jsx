import { useState } from "react"
import { useAuthContext } from "./UseAuthContext"




export const useRegister =()=>{
    const[error,setError] = useState(null)
    const [isLoading,setIsLoading] = useState(null)
    const {dispatch} = useAuthContext();

    const register = async (email, password, username) => {
        setIsLoading(true);
        setError(null);
      
      
        const response = await fetch(`${process.env.SERVER_ADDRESS}/api/users/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, username }),
        });
      
        const json = await response.json();
      
        if (!response.ok) {
          setIsLoading(false);
          setError(json.error);
        }
      
        if (response.ok) {
          localStorage.setItem('user', JSON.stringify(json));
          dispatch({ type: 'LOGIN', payload: json });
          setIsLoading(false);
        }
      };
      
    return{register,isLoading,error}
}