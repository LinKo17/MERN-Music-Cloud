import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { ASSIGN_PLAYLISTS } from "../context/playlistSlice";

const useDeleteSinglePlaylist = () => {
    const token = useSelector(state => state.auth.token)
    const dispatch = useDispatch();

    const [ isLoading , setIsLoading ] = useState(false);
    const [ error, setError ] = useState([]);
    
    async function deleteSinglePlaylist(obj){
        setIsLoading(true)
        const response = await fetch(`${import.meta.env.VITE_BACKEND_PLAYLIST_URL}/delete`,{
            method : "POST",
            credentials : "include",
            headers : {
                "Content-Type" : 'application/json',
                "Authorization" : `Bearer ${token}`
            },
            body : JSON.stringify(obj)
        })

        const result = await response.json();
        if(response.ok){
            setIsLoading(false)
            dispatch(ASSIGN_PLAYLISTS({
                playlistLoading : false,
                playlistError : [],
                playlistData : result.message
            }));
            setError([]);
        }else{
            setIsLoading(false)
            dispatch(ASSIGN_PLAYLISTS({
                playlistLoading : false,
                playlistError : [],
                playlistData : result.message
            }))
            setError([])
        }
    }

    return [ isLoading, error, deleteSinglePlaylist ];
}

export default useDeleteSinglePlaylist