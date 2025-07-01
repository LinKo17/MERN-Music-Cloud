import SinglePlayList from "@/components/SinglePlayList"
import { useSelector } from "react-redux"

function PlayListsCom(){
    const { playlistLoading, playlistError, playlistData} = useSelector(state => state.playlist.playlists);

    return (
        <>
            <section className="mt-6">
                <h1 className="text-center text-lg sm:text-2xl my-10">Music Playlists</h1>
                {
                    !playlistLoading &&

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-2 sm:mx-0 ">
                        {
                            playlistData.length != 0 ?
                            playlistData.map(e => <SinglePlayList key={e._id} obj={e}/>)
                            :
                            <h1 className="text-center text-2xl my-6">Empty</h1>
                        }

                    </div>

                }
            </section>
        </>
    )
}
export default PlayListsCom