import { Link, Outlet } from "react-router-dom"

function Navigation (){
    return (
        <>

            <header className="bg-gray-900 sticky top-0 opacity-80">

                <section className="max-w-6xl text-cyan-400 mx-auto flex justify-between py-4 px-1 lg:px-0 select-none">
                    <Link to="/" className="text-lg sm:text-2xl font-serif">
                        🎧Music Cloud
                    </Link>

                    <nav className="text-base sm:text-lg font-sans space-x-3 text-white ">
                        <Link to="/login" className="hover:text-cyan-300 opacity-75 hover:opacity-100 transition ease-in-out duration-300">Login</Link>
                        <Link to="/register" className="hover:text-cyan-300  hover: opacity-75 hover:opacity-100 transition ease-in-out duration-300">Register</Link>
                    </nav>
                </section>

            </header>
            
            <div className=" mx-auto max-w-6xl px-1 lg:px-0">
                <Outlet/>
            </div>
        </>
    )
}

export default Navigation