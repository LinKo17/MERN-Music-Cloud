import { useState } from "react";

const useLogin = () => {
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error , setError ] = useState([]);

    const login = async (data) => {
        setIsLoading(true)
        const response = await fetch(`${import.meta.env.VITE_BACKEND_USER_URL}/login`,{
            method : "POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(data)
        });

        const result = await response.json();

        if(response.ok){
            setIsLoading(false)
            console.log(result)
        }else{
            setIsLoading(false)
            setError(result && result.message)
        }
    }
    
    return [ isLoading, error, login ];
}

export default useLogin;