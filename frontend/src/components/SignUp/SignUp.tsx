import "./SignUp.style.scss";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Alert from "../Alert/Alert"
import axios from "axios";
import axiosClient from "../../config/axiosClient";

const SignUp = () => {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [alert, setAlert] = useState({
        message: '',
        error: false
    });

    const handleOnClick = async (e : any) => {
        e.preventDefault();

        if([email, name, password, repeatPassword].includes('')) {
            setAlert({
                message: 'There are empty fields',
                error: true 
            });
            return;
        }
    
        if(password !== repeatPassword) {
            setAlert({
                message: 'Passwords are different',
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

        setAlert({message: '', error: false});

        try {
            const url      = "http://localhost:4000/api/veterinarian/createVeterinarian";
            await axiosClient.post(`/veterinarian/createVeterinarian`, { name, email, password });
            setAlert({
                message: 'User created successfully, please check your email.',
                error: false
            });
        } catch (error : any) {
            console.log("There was an error while creating veterinarian: ", error);
            setAlert({
                message: error.response.data.message ? error.response.data.message : error.message,
                error: true
            });

            if(!alert.message) {
                setAlert({
                    message: "Error while creating veterinarian",
                    error: true
                });
            }
        }
    }

    const { message } = alert;
    return (
        <>
            <div>
                <h1 className="text-orange-600 font-bold text-6xl">
                    Sign-up and manage your
                    <span className="text-black"> patients</span>
                </h1>
            </div>

            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
            { message &&  <Alert alert={alert} /> }

            <form className="w-full">
                <div className="my-5">
                    <label className="uppercase block text-xl font-bold">
                        Name
                    </label>
                    <input
                        type="text"
                        placeholder="Complete name..."
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        onChange={ e => setName(e.target.value) } />
                </div>

                <div className="my-5">
                    <label className="uppercase block text-xl font-bold">
                        Email
                    </label>
                    <input
                        type="email"
                        placeholder="Email registration..."
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        onChange={ e => setEmail(e.target.value)} />
                </div>

                <div className="my-5">
                    <label className="uppercase block text-xl font-bold">
                        Password
                    </label>
                    <input
                        type="password"
                        placeholder="Password..."
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        onChange={ e => setPassword(e.target.value)} />
                </div>

                <div className="my-5">
                    <label className="uppercase block text-xl font-bold">
                        Repeat password
                    </label>
                    <input
                        type="password"
                        placeholder="Password..."
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        onChange={ e => setRepeatPassword(e.target.value)} />
                </div>

                <div className="pb-5 lg:flex lg:justify-between">
                    <p className='signUpBtn '>Already have an account?.. <NavLink className="text-sm text-slate-800 underline hover:text-orange-600" to={'/'}>Sing-in</NavLink></p>

                    <p className='signUpBtn'><NavLink className="text-sm text-slate-800 hover:text-orange-600" to={'/forgot-password'}>Forgot my password</NavLink></p>
                </div>
                
                <NavLink className="signInBtn text-xl font-bold rounded-xl px-3 py-2 w- bg-orange-500 hover:bg-orange-600" to={`/confirm-account/${20}`}
                onClick={e => handleOnClick(e)}>Create account</NavLink>
            </form>
            </div>
        </>
    );
};

export default SignUp;