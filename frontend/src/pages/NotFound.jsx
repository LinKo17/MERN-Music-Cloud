import { Link } from "react-router-dom"

function NotFound(){
    return (
        <div className="bg-black  h-screen  flex flex-col justify-center items-center">
            <h1 className="text-white text-3xl">404 Not Found</h1>
            <Link to="/" className="text-rose-800 mt-3 underline text-xl">Go Back</Link>
        </div>
    )
}
export default NotFound