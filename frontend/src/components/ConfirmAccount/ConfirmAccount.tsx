import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Alert from "../Alert/Alert";

const ConfirmAccount = () => {

    const [ confirmedAccount, setConfirmedAccount ] = useState(false);
    const [ loading, setLoading ]                   = useState(true);
    const [ alert, setAlert ]                       = useState({});
    const params                                    = useParams();
    const { token }                                 = params;

    useEffect( () => {
        const ConfirmAccount = async () => {
            try {
                const url = `http://localhost:4000/api/veterinarian/confirm/${token}`;
                const { data } = await axios.get(url);

                setConfirmedAccount(true);
                setLoading(false);
                setAlert({
                    message: data.message,
                    error: false
                });
            } catch (error : any) {
                console.log('Error at ConfirmAccount: ', error);
                setLoading(false);
                setAlert({
                    message: error.resposnse.data.message,
                    error: true
                });
            }
        };

        ConfirmAccount();
    }, []);

    return (
        <>
            <div>
                <h1 className="text-orange-600 font-bold text-6xl">
                    Confirm your account and manage 
                    <span className="text-black"> your patients</span>
                </h1>
            </div>

            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                {!loading &&
                    <Alert alert={alert}  />
                }
            </div>
        </>
    );
};

export default ConfirmAccount;