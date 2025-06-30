function SinglePlayList({obj}){

    function playHandler(){
        console.log("play")
    }

    function deleteHandler(){
        console.log("delete")
    }

    return (
        <section className="select-none pb-10">
            <div className="flex justify-between bg-blue-500 text-white px-2 py-3 text-lg rounded rounded-b-none">
                <span>{obj.playlist_name}</span>
                <span className="cursor-pointer">
                    {
                        obj.option == "public" ? "🌐" : "🔒"
                    }
                </span>
            </div>
            <div className="min-h-1 max-h-40 overflow-y-scroll overflow-x-hidden border border-t-0 border-l-0 border-r-0 border-gray-500">
                {
                    obj.music_name.map(e => <div key={e} className="border border-gray-500 border-t-0 p-2  text-md flex justify-between relative group">
                        <div>
                            {e.split("_")[3].split(".")[0] } 
                        </div>
                        <div className="space-x-2 absolute right-0 top-10 opacity-0 group-hover:opacity-100 group-hover:top-1 transition-all duration-500">
                            <span className="text-xl cursor-pointer" onClick={playHandler}>▶</span>
                            <span className="text-xl cursor-pointer" onClick={deleteHandler}>🗑️</span>
                        </div>
                    </div>)
                }
            </div>
        </section>
    )
}
export default SinglePlayList