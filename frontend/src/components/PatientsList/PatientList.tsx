import usePatients from "../../hooks/usePatients";
import Patient from "../Patient/Patient";


const PatientList = () => {

    const { patients } = usePatients();
    console.log('patients: ', patients);

    return(
        <>
            {patients.length ? 
            (
                <>
                    <h2 className="font-black text-3xl text-center">Patients list</h2>

                    <p
                        className="text-xl mt-5 mb-10 text-center">
                        Manage your {''}
                        <span className="text-orange-600 font-bold">patients and appointments</span>
                    </p>

                    { patients.map((patient) => {
                        <Patient/>
                    }) }
                </>
            )
            :
            (
                <>
                    <h2 className="font-black text-3xl text-center">There are no patients</h2>

                    <p
                        className="text-xl mt-5 mb-10 text-center">
                        Add new patients {''}
                        <span className="text-orange-600 font-bold">and They will appear here</span>
                    </p>
                </>
            )}
        </>
    );
}

export default PatientList