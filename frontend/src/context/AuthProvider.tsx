import { useState, useEffect, createContext, PropsWithChildren } from "react";
import axiosClient from "../config/axiosClient";
import AuthContextInterface from "../interfaces/AuthContextInterface";

const AuthContext = createContext<AuthContextInterface>({
                                                            authentication: {},
                                                            setAuthentication: {},
                                                            loading: false,
                                                            logOut: null
                                                        });
const AuthProvider = (props : PropsWithChildren<any>) => {
    const { children } = props;
    const [authentication, setAuthentication] = useState({});
    const [loading, setLoading]               = useState(true);

    useEffect(() => {
        const authenticateUser = async () => {
            const token = localStorage.getItem('vpa_token');
            if(!token) {
                setLoading(false);
                console.log('authenticateUser loading', loading);
                return;
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };

            try {
                const url      = 'veterinarian/profile';
                const { data } = await axiosClient.get(url, config);
                setAuthentication({ data });
                setLoading(false);
            } catch (error : any) {
                console.log('Error: ', error.response.data.message ? error.response.data.message : error.message);
                setAuthentication({});
            }

            setLoading(false);
            console.log('authenticateUser loading', loading);
        };

        authenticateUser();
    }, []);

    const logOut = () => {
        localStorage.removeItem('token');
        setAuthentication({});
    };

    return(
        <AuthContext.Provider
            value={{
                authentication,
                setAuthentication,
                loading,
                logOut
            }}>
            { children }
        </AuthContext.Provider>
    );
};

export { AuthProvider };

export default AuthContext;