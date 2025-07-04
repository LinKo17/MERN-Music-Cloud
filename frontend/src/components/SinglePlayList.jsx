import { useNavigate } from "react-router-dom"
import useDeleteSingleMusic from "../hook/useDeleteSingleMusic";
import useDeleteSinglePlaylist from "../hook/useDeleteSinglePlaylist";

function SinglePlayList({obj}){
    const navigate = useNavigate();
    const [ , , deleteSingleMusic] = useDeleteSingleMusic();
    const [ , , deleteSinglePlaylist] = useDeleteSinglePlaylist();

    function playHandler(obj){
        document.cookie = `playingPT=${obj.playlist_name}`
        navigate('/');
    }

    function deleteHandler(obj,e){
        deleteSingleMusic({
            _id : obj._id,
            music_name : e
        })
    }

    function deletePlaylist(obj){
        if(confirm("Are you sure?")){
            deleteSinglePlaylist({
                _id : obj._id
            })
        }
    }

    return (
        <section className="select-none pb-10 backdrop-blur-md bg-white/10 border border-white/30 rounded-xl mb-20">
            <div className="flex justify-between bg-rose-800 text-white px-2 py-3 text-lg rounded-xl rounded-b-none">
                <span>{obj.playlist_name}</span>
                <div>
                    <span className="cursor-pointer me-2" onClick={() => playHandler(obj)}>▶</span>
                    <span className="cursor-pointer me-2" onClick={() => deletePlaylist(obj)}>🗑️</span>
                    <span className="cursor-pointer">
                        {
                            obj.option == "public" ? "🌐" : "🔒"
                        }
                    </span>
                </div>
            </div>
            <div className="min-h-1 max-h-40 overflow-y-scroll overflow-x-hidden text-white">
                {
                    obj.music_name.map((e,index) => <div key={index} className="border-b-1 border-gray-400 p-2  text-md flex justify-between relative group">
                        <div>
                            {e.split("_")[3].split(".")[0] } 
                        </div>
                        <div className="space-x-2 absolute right-0 top-10 opacity-0 group-hover:opacity-100 group-hover:top-1 transition-all duration-500">
                            {/* <span className="text-xl cursor-pointer" onClick={() => playHandler(index,obj,e)}>▶</span> */}
                            <span className="text-xl cursor-pointer" onClick={() => deleteHandler(obj,e)}>🗑️</span>
                        </div>
                    </div>)
                }
            </div>
        </section>
    )
}
export default SinglePlayList