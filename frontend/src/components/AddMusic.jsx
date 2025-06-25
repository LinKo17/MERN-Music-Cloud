import { useState } from "react"

function AddMusic(){
    // const [checkPlaylistTap, setCheckPlaylistTap ] = useState("new")
    const [ uploadMusic, setUploadMusic ] = useState({
        playlistOption : "new",
        playlistName : "",
        musicName : "",
        musicFile : "",
        option :""
    });

    function uploadMusicHandler(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append("playlistOption", uploadMusic.playlistOption);
        formData.append("playlistName", uploadMusic.playlistName);
        formData.append("musicName", uploadMusic.musicName);
        formData.append("musicFile", uploadMusic.musicFile);
        formData.append("option", uploadMusic.option);
        console.log(formData)
    }

    return (
        <section className="bg-white w-4/5 sm:w-1/2 lg:w-1/3 m-auto rounded-lg py-2 px-5 select-none mt-5 sm:mt-6  lg:mt-10">
            <h1 className="text-center text-lg sm:text-2xl mb-4">Add Music</h1>
            <form onSubmit={uploadMusicHandler} encType="multipart/form-data">

                <div className="my-3 flex flex-col">
                    <label htmlFor="playlistTap" className="text-[17px]">Playlist</label>
                    <select id="playlistTap" className="border mt-1 p-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-300" onChange={e => setUploadMusic({...uploadMusic, playlistOption : e.target.value})} value={uploadMusic.playlistOption}>
                        <option value="new" >New</option>
                        <option value="example_1">Example 1</option>
                        <option value="example_2">Example 2</option>
                    </select>
                </div>

                {
                    uploadMusic.playlistOption == "new" &&
                
                    <div className="my-3 flex flex-col">
                        <label htmlFor="playlistNameTap" className="text-[17px]">Playlist Name</label>
                        <input type="text" id="playlistNameTap" className="border rounded p-2 my-1 focus:outline-none focus:ring-2 focus:ring-cyan-300" placeholder="playlist name" onChange={e => setUploadMusic({...uploadMusic, playlistName : e.target.value})} value={uploadMusic.playlistName}/>
                    </div>
                }

                <div className="my-3 flex flex-col">
                    <label htmlFor="musicNameTap" className="text-[17px]">Music Name</label>
                    <input type="text" id="musicNameTap" className="border rounded p-2 my-1 focus:outline-none focus:ring-2 focus:ring-cyan-300" placeholder="music name" value={uploadMusic.musicName} onChange={e => setUploadMusic({
                        ...uploadMusic, musicName : e.target.value
                    })}/>
                </div>
                
                <div className="my-3 flex flex-col">
                    <label htmlFor="uploadMusicTap" className="text-[17px]">Upload Music</label>
                    <input type="file" id="uploadMusicTap" className="border rounded p-2 my-1 focus:outline-none focus:ring-2 focus:ring-cyan-300"  onChange={e => setUploadMusic({
                        ...uploadMusic, musicFile : e.target.files[0]
                    })}/>
                </div>

                {
                    uploadMusic.playlistOption == "new" &&
                    <div className="mt-4 mb-6 flex flex-row space-x-2">
                        <div className="space-x-1">
                            <input type="radio" name="option" id="publicOption" onChange={e => setUploadMusic({...uploadMusic, option : e.target.value})} value="public"/>
                            <label htmlFor="publicOption" >Public</label>
                        </div>
                        <div className="space-x-1">
                            <input type="radio" name="option" id="privateOption" onChange={e => setUploadMusic({...uploadMusic, option : e.target.value})} value="private"/>
                            <label htmlFor="privateOption">Private</label>
                        </div>
                    </div>
                }

                <div className="my-3">
                    <button className="bg-blue-500 text-center p-2 w-full rounded text-white cursor-pointer active:scale-95 transition duration-100">Submit</button>
                </div>

            </form>
        </section>
    )
}
export default AddMusic