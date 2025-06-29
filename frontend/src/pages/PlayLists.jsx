import AddMusic from "@/components/AddMusic"
import PlayListsCom from "@/components/PlaylistsCom"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { ASSIGN_PLAYLISTS } from "../context/playlistSlice";

function PlayLists (){

    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch();
    
    useEffect(() => {
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
                dispatch(ASSIGN_PLAYLISTS({
                    playlistLoading : false,
                    playlistError : [],
                    playlistData : result.message
                }))

            }else{
                dispatch(ASSIGN_PLAYLISTS({
                    playlistLoading : false,
                    playlistError : [],
                    playlistData : result.message
                }))
            }

        }

        fetchingData();

    },[token])
    
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