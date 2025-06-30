import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const useReqSinglePlaylist = () => {
    const token = useSelector(state => state.auth.token);

    const [ isLoading, setIsloading ] = useState(false)
    const [ error, setError ] = useState([])
    const [ playlistData , setPlaylistData ] = useState([])

    const cookieResult = document.cookie ? document.cookie.split("=")[1] : "";
    console.log(cookieResult);

    useEffect(() => {
        async function fetchingData(){
            setIsloading(true)
            const response = await fetch(`${import.meta.env.VITE_BACKEND_PLAYLIST_URL}/playlist`,{
                method : "POST",
                credentials : 'include',
                headers:{
                    "Content-type": "application/json",
                    "Authorization" : `Bearer ${token}`
                },
                body: JSON.stringify({
                    playlist_name : cookieResult
                })
            })
            
            const result = await response.json()
            if(response.ok){
                setPlaylistData(result.message)
                setIsloading(false)
            }else{
                setError(result.message)
                setIsloading(false)
            }
            
        }

        fetchingData()
    },[cookieResult])

    return [ isLoading, error, playlistData ];
}

export default useReqSinglePlaylist