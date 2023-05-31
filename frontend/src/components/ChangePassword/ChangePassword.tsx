import { useState } from "react";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import Alert from "../Alert/Alert";
import axiosClient from "../../config/axiosClient";
import ChangePasswordInterface from "../../interfaces/ChangePasswordInterface";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import withReactContent from "sweetalert2-react-content";

const ChangePassword = () => {

    const { savePassword }        = useAuth();
    const [password, setPassword] = useState<ChangePasswordInterface>({
                                                                        actualPassword: '',
                                                                        newPassword: ''
                                                                    });
    const [alert, setAlert]       = useState({
                                                message: '',
                                                error: false
                                            });

    const printAlert = (alertMessage : string, alertError : boolean) => {
        setAlert({
            message: alertMessage,
            error: alertError
        });

        setTimeout(() => {
            setAlert({
                message: '',
                error: false
            });
        }, 3000);
    };

    const handleOnSubmit = async (e : any) => {
        e.preventDefault();

        if ([password.actualPassword, password.newPassword].includes('')) {
            printAlert("All fields are required.", true);
            return;
        }

        if (password.newPassword.length < 8) {
            printAlert("The new password must have 8 characters.", true);
            return;
        }

        const result = await savePassword(password);

        setPassword({
            actualPassword: '',
            newPassword: ''
        });
        printAlert(result.message, result.error);
    };

    const { message } = alert;

    return(
        <>
            <AdminNavbar />

            <h2 className="font-black text-3xl text-center mt-10">Change Password</h2>
            <p className="text-xl mt-5 mb-10 text-center">Change your password and {''}
                <span className="text-orange-600 font-bold">never lost the control</span>
            </p>

            <div className="flex justify-center">
                <div className="bg-white rounded-lg w-full md:w-1/2 shadow p-5">
                    <form onSubmit={(e) => handleOnSubmit(e)} className="mb-5">
                        <div className="my-3">
                            <label htmlFor="actualPassword" className="uppercase font-bold">Actual Password: </label>
                            <input
                                name="actualPassword"
                                type="password"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                placeholder="Write your actual password"
                                value={password.actualPassword || ''}
                                onChange={(e) => setPassword({
                                    ...password,
                                    [e.target.name]: e.target.value
                                })}
                            />
                        </div>

                        <div className="my-3">
                            <label htmlFor="newPassword" className="uppercase font-bold">New Password: </label>
                            <input
                                name="newPassword"
                                type="password"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                placeholder="Write your new password"
                                value={password.newPassword || ''}
                                onChange={(e) => setPassword({
                                    ...password,
                                    [e.target.name]: e.target.value
                                })}
                            />
                        </div>

                        <input
                            type="submit"
                            value="Update Password"
                            className="bg-orange-600 transition ease-in-out duration-300 px-1 py-3 mt-5 font-bold text-white rounded-lg uppercase w-full hover:bg-orange-700"
                        />
                    </form>
                    
                    { message ? 
                        <Alert alert={alert}/> : ''
                    }
                </div>
            </div>
        </>
    );
};

export default ChangePassword;