import { useState, useEffect, createContext, PropsWithChildren } from "react";
import axiosClient from "../config/axiosClient";
import AuthContextInterface from "../interfaces/AuthContextInterface";
import ChangePasswordInterface from "../interfaces/ChangePasswordInterface";

const AuthContext = createContext<AuthContextInterface>({
                                                            authentication: {},
                                                            setAuthentication: {},
                                                            loading: false,
                                                            logOut: null,
                                                            updateProfile: null,
                                                            savePassword: null
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
                console.log('Error at authenticateUser: ', error);
                setAuthentication({});
            }

            setLoading(false);
        };

        authenticateUser();
    }, []);

    const logOut = () => {
        localStorage.removeItem('token');
        setAuthentication({});
    };

    const updateProfile = async (profile : any) => {

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

    const savePassword = async (passwordInfo : ChangePasswordInterface) => {
        try {
            const token = localStorage.getItem('vpa_token');
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };
            const url = `veterinarian/update-password`;
            const { data } = await axiosClient.put(url, passwordInfo, config)

            return {
                message: data.message,
                error: false
            };
        } catch (error : any) {
            console.log("Error at savePassword: ", error);
            if (error.response.data.message) {
                return {
                    message: error.response.data.message,
                    error: true
                };
            } else {
                return {
                    message: error.message,
                    error: true
                };
            }
        }
    };

    return(
        <AuthContext.Provider
            value={{
                authentication,
                setAuthentication,
                loading,
                logOut,
                updateProfile,
                savePassword
            }}>
            { children }
        </AuthContext.Provider>
    );
};

export { AuthProvider };

export default AuthContext;