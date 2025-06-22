// components
// components
import LoginCom from "@/components/LoginCom";
import useRegister from "@/hook/useRegister";
function Login(){
    const [ isLoading, error, register , registerSuccess ] = useRegister();

    return (
        <div className="h-screen flex flex-col justify-center items-center">

            { registerSuccess && 
            <div className="bg-green-500 mb-5 text-white text-md py-2 rounded-lg  select-none w-4/5 sm:w-1/2 lg:w-1/3 text-center">Registration successful. Please log in again.</div>
            }

            <LoginCom/>
        </div>
    )
}

export default Login