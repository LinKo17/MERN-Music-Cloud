import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { UN_ASSIGN } from '@/context/authSlice';

const useLogout = () => {
    const [ isLoading, setIsLoading ] = useState(false);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logout = async (token) => {
        setIsLoading(true)
        const response = await fetch(`${import.meta.env.VITE_BACKEND_USER_URL}/logout`,{
            method : "POST",
            credentials : 'include',
            headers : {
                'Content-type' : 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        // const result = await response.json();

        if(response.ok){
            dispatch(UN_ASSIGN(""))
            setIsLoading(false)
            navigate("/login")
        }else{
            
            dispatch(UN_ASSIGN(""))
            setIsLoading(false)
             navigate("/login")
        }

    }

    return [ isLoading, logout ]
}

export default useLogout;