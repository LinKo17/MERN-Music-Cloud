import AddMusic from "@/components/AddMusic"
import PlayListsCom from "@/components/PlaylistsCom"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { ASSIGN_PLAYLISTS } from "../context/playlistSlice";

function PlayLists (){

    const [isLoading,setIsLoading] = useState(false);
    const [error, setError ] = useState(false);
    const [ playlists, setPlayLists ] = useState([]);

    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch();
    
    useEffect(() => {
        setIsLoading(true)
        const fetchingData = async () => {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_PLAYLIST_URL}/show`,{
                method : "POST",
                credentials : "include",
                headers:{
                    "Authorization" : `Bearer ${token}`
                }
            })

            const result = await response.json()
            if(response.ok){
                setPlayLists(result.message)
                setIsLoading(false)
            }else{
                setError(result.message);
                setIsLoading(false)
            }
        }

        fetchingData();

    },[token])

    console.log({isLoading, error, playlists});
    
    return (
        <>
            {/* Add Music Form */}
            <AddMusic/>

            {/* All Playlists */}
            <PlayListsCom/>
            
        </>
    )
}

export default PlayLists