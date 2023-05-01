import './Login.style.scss'
import React, { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';


const Login = () => {

    const [withPx, setWidthPx] = useState<number>(window.innerWidth);

    // FOR RESIZE FUNCTIONALITY NEEDED FOR CENTER LABELS AND INPUTS WHEN WIDTH IS LOWER THAN 767PX
    useEffect(()=> {
        const resizeW = () => setWidthPx(window.innerWidth);

        window.addEventListener("resize", resizeW);
        
        return () => window.removeEventListener("resize", resizeW);
    }, []);

    console.log("width", window.screen.width.valueOf());
    return (
        <>
            <div>
                <h1 className="text-orange-600 font-bold text-6xl">
                    Sign-in and manage your
                    <span className="text-black"> patients</span>
                </h1>
            </div>

            <form className="w-full">
                <div className="my-5">
                    <label className="uppercase  block text-xl font-bold">
                        Email
                    </label>
                    <input
                        type="email"
                        placeholder="Email registration..."
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" />
                </div>

                <div className="my-5">
                    <label className="uppercase  block text-xl font-bold">
                        Password
                    </label>
                    <input
                        type="password"
                        placeholder="Password..."
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" />
                </div>

                <p className='signUpBtn pb-5'>Don't have an account?.. <NavLink className="text-sm text-slate-800 underline hover:text-orange-600" to={'/sing-up'}>Sing-up</NavLink></p>

                <NavLink className="signInBtn text-xl font-bold rounded-xl px-3 py-2 w- bg-orange-500 hover:bg-orange-600" to={`/confirm-account/${20}`}>Sign-in</NavLink>

            </form>
        </>
    );
};

export default Login;