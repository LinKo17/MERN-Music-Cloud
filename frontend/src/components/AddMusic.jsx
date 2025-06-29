import { useEffect, useState } from "react"
import useAddMusic from "../hook/useAddMusic";
import { useSelector } from "react-redux"

function AddMusic(){
    const token = useSelector(state => state.auth.token);
    const { playlistLoading, playlistError, playlistData} = useSelector(state => state.playlist.playlists)


    const [ uploadMusic, setUploadMusic ] = useState({
        playlistOption : "new",
        playlistName : "",
        musicName : "",
        musicFile : "",
        option :""
    });

    const [ isLoading, error, addMusic, successUpload ] = useAddMusic();

    function uploadMusicHandler(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append("playlistOption", uploadMusic.playlistOption);
        formData.append("playlistName", uploadMusic.playlistName);
        formData.append("musicName", uploadMusic.musicName);
        formData.append("musicFile", uploadMusic.musicFile);
        formData.append("option", uploadMusic.option);
        addMusic(formData,token)
    }

    useEffect(() => {
        if(successUpload){
            setUploadMusic({
                playlistOption : "new",
                playlistName : "",
                musicName : "",
                musicFile : "",
                option :""
            })
        }
    },[successUpload])

    return (
        <section className="bg-white w-4/5 sm:w-1/2 lg:w-1/3 m-auto rounded-lg py-2 px-5 select-none mt-5 sm:mt-6  lg:mt-10">
            <h1 className="text-center text-lg sm:text-2xl mb-4">Add Music</h1>

            {
                !playlistLoading && 
                <form onSubmit={uploadMusicHandler} encType="multipart/form-data">

                    <div className="my-3 flex flex-col">
                        <label htmlFor="playlistTap" className="text-[17px]">Playlist</label>
                        <select id="playlistTap" className="border mt-1 p-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-300" onChange={e => setUploadMusic({...uploadMusic, playlistOption : e.target.value})} value={uploadMusic.playlistOption}>
                            <option value="new" >New</option>
                            {
                               playlistData.map(e => {
                                    return <option key={e._id}value={e.playlist_name}>{e.playlist_name}</option>
                               })
                            }
                        </select>
                        {
                            error.length != 0 && error.find(e => e.path == "playlistOption") &&
                            <div className="text-red-500">{error.find(e => e.path == "playlistOption").msg}</div>
                        }
                    </div>

                    {
                        uploadMusic.playlistOption == "new" &&
                    
                        <div className="my-3 flex flex-col">
                            <label htmlFor="playlistNameTap" className="text-[17px]">Playlist Name</label>
                            <input type="text" id="playlistNameTap" className="border rounded p-2 my-1 focus:outline-none focus:ring-2 focus:ring-cyan-300" placeholder="playlist name" onChange={e => setUploadMusic({...uploadMusic, playlistName : e.target.value})} value={uploadMusic.playlistName}/>
                            {
                                error.length != 0 && error.find(e => e.path == "playlistName") &&
                                <div className="text-red-500">{error.find(e => e.path == "playlistName").msg}</div>
                            }
                        </div>
                    }

                    <div className="my-3 flex flex-col">
                        <label htmlFor="musicNameTap" className="text-[17px]">Music Name</label>
                        <input type="text" id="musicNameTap" className="border rounded p-2 my-1 focus:outline-none focus:ring-2 focus:ring-cyan-300" placeholder="music name" value={uploadMusic.musicName} onChange={e => setUploadMusic({
                            ...uploadMusic, musicName : e.target.value
                        })}/>
                        {
                            error.length != 0 && error.find(e => e.path == "musicName") &&
                            <div className="text-red-500">{error.find(e => e.path == "musicName").msg}</div>
                        }
                    </div>
                    
                    <div className="my-3 flex flex-col">
                        <label htmlFor="uploadMusicTap" className="text-[17px]">Upload Music</label>
                        <input type="file" id="uploadMusicTap" className="border rounded p-2 my-1 focus:outline-none focus:ring-2 focus:ring-cyan-300"  onChange={e => setUploadMusic({
                            ...uploadMusic, musicFile : e.target.files[0]
                        })}/>
                        {
                            error.length != 0 && error.find(e => e.path == "musicFile") &&
                            <div className="text-red-500">{error.find(e => e.path == "musicFile").msg}</div>
                        }
                    </div>

                    {
                        uploadMusic.playlistOption == "new" &&
                        <div className="mt-4 mb-6">
                            <div className="flex flex-row space-x-2">
                                <div className="space-x-1">
                                    <input type="radio" name="option" id="publicOption" onChange={e => setUploadMusic({...uploadMusic, option : e.target.value})} value="public"/>
                                    <label htmlFor="publicOption" >Public</label>
                                </div>
                                <div className="space-x-1">
                                    <input type="radio" name="option" id="privateOption" onChange={e => setUploadMusic({...uploadMusic, option : e.target.value})} value="private"/>
                                    <label htmlFor="privateOption">Private</label>
                                </div>
                            </div>
                            {
                                error.length != 0 && error.find(e => e.path == "option") &&
                                <div className="text-red-500">{error.find(e => e.path == "option").msg}</div>
                            }
                        </div>
                    }

                    <div className="my-3">
                        <button className="bg-blue-500 text-center p-2 w-full rounded text-white cursor-pointer active:scale-95 transition duration-100" disabled={isLoading}>Submit</button>
                    </div>

                </form>
            }

        </section>
    )
}
export default AddMusic