import { useState, useEffect, createContext, PropsWithChildren } from "react";
import axiosClient from "../config/axiosClient";
import AuthContextInterface from "../interfaces/AuthContextInterface";

const AuthContext = createContext<AuthContextInterface>({
                                                            authentication: {},
                                                            setAuthentication: {},
                                                            loading: false,
                                                            logOut: null,
                                                            updateProfile: null
                                                        });
const AuthProvider = (props : PropsWithChildren<any>) => {
    const { children } = props;
    const [authentication, setAuthentication] = useState<any>({});
    const [loading, setLoading]               = useState<boolean>(true);

    useEffect(() => {
        const authenticateUser = async () => {
            const token = localStorage.getItem('vpa_token');
            if(!token) {
                setLoading(false);
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

    const updateProfile = async (profile : any) => {
        console.log('updateProfile: ', profile);

        try {
            const token = localStorage.getItem('vpa_token');
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };
            const url = `/veterinarian/profile/${profile._id}`
            const { data } = await axiosClient.put(url, profile, config);
            console.log('updateProfile: ', data);

            return {
                message: 'Information updated correctly',
                error: false
            };
        } catch (error : any) {
            console.log('Error at updateProfile: ', error);
            return {
                message: error.response.data.message ? error.response.data.message : 'The information cannot be updated',
                error: true
            };
        }
    }

    return(
        <AuthContext.Provider
            value={{
                authentication,
                setAuthentication,
                loading,
                logOut,
                updateProfile
            }}>
            { children }
        </AuthContext.Provider>
    );
};

export { AuthProvider };

export default AuthContext;