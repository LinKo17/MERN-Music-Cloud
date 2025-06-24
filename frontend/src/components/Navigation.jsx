import { useDispatch, useSelector } from "react-redux"
import { Link, Outlet } from "react-router-dom"
import { useEffect } from "react"
import { ASSIGN } from "@/context/AuthSlice";
import useLogout from "../hook/useLogout";

function Navigation (){

    const token = useSelector(state => state.auth.token)
    const dispatch = useDispatch();

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

    return (
        <>

            <header className="bg-gray-900 sticky top-0 opacity-80">

                <section className="max-w-6xl text-cyan-400 mx-auto flex justify-between py-4 px-1 lg:px-0 select-none">
                    <Link to="/" className="text-lg sm:text-2xl font-serif">
                        🎧Music Cloud
                    </Link>

                    {
                        token ?
                            <nav className="text-base sm:text-lg font-sans space-x-8 text-white ">

                                <Link to="/playlists" className="hover:text-cyan-300 opacity-75 hover:opacity-100 transition ease-in-out duration-300">PlayLists</Link> 

                                <button className="bg-blue-600 py-1 px-2 rounded cursor-pointer active:scale-90 transition duration-100" onClick={LogoutHandler} disabled={isLoading}>Logout</button>

                            </nav>
                        :
                            <nav className="text-base sm:text-lg font-sans space-x-3 text-white ">
                                <Link to="/login" className="hover:text-cyan-300 opacity-75 hover:opacity-100 transition ease-in-out duration-300">Login</Link>
                                <Link to="/register" className="hover:text-cyan-300  hover: opacity-75 hover:opacity-100 transition ease-in-out duration-300">Register</Link>
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