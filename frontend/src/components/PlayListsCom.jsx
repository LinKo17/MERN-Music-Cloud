import SinglePlayList from "@/components/SinglePlayList"
function PlayListsCom(){
    return (
        <section className="mt-6">
            <h1 className="text-center text-lg sm:text-2xl my-10">Music Playlists</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-2 sm:mx-0 ">
                <SinglePlayList/>
                <SinglePlayList/>
                <SinglePlayList/>
                <SinglePlayList/>

            </div>
        </section>
    )
}
export default PlayListsCom