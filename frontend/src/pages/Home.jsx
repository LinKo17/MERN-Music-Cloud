function Home(){
    const playlistExists = true;
    return (
        <div className="h-screen flex flex-col items-center mt-6">
            <h1 className="text-3xl font-bold select-none text-gray-400 font-mono">Enjoy your Life</h1>
            <section className="w-5/6 md:w-3/5 lg:w-2/4  mt-20">
                {
                    !playlistExists ?
                    <div className="select-none text-center text-2xl font-sans">EMPTY</div>
                    :
                    <div className="text-lg h-50 overflow-hidden overflow-y-scroll px-3">
                        <div className="border-b-1 text-cyan-700 border-gray-300 pt-2 pb-4 text-center cursor-pointer hover:opacity-75">Lorem ipsum dolor sit amet, consectetur</div>
                        <div className="border-b-1 text-cyan-700 border-gray-300 pt-2 pb-4 text-center cursor-pointer hover:opacity-75">Lorem ipsum dolor sit amet, consectetur</div>
                        <div className="border-b-1 text-cyan-700 border-gray-300 pt-2 pb-4 text-center cursor-pointer hover:opacity-75">Lorem ipsum dolor sit amet, consectetur</div>
                        <div className="border-b-1 text-cyan-700 border-gray-300 pt-2 pb-4 text-center cursor-pointer hover:opacity-75">Lorem ipsum dolor sit amet, consectetur</div>
                        <div className="border-b-1 text-cyan-700 border-gray-300 pt-2 pb-4 text-center cursor-pointer hover:opacity-75">Lorem ipsum dolor sit amet, consectetur</div>
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
                </div>
            </section>
        </div>
    )
}

export default Home