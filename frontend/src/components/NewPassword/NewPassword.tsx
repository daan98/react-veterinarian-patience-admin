import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axiosClient from "../../config/axiosClient";
import Alert from "../Alert/Alert";



const NewPassword = () => {

    const params                                  = useParams();
    const { token }                               = params;
    const [password, setPassword]                 = useState('');
    const [repeatPassword, setRepeatPassword]     = useState('');
    const [validToken, setValidToken]             = useState(false);
    const [passwordModified, setPasswordModified] = useState(false);
    const [alert, setAlert]                       = useState({
                                                                message:'', 
                                                                error: false
                                                            });


    useEffect(() => {
        const checkToken = async () => {
            try {
                await axiosClient.get(`/veterinarian/forgot-password/${password}`);
                setAlert({
                    message: 'Write your new password.',
                    error: false
                });
                setValidToken(true);
            } catch (error : any) {
                console.log("There was an error while accesing the url: ", error);
                setAlert({
                    message: error.response.data.message ? error.response.data.message : error.message,
                    error: true
                })
            }
        };

        checkToken();
    }, []);
    const handleOnSubmitChangePassword = async (e : any) => {
        e.preventDefault();

        if([password, repeatPassword].includes('')) {
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

        try {
            const url = `/veterinarian/forgot-password/${token}`;
            const { data } = await axiosClient.post(url, { password });
            setAlert({
                message: data.message,
                error: false
            });
            setPasswordModified(true);
        } catch (error : any) {
            console.log('Error while accessing to forgot-password: ', error);
            setAlert({
                message: error.response.data.message,
                error: true
            });
        }
    };

    const { message } = alert;
    return(
        <>
            <div>
                <h1 className="text-orange-600 font-bold text-6xl">
                    Restore your password and take control of your
                    <span className="text-black"> patients</span>
                </h1>
            </div>
            
            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">

                { message &&
                    <Alert alert={alert} />
                }

                {validToken && !passwordModified &&
                    <form onSubmit={(e) => handleOnSubmitChangePassword(e)}>
                        <div className="my-5">
                            <label className="uppercase block text-xl font-bold">
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder="New password..."
                                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                                onChange={ e => setPassword(e.target.value)} />
                        </div>

                        <div className="my-5">
                            <label className="uppercase block text-xl font-bold">
                                Repeat password
                            </label>
                            <input
                                type="password"
                                placeholder="New password..."
                                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                                onChange={ e => setRepeatPassword(e.target.value)} />
                        </div>
                    </form>
                }

                { passwordModified &&
                    <Link className="text-sm text-slate-800 underline hover:text-orange-600" to={'/'}>Sing-in</Link>
                }
            </div>
        </>
    )
};

export default NewPassword;