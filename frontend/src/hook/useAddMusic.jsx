import { useState } from "react"

const useAddMusic = () => {
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState([]);

    const addMusic = async (formData,token) => {
        setIsLoading(true)
        setError([])
        const response = await fetch(`${import.meta.env.VITE_BACKEND_PLAYLIST_URL}/create`,{
            method : "POST",
            credentials : 'include',
            headers:{
                'Authorization': `Bearer ${token}`
            },
            body : formData
        });

        const result = await response.json();

        if(response.ok){
            setIsLoading(false)
            setError([])
        }else{
            setIsLoading(false)
            setError(result.message)
        }

    }
    return [ isLoading, error, addMusic ];
}

export default useAddMusic