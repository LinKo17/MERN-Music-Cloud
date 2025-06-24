function SinglePlayList(){
    return (
        <section className="select-none pb-10">
            <div className="flex justify-between bg-blue-500 text-white px-2 py-3 text-lg rounded rounded-b-none">
                <span>Example</span>
                <span className="cursor-pointer">🔒🌐</span>
            </div>
            <div className="h-40 overflow-y-scroll overflow-x-hidden border border-t-0 border-l-0 border-r-0 border-gray-500">
                <div className="border border-gray-500 border-t-0 p-2 cursor-pointer text-md">music 1</div>
                <div className="border border-gray-500 border-t-0 p-2 cursor-pointer text-md">music 2</div>
                <div className="border border-gray-500 border-t-0 p-2 cursor-pointer text-md">music 3</div>
                <div className="border border-gray-500 border-t-0 p-2 cursor-pointer text-md">music 4</div>
                <div className="border border-gray-500 border-t-0 p-2 cursor-pointer text-md">music 5</div>
            </div>
        </section>
    )
}
export default SinglePlayList