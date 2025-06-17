function RegisterCom() {
    return (
        //Registeration Form
        <section className="bg-white w-4/5 sm:w-1/2 lg:w-1/3 rounded-lg p-4 select-none">

            <h3 className="text-2xl font-extrabold text-center text-black mb-4">Register</h3>

            <form action="">
                <div className="my-3 flex flex-col">
                    <label htmlFor="nameTap" className="text-[17px]">Email</label>
                    <input type="text" placeholder="name" id="nameTap" className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-300 mt-1"/>
                </div>

                <div className="my-3 flex flex-col">
                    <label htmlFor="emailTap" className="text-[17px]">Email</label>
                    <input type="email" placeholder="email" id="emailTap" className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-300 mt-1"/>
                </div>

                <div className="my-3 flex flex-col">
                    <label htmlFor="passwordTap" className="text-[17px]">Password</label>
                    <input type="password" placeholder="password" id="passwordTap" className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-300 mt-1"/>
                </div>

                <div className="my-3 flex flex-col">
                    <label htmlFor="confirmTap" className="text-[17px]">Confirm Password</label>
                    <input type="password" placeholder="confirm password" id="confirmTap" className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-300 mt-1"/>
                </div>

                <div className="mt-5">
                    <button className="bg-blue-500 w-full text-white p-2 cursor-pointer rounded active:scale-95 transition duration-300 ease-in-out">Register</button>
                </div>
            </form>

        </section>
    )
}

export default RegisterCom