import { useDispatch, useSelector } from "react-redux"
import { Link, Outlet, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { ASSIGN } from "@/context/AuthSlice";
import useLogout from "../hook/useLogout";

function Navigation (){

    const token = useSelector(state => state.auth.token)
    const dispatch = useDispatch();

    const { pathname } = useLocation();
    // console.log(pathname);

    useEffect(() => {

        async function reqAccessToken(){
            const response = await fetch(`${import.meta.env.VITE_BACKEND_USER_URL}/refreshToken`,{
                method : "POST",
                credentials : "include",
                headers: {
                    'Content-type' : 'application/json',
                }
            });
    
            const result = await response.json();
            if(response.ok){
                dispatch(ASSIGN(result.accessToken));
            }
        }

        reqAccessToken()
        .catch(error => error );

    },[])

    const [ isLoading, logout ] = useLogout();

    function LogoutHandler (){
        logout(token)
    }

    const [ mobileMenu, setMobileMenu ] = useState(false)
    // console.log(mobileMenu)
    return (
        <>

            <header className={`bg-gray-900 sticky top-0 ${mobileMenu ? "opacity-100" : "opacity-80"} z-100`}>

                <section className="max-w-6xl text-rose-800 mx-auto flex justify-between py-4 px-1 lg:px-0 select-none">
                    <Link to="/" className="text-lg sm:text-2xl font-serif">
                        🎧Music Cloud
                    </Link>

                    {
                        token ?
                            <>
                                <nav className={`${mobileMenu ? "bg-black absolute top-0 w-full h-screen text-white  flex flex-col items-center pt-20 space-y-8 text-xl left-0" : "text-base sm:text-lg font-sans space-x-8 text-white hidden sm:block"}`}>

                                    <Link to="/" className={`hover:text-rose-300 opacity-75 hover:opacity-100 transition ease-in-out duration-300 ${pathname == "/" && "opacity-100 text-rose-300"}`} onClick={() => setMobileMenu(false)}>Home</Link> 

                                    <Link to="/playlists" className={`hover:text-rose-300 opacity-75 hover:opacity-100 transition ease-in-out duration-300 ${pathname == "/playlists" && "opacity-100 text-rose-300"}`} onClick={() => setMobileMenu(false)}>Playlists</Link> 

                                    <Link to="/public" className={`hover:text-rose-300 opacity-75 hover:opacity-100 transition ease-in-out duration-300 ${pathname == "/public" && "opacity-100 text-rose-300"}`} onClick={() => setMobileMenu(false)}>Public</Link> 

                                    <button className="bg-rose-800 py-1 px-2 rounded cursor-pointer active:scale-90 transition duration-100" onClick={LogoutHandler} disabled={isLoading}>Logout</button>

                                </nav>
                                <div className="block sm:hidden">
                                    <button className="text-2xl mx-2 cursor-pointer active:scale-90" onClick={() => setMobileMenu(true)}>☰</button>
                                </div>
                            </>
                        :
                            <nav className="text-base sm:text-lg font-sans space-x-3 text-white ">
                                <Link to="/login" className={`hover:text-rose-300 opacity-75 hover:opacity-100 transition ease-in-out duration-300 ${pathname == "/login" && "opacity-100 text-rose-300"}`}>Login</Link>
                                <Link to="/register" className={`hover:text-rose-300  hover: opacity-75 hover:opacity-100 transition ease-in-out duration-300 ${pathname == "/register" && "opacity-100 text-rose-300"}`}>Register</Link>
                            </nav>
                    }

                </section>

            </header>
            
            <div className=" mx-auto max-w-6xl px-1 lg:px-0">
                <Outlet/>
            </div>
        </>
    )
}

export default Navigation