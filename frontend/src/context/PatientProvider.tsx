import { useState, useEffect, createContext, PropsWithChildren } from "react";
import axiosClient from "../config/axiosClient";
import PatientContextInterface from "../interfaces/PatientContextInterface";
import useAuth from "../hooks/useAuth";

const PatientContext = createContext<PatientContextInterface>({
                                                                patients: [],
                                                                savePatient: null,
                                                                updatePatient: null,
                                                                deletePatient: null,
                                                                patient: {},
                                                                setPatient: null
                                                            });

export const PatientProvider = (props : PropsWithChildren<any>) => {

    const { children }                   = props;
    const [patientList, setPatientList]  = useState<Array<any>>([]);
    const [patient, setPatient]          = useState({});
    const { authentication }             = useAuth();
    const token                          = localStorage.getItem('vpa_token');
    const config                         = {
                                                headers: {
                                                    "Content-Type": "application/json",
                                                    Authorization: `Bearer ${token}`
                                                }
                                            };

    useEffect(() => {
        const getPatients = async () => {
            try {
                const url = '/patient';
                const { data } = await axiosClient.get(url, config);
                console.log('getPatients: ', data);
                setPatientList(data.patientList);
            } catch (error) {
                console.log('Error at getPatients: ', error);
            }
        };

        getPatients();
    }, [authentication]);

    const savePatient = async (patientInfo : any, id ?: string) => {

        console.log('savePatient patient: ', patient);
        if(patient && id) {
            try {
                const url = `/patient/${id}`;
                const { data } = await axiosClient.put(url, patientInfo, config);
                
                const updatedPatientList = patientList.map( currentPatient => 
                    currentPatient._id === data.updatedPatient._id ? data.updatedPatient : currentPatient
                );
                setPatientList(updatedPatientList);
            } catch (error) {
                console.log('Error trying to update patient information: ', error);
            }
        } else {
            try {
                const url = '/patient';
    
                const { data } = await axiosClient.post(url,patientInfo , config);
                const { __v, updatedAt, createdAt, ...storagedPatient } = data.content;
                setPatientList([storagedPatient, ...patientList]);
            } catch (error : any) {
                const errorMessage = error.response.data.message ? error.response.data.message : error.message;
                console.log('Error saving patient: ', errorMessage);
            }
        }

        setPatient({});
    };

    const updatePatient = (patientInfo : any) => {
        console.log('updatePatient: ', patientInfo);
        setPatient(patientInfo);
    };

    const deletePatient = async (patientInfo : any) => {
        console.log('deletePatient: ', patientInfo);

        try {
            const url = `/patient/${patientInfo._id}`;
            const { data } = await axiosClient.delete(url, config);
            
            const updatedPatientList = patientList.filter(currentPatient =>
                currentPatient._id !== data.patientId
            );
            
            setPatientList(updatedPatientList);
        } catch (error) {
            console.log("Error at deletePatient: ", error);
        }
    };

    return(
        <>
            <PatientContext.Provider
                value={{
                    patients: patientList,
                    savePatient,
                    updatePatient,
                    deletePatient,
                    patient,
                    setPatient
                    }}>
                        { children }
            </PatientContext.Provider>
        </>
    );
};

export default PatientContext;