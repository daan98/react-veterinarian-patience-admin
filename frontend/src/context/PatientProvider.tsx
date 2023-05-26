import { useState, useEffect, createContext, PropsWithChildren } from "react";
import axiosClient from "../config/axiosClient";
import PatientContextInterface from "../interfaces/PatientContextInterface";

const PatientContext = createContext<PatientContextInterface>({
                                                                patients: [],
                                                                savePatient: null
                                                            });

export const PatientProvider = (props : PropsWithChildren<any>) => {

    const { children }                   = props;
    const [patientList, setPatientList]  = useState<Array<any>>([]);

    useEffect(() => {
        const getPatients = async () => {
            try {
                const token = localStorage.getItem('vpa_token');
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                };
                const url = '/patient';
                const { data } = await axiosClient.get(url, config);
                console.log('getPatients: ', data);
                setPatientList(data.patientList);
            } catch (error) {
                console.log('Error at getPatients: ', error);
            }
        };

        getPatients();
    }, []);

    const savePatient = async (patient : any) => {
        console.log('savePatient:', patient)
        try {
            const url = '/patient';
            const token = localStorage.getItem('vpa_token');
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };

            const { data } = await axiosClient.post(url,patient , config);
            const { __v, updatedAt, createdAt, ...storagedPatient } = data.content;
            setPatientList([storagedPatient, ...patientList]);
            console.log('patient saved: ', data);
            console.log('storagedPatient: ', storagedPatient);
        } catch (error : any) {
            const errorMessage = error.response.data.message ? error.response.data.message : error.message;
            console.log('Error saving patient: ', errorMessage);
        }
    };

    return(
        <>
            <PatientContext.Provider
                value={{
                    patients: patientList,
                    savePatient
                    }}>
                        { children }
            </PatientContext.Provider>
        </>
    );
};

export default PatientContext;