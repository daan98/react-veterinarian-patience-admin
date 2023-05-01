import "./ForgotPassword.style.scss";
import React from "react";
import { NavLink } from "react-router-dom";

const ForgotPassword = () => {

    return (
        <>
             <div>
                <h1 className="text-orange-600 font-bold text-6xl">
                    Renew your password and manage your
                    <span className="text-black"> patients</span>
                </h1>
            </div>

            <form className="w-full">
                <div className="my-5">
                    <label className="uppercase block text-xl font-bold">
                        Email
                    </label>
                    <input
                        type="email"
                        placeholder="Email..."
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" />
                </div>

                <NavLink className="signInBtn text-xl font-bold rounded-xl px-3 py-2 w- bg-orange-500 hover:bg-orange-600" to={`/confirm-account/${20}`}>Send Information</NavLink>

                <div className="pt-5 lg:flex lg:justify-between">
                    <p className='signUpBtn pb-5'>Already have an account?.. <NavLink className="text-sm text-slate-800 underline hover:text-orange-600" to={'/'}>Sing-in</NavLink></p>

                    <p className='signUpBtn pb-5'>Don't have an account?.. <NavLink className="text-sm text-slate-800 underline hover:text-orange-600" to={'/sing-up        '}>Sing-up</NavLink></p>
                </div>
            </form>
        </>
    );
};

export default ForgotPassword;