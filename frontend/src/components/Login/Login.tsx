import './Login.style.scss'
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Alert from '../Alert/Alert';
import axiosClient from '../../config/axiosClient';

const Login = () => {

    const [withPx, setWidthPx]                = useState<number>(window.innerWidth);
    const [email, setEmail]                   = useState('');
    const [password, setPassword]             = useState('');
    const [alert, setAlert]                   = useState({
                                                            message: '',
                                                            error: false
                                                        });
    const emailRegExp             : RegExp    = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const navigate                            = useNavigate();
    const { setAuthentication }               = useAuth();

    // FOR RESIZE FUNCTIONALITY NEEDED FOR CENTER LABELS AND INPUTS WHEN WIDTH IS LOWER THAN 767PX
    useEffect(()=> {
        const resizeW = () => setWidthPx(window.innerWidth);

        window.addEventListener("resize", resizeW);
        
        return () => window.removeEventListener("resize", resizeW);
    }, []);

    const onSigIn = async (e : any) => {
        e.preventDefault(); // use it only when handling submit event
        if([email, password].includes('')) {
            setAlert({
                message: 'There are empty fields',
                error: true 
            });
            return;
        }

        if(!emailRegExp.test(email)) {
            setAlert({
                message: 'Invalid Email',
                error: true
            });
            return;
        }

        if(password.length < 8) {
            setAlert({
                message: 'Password must have 8 characters',
                error: true
            });
            return;
        }

        try {
            const url = '/veterinarian/login';
            const { data } = await axiosClient.post(url, { email, password });
            
            localStorage.setItem('vpa_token', data.token);
            setAuthentication(data);
            navigate('/admin');
        } catch (error : any) {
            console.log('Error while trying to login: ', error);
            setAlert({
                message: error.response ? error.response.data.message : error.message,
                error: true
            });

            if (!alert.message) {
                setAlert({
                    message: 'Unexpected error, please try again later.',
                    error: true
                });
            }
        }
    }

    console.log("width", window.screen.width.valueOf());
    const { message } = alert;
    return (
        <>
            <div>
                <h1 className="text-orange-600 font-bold text-6xl">
                    Sign-in and manage your
                    <span className="text-black"> patients</span>
                </h1>
            </div>

            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                {message &&
                    <Alert alert={alert} />
                }

                <form 
                    className="w-full"
                    onSubmit={onSigIn}>
                    <div className="my-5">
                        <label className="uppercase  block text-xl font-bold">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Email registration..."
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={email}
                            onChange={ (e) => setEmail(e.target.value)} />
                    </div>

                    <div className="my-5">
                        <label className="uppercase  block text-xl font-bold">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Password..."
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <p className='signUpBtn pb-5'>Don't have an account?.. <NavLink className="text-sm text-slate-800 underline hover:text-orange-600" to={'/sing-up'}>Sing-up</NavLink></p>

                    <input
                        type="submit"
                        value="Sig in"
                        className="signInBtn text-xl font-bold rounded-xl px-3 py-2 w- bg-orange-500 hover:bg-orange-600" />
                </form>
            </div>
        </>
    );
};

export default Login;