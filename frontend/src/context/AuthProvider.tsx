import { useState, useEffect, createContext, PropsWithChildren } from "react";
import axiosClient from "../config/axiosClient";

const AuthContext = createContext({});

const AuthProvider = (props : PropsWithChildren<any>) => {
    const { children } = props;
    const [authentication, setAuthentication] = useState({});

    useEffect(() => {
        const authenticateUser = async () => {
            const token = localStorage.getItem('vpa_token');
            if(!token) {
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
            } catch (error : any) {
                console.log('Error: ', error.response.data.message ? error.response.data.message : error.message);
                setAuthentication({});
            }
        };
    }, []);

    return(
        <AuthContext.Provider
            value={{
                authentication,
                setAuthentication
            }}>
            { children }
        </AuthContext.Provider>
    );
};

export { AuthProvider };

export default AuthContext;