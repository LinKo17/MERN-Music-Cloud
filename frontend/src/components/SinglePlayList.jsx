function SinglePlayList({obj}){
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
                    obj.music_name.map(e => <div key={e} className="border border-gray-500 border-t-0 p-2 cursor-pointer text-md">
                        {e.split("_")[3].split(".")[0] }
                    </div>)
                }
            </div>
        </section>
    )
}
export default SinglePlayList