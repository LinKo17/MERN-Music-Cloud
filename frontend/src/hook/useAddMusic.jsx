import { useState } from "react"

const useAddMusic = () => {
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState([]);

    const addMusic = async (formData) => {
        setIsLoading(true)
        setError([])
        const response = await fetch(`${import.meta.env.VITE_BACKEND_PLAYLIST_URL}/create`,{
            method : "POST",
            credentials : 'include',
            body : formData
        });

        const result = await response.json();

        if(response.ok){
            setIsLoading(false)
            setError([])
            console.log("OK")
        }else{
            setIsLoading(false)
            // console.log(result)
            setError(result.message)
            console.log("NOT OK")
        }

    }
    return [ isLoading, error, addMusic ];
}

export default useAddMusic