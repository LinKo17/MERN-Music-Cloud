import { useState } from "react"
import { useNavigate } from 'react-router-dom'

const useRegister = () => {
    const navigate = useNavigate();
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState([]);
    const [ registerSuccess, setRegisterSuccess ] = useState(false)
    const register = async (data) => {
        setIsLoading(true);

        const response = await fetch(`${import.meta.env.VITE_BACKEND_USER_URL}/register`,{
            method : "POST",
            headers :{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });


        const result = await response.json();
        console.log(result);
        

        if(response.ok){
            setIsLoading(false);
            setRegisterSuccess(true)
            navigate("/login");
        }else{
            setIsLoading(false);
            setError(result && result.message);
        }
    }

    return [ isLoading, error, register , registerSuccess];
}

export default useRegister