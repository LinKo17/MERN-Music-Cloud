import { useState } from "react"
import { useDispatch} from "react-redux"
import { ASSIGN_PLAYLISTS } from "../context/playlistSlice";

const useAddMusic = () => {
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState([]);
    const [ successUpload, setSuccessUpload ] = useState(false)
    const dispatch = useDispatch();
    
    const addMusic = async (formData,token) => {
        setIsLoading(true)
        setSuccessUpload(false)
        
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
            dispatch(ASSIGN_PLAYLISTS({
                playlistLoading : false,
                playlistError : [],
                playlistData : result.message
            }))
            setSuccessUpload(true)
            setError([])
        }else{
            setIsLoading(false)
            setError(result.message)
        }

    }
    return [ isLoading, error, addMusic, successUpload ];
}

export default useAddMusic