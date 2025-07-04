import { useEffect, useRef, useState } from "react";
import useReqSinglePlaylist from "../hook/useReqSinglePlaylist";

function Home(){
    const [ isLoading, error, playlistData] = useReqSinglePlaylist();
    const [ music,setMusic ] = useState(null);

    const audioRef = useRef();
    const [ isPlaying, setIsPlaying ] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    
    // duration & current time
    const [ duration, setDuration ] = useState(0)
    const [ currentTime, setCurrentTime ] = useState(0)

    // music play button & play each music
    useEffect(() => {
        const audio = audioRef.current;
        if(isPlaying){
            audio.play();
        }else{
            audio.pause();
        }
    }, [isPlaying, music])

    // auto next music
    function autoNext(){
        const nextIndex = currentIndex + 1;
        if(playlistData && playlistData.music_name.length > 0 && nextIndex <= playlistData.music_name.length -1 ){
            setCurrentIndex(nextIndex)
            const music = `${import.meta.env.VITE_BACKEND_UPLOADS_URL}/${playlistData.music_name[nextIndex]}`;
            setMusic(music);
        }else{
            setIsPlaying(false)
        }

    }

    // previous button
    function previousBtn(){
        const previousIndex = currentIndex - 1;
        if(playlistData && playlistData.music_name.length > 0 && previousIndex >= 0 ){
            setCurrentIndex(previousIndex);
            const music = `${import.meta.env.VITE_BACKEND_UPLOADS_URL}/${playlistData.music_name[previousIndex]}`;
            setMusic(music);
            setIsPlaying(true)
        }else{
            setIsPlaying(false)
        }
    }

    // next buton
    function nextBtn(){
        const nextIndex = currentIndex + 1;
        if(playlistData && playlistData.music_name.length > 0 && nextIndex <= playlistData.music_name.length -1 ){
            setCurrentIndex(nextIndex);
            const music = `${import.meta.env.VITE_BACKEND_UPLOADS_URL}/${playlistData.music_name[nextIndex]}`;
            setMusic(music);
            setIsPlaying(true)
        }else{
            setIsPlaying(false)
        }
    }

    return (
        <div className="h-screen flex flex-col items-center mt-6">
            <h1 className="text-2xl font-bold select-none text-gray-400 font-mono mt-4 mb-6">Enjoy your Life</h1>

            <section className="backdrop-blur-md bg-white/10 border border-white/30 rounded-xl w-4/5 sm:w-1/2 lg:w-1/3 p-4">
                {/* show music list */}
                {   
                    isLoading ?
                         <div className="loader mx-auto mb-20"></div>
                    :
                    playlistData.length == 0 ?
                    <div className="select-none text-center text-2xl font-sans">EMPTY</div>
                    :
                    <div className="text-lg h-40 overflow-hidden overflow-y-scroll px-3 mb-4">
                        {
                            playlistData.music_name.map((music,index) => <div key={index} className="border-b-1 text-rose-800 border-gray-400 text-center cursor-pointer hover:opacity-75 py-2 text-md font-sans" onClick={() => {
                                setMusic(`${import.meta.env.VITE_BACKEND_UPLOADS_URL}/${music}`)
                                setIsPlaying(true)
                                setCurrentIndex(index)
                            }}>{music.split("_")[3].split(".")[0]}</div>)
                        }
                    </div>
                }

                <div>
                    {/* time & progress bar */}
                    <div className="h-1 m-auto mb-0 p-0">

                        <div className="opacity-80 text-gray-400 text-center select-none">{
                        `${currentTime == 0 ? '00:00' : 
                            `${Math.floor(currentTime/60) < 10 ? `0${Math.floor(currentTime/60)}` : Math.floor(currentTime/60)}:${Math.floor(currentTime%60) < 10 ? `0${Math.floor(currentTime%60)}` : Math.floor(currentTime%60)}`
                        }
                        /
                        ${duration == 0 ? '00:00' : 
                            `${Math.floor(duration/60)}:${Math.floor(duration%60)}`
                        }`}
                        </div>

                        <input type="range"  
                            className="w-full appearance-none h-1 bg-rose-800 rounded"
                            min="0"
                            max={duration}
                            value={currentTime}
                            onChange={(e) => {
                                console.log(e.target.value)
                                const newTime = parseFloat(e.target.value);
                                audioRef.current.currentTime = newTime;
                                setCurrentTime(newTime);
                            }}
                        />

                    </div>

                     {/* button */}
                    <div className="select-none m-auto w-[150px] md:w-[200] relative top-12">
                        <span className="text-3xl cursor-pointer active:scale-80 duration-500 absolute left-0 text-rose-800" onClick={() => previousBtn()}>⏮</span>
                        
                        {
                            isPlaying ?
                            <span className="text-3xl cursor-pointer active:scale-80 duration-500  absolute text-rose-800 left-13 sm:left-16" onClick={() => setIsPlaying()}>⏸</span>
                            :
                            <span className="text-3xl cursor-pointer active:scale-80 duration-500 absolute left-13 sm:left-16 text-rose-800" onClick={() => setIsPlaying(true)}>▶</span>
                        }



                        <span className="text-3xl cursor-pointer active:scale-80 duration-500 absolute right-0 text-rose-800" onClick={() => nextBtn()}>⏭</span>
                    </div>

                    {/* ------------------ */}
                        <audio 
                            src={
                                music ? 
                                    music
                                :
                                playlistData.music_name && playlistData.music_name.length > 0  ?
                                `${import.meta.env.VITE_BACKEND_UPLOADS_URL}/${playlistData.music_name[0]}`
                                :
                                music
                            }
                            ref={audioRef}
                            onEnded={autoNext}
                            onLoadedMetadata={() => {
                                const audio = audioRef.current;
                                setDuration(audio.duration);
                            }}
                            onTimeUpdate={() => {
                                const audio = audioRef.current;
                                setCurrentTime(audio.currentTime);
                            }}
                        />
                    {/* ------------------ */}


                </div>

                <div className="mt-24 text-rose-800 text-lg font-bold font-monospace select-none text-center bg-">{playlistData.playlist_name}</div>

            </section>

            <div className="mt-20 text-red-500 text-lg font-bold font-monospace select-none text-center bg-">{error.length > 0 && error[0].msg}</div>
        </div>
    )
}

export default Home