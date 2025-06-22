import { useState } from "react"
import useLogin from "../hook/useLogin";

function LoginCom () {
    const [ isLoading, error, login ] = useLogin();

    const [ userData, setUserData ] = useState({
        email : "",
        password : ""
    });

    console.log(isLoading);
    console.log(error);
    
    function loginHandler(e){
        e.preventDefault();
        login(userData);
    }
    
    return (
        //Login Form
        <section className="bg-white w-4/5 sm:w-1/2 lg:w-1/3 rounded-lg p-4 select-none">

            <h3 className="text-2xl font-extrabold text-center text-black mb-4">Login</h3>

            <form onSubmit={loginHandler}>
                <div className="my-3 flex flex-col">
                    <label htmlFor="emailTap" className="text-[17px]">Email</label>
                    <input type="email" placeholder="email" id="emailTap" className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-300 mt-1" value={userData.email} onChange={e => setUserData({...userData, email: e.target.value})}/>
                    {
                        error.length != 0 && error.find(e => e.path == "email") &&
                        <div className="text-red-500">{error.find(e => e.path == "email").msg}</div>
                    }
                </div>

                <div className="my-3 flex flex-col">
                    <label htmlFor="passwordTap" className="text-[17px]">Password</label>
                    <input type="password" placeholder="password" id="passwordTap" className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-300 mt-1" value={userData.password} onChange={e => setUserData({...userData,password: e.target.value})}/>
                    {
                        error.length != 0 && error.find(e => e.path == "password") &&
                        <div className="text-red-500">{error.find(e => e.path == "password").msg}</div>
                    }
                </div>

                <div className="mt-5">
                    <button className="bg-blue-500 w-full text-white p-2 cursor-pointer rounded active:scale-95 transition duration-300 ease-in-out" disabled={isLoading}>Login</button>
                </div>
            </form>

        </section>
    )
}

export default LoginCom