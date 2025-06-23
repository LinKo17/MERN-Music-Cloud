import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ASSIGN } from "../context/AuthSlice";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error , setError ] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const login = async (data) => {
        setIsLoading(true)
        const response = await fetch(`${import.meta.env.VITE_BACKEND_USER_URL}/login`,{
            method : "POST",
            credentials : 'include',
            headers:{
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(data)
        });

        const result = await response.json();

        if(response.ok){
            setIsLoading(false)
            dispatch(ASSIGN(result.token))
            navigate('/');
        }else{
            setIsLoading(false)
            setError(result && result.message)
        }
    }
    
    return [ isLoading, error, login ];
}

export default useLogin;