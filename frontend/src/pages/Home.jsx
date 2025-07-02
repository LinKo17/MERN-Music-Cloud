import { useState } from "react";
import useReqSinglePlaylist from "../hook/useReqSinglePlaylist";

function Home(){
    const [ isLoading, error, playlistData] = useReqSinglePlaylist();
    const [ music,setMusic ] = useState(null);

    return (
        <div className="h-screen flex flex-col items-center mt-6">
            <h1 className="text-2xl font-bold select-none text-gray-400 font-mono mt-4 mb-6">Enjoy your Life</h1>
            <section className="backdrop-blur-md bg-white/10 border border-white/30 rounded-xl w-4/5 sm:w-1/2 lg:w-1/3 p-4">
                {   
                    isLoading ?
                         <div className="loader mx-auto mb-20"></div>
                    :
                    playlistData.length == 0 ?
                    <div className="select-none text-center text-2xl font-sans">EMPTY</div>
                    :
                    <div className="text-lg h-40 overflow-hidden overflow-y-scroll px-3 mb-10">
                        {
                            playlistData.music_name.map(music => <div key={music} className="border-b-1 text-rose-800 border-gray-400 text-center cursor-pointer hover:opacity-75 py-2 text-md font-sans" onClick={() => setMusic(`${import.meta.env.VITE_BACKEND_UPLOADS_URL}/${music}`)}>{music.split("_")[3].split(".")[0]}</div>)
                        }
                    </div>
                }
                <div>
                    <div className="h-1 bg-gray-400 rounded-lg my-6 w-[250px] m-auto">
                        <div className="h-full bg-red-400 w-1/5"></div>
                    </div>
                    <div className="select-none m-auto w-[150px] bg-blue-500 md:w-[200] relative ">
                        <span className="text-3xl cursor-pointer active:scale-80 duration-500 absolute left-0 text-rose-800">⏮</span>
                        <span className="text-3xl cursor-pointer active:scale-80 duration-500 absolute left-13 sm:left-16 text-rose-800">▶</span>
                        <span className="text-3xl cursor-pointer active:scale-80 duration-500 hidden absolute text-rose-800 left-13 sm:left-16">⏸</span>
                        <span className="text-3xl cursor-pointer active:scale-80 duration-500 absolute right-0 text-rose-800">⏭</span>
                    </div>
                    {/* ------------------ */}
                        {/* <audio src={music} controls/> */}
                    {/* ------------------ */}
                </div>
                <div className="mt-20 text-rose-300 text-lg font-bold font-monospace select-none text-center bg-">{playlistData.playlist_name}</div>
            </section>
                <div className="mt-20 text-red-500 text-lg font-bold font-monospace select-none text-center bg-">{error.length > 0 && error[0].msg}</div>
        </div>
    )
}

export default Home