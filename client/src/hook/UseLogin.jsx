import { useAuthContext } from "./UseAuthContext"
import { useNavigate } from "react-router-dom";
import { useState } from 'react'

export const useLogin =()=>{
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

const login = async(email,password) =>{
    setIsLoading(true)
    setError(null)

    const response = await fetch (`${process.env.SERVER_ADDRESS}/api/users/login`,{
        method:'POST',
        headers:{
            'Content-Type' :'application/json'
        },
        body:JSON.stringify({email,password})
    })

    const json = await response.json()

    if(!response.ok){
        setIsLoading(false)
        setError(json.error)
    }


    if(response.ok){
        //save the user to local storage
        localStorage.setItem('user',JSON.stringify(json))

        //update the auth context
        dispatch({type:'LOGIN',payload:json})

        //update
        setIsLoading(false)
    }
}

return{isLoading,error,login}
}