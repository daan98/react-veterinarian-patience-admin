import "./ForgotPassword.style.scss";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Alert from "../Alert/Alert";
import axiosClient from "../../config/axiosClient";

const ForgotPassword = () => {
    let   isEmail           : boolean     = false;
    const emalRegex         : RegExp      = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const [email, setEmail]               = useState('');
    const [alert, setAlert]               = useState({
                                                        message: '',
                                                        error: false
                                                    });

    const getEmail = (data : string) => {
        setEmail(data);
    }

    const handleOnClick = async (e : any) => {
        e.preventDefault();

        if(!emalRegex.test(email)) {
            setAlert({
                message: 'Invalid email',
                error: true
            });
        }

        try {
            const { data } = await axiosClient.post('/veterinarian/forgot-password', email);

            setAlert({
                message: data.message,
                error: false
            });
        } catch (error : any) {
            console.log('There was an error while restoring your password: ', error);

            setAlert({
                message: error.response.data.message ? error.response.data.message : error.message,
                error: true
            })
        }
    };

    const { message } = alert;
    return (
        <>
             <div>
                <h1 className="text-orange-600 font-bold text-6xl">
                    Renew your password and manage your
                    <span className="text-black"> patients</span>
                </h1>
            </div>

            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                { !message &&
                    <Alert alert={alert} />
                }

                <form className="w-full">
                    <div className="my-5">
                        <label className="uppercase block text-xl font-bold">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Email..."
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={email}
                            onChange={ e => getEmail(e.target.value) } />
                    </div>

                    <NavLink 
                        className="signInBtn text-xl font-bold rounded-xl px-3 py-2 w- bg-orange-500 hover:bg-orange-600" 
                        to={`/confirm-account/${20}`}
                        onClick={(e) => handleOnClick(e)}>Send Information</NavLink>

                    <div className="pt-5 lg:flex lg:justify-between">
                        <p className='signUpBtn pb-5'>Already have an account?.. <NavLink className="text-sm text-slate-800 underline hover:text-orange-600" to={'/'}>Sing-in</NavLink></p>

                        <p className='signUpBtn pb-5'>Don't have an account?.. <NavLink className="text-sm text-slate-800 underline hover:text-orange-600" to={'/sing-up        '}>Sing-up</NavLink></p>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ForgotPassword;