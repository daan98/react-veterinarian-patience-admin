import usePatients from "../../hooks/usePatients";

const Patient = ({patient} : any ) => {

    const { name, appointmentDate, email, owner, symptom} = patient;
    const { updatePatient, deletePatient } = usePatients();

    const getTimeFormat = (originalFormat : string) => {
        const formattedDate = new Date(originalFormat.slice(0, 16));
        return new Intl.DateTimeFormat('en-US', {dateStyle: 'long'}).format(formattedDate);
    };

    return(
        <div className="mx-5 my-10 bg-white shadow-md px-5 py-3 rounded-xl">
            <p className="font-bold uppercase text-orange-600 text-center my-2"> Name: {''}
                <span className="font-normal normal-case text-black">{ name }</span>
            </p>
            
            <p className="font-bold uppercase text-orange-600 text-center my-2"> Owner: {''}
                <span className="font-normal normal-case text-black">{ owner }</span>
            </p>
            
            <p className="font-bold uppercase text-orange-600 text-center my-2"> Email: {''}
                <span className="font-normal normal-case text-black">{ email }</span>
            </p>
            
            <p className="font-bold uppercase text-orange-600 text-center my-2"> Appointment date: {''}
                <span className="font-normal normal-case text-black">{ getTimeFormat(appointmentDate) }</span>
            </p>
            
            <p className="font-bold uppercase text-orange-600 text-center my-2"> Symptoms: {''}
                <span className="font-normal normal-case text-black">{ symptom }</span>
            </p>

            <div className="flex justify-between flex-wrap my-5">
                <button
                type="button" 
                className="py-2 px-10 bg-orange-600 hover:bg-orange-700 text-white uppercase font-bold rounded-lg"
                onClick={() => updatePatient(patient)}>Edit</button>
                <button
                type="button" 
                className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white uppercase font-bold rounded-lg"
                onClick={() => deletePatient(patient)}>Delete</button>
            </div>
        </div>
    );
}

export default Patient;