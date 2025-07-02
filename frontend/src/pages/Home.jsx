import { useState } from "react";
import useReqSinglePlaylist from "../hook/useReqSinglePlaylist";

function Home(){
    const [ isLoading, error, playlistData] = useReqSinglePlaylist();
    const [ music,setMusic ] = useState(null);

    return (
        <div className="h-screen flex flex-col items-center mt-6">
            <h1 className="text-3xl font-bold select-none text-gray-400 font-mono">Enjoy your Life</h1>
            <section className="w-5/6 md:w-3/5 lg:w-2/4  mt-20">
                {   
                    isLoading ?
                         <div className="loader mx-auto mb-20"></div>
                    :
                    playlistData.length == 0 ?
                    <div className="select-none text-center text-2xl font-sans">EMPTY</div>
                    :
                    <div className="text-lg h-50 overflow-hidden overflow-y-scroll px-3">
                        {
                            playlistData.music_name.map(music => <div key={music} className="border-b-1 text-cyan-700 border-gray-300 pt-2 pb-4 text-center cursor-pointer hover:opacity-75" onClick={() => setMusic(`${import.meta.env.VITE_BACKEND_UPLOADS_URL}/${music}`)}>{music.split("_")[3].split(".")[0]}</div>)
                        }
                    </div>
                }
                <div>
                    <div className="h-1 bg-rose-400 rounded-lg my-6 w-[280px] m-auto">
                        <div className="h-full bg-black w-1/5"></div>
                    </div>
                    <div className="select-none m-auto w-[150px] bg-blue-500 md:w-[200] relative ">
                        <span className="text-3xl cursor-pointer active:scale-80 duration-500 absolute left-0">⏮️</span>
                        <span className="text-3xl cursor-pointer active:scale-80 duration-500 absolute left-13 sm:left-14">▶️</span>
                        <span className="text-3xl cursor-pointer active:scale-80 duration-500 hidden absolute">⏹️</span>
                        <span className="text-3xl cursor-pointer active:scale-80 duration-500 absolute right-0">⏭️</span>
                    </div>
                    {/* ------------------ */}
                        {/* <audio src={music} controls/> */}
                    {/* ------------------ */}
                </div>
                <div className="mt-20 text-cyan-500 text-lg font-bold font-monospace select-none text-center bg-">{playlistData.playlist_name}</div>
            </section>
                <div className="mt-20 text-red-500 text-lg font-bold font-monospace select-none text-center bg-">{error.length > 0 && error[0].msg}</div>
        </div>
    )
}

export default Home