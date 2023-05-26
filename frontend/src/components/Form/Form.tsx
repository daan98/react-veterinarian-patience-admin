import { useState } from "react";
import Alert from "../Alert/Alert";
import usePatients from "../../hooks/usePatients";

const Form = () => {

    const { savePatient } = usePatients();
    const [petName, setPetName]       = useState('');
    const [ownerName, setOwnerName]   = useState('');
    const [ownerEmail, setOwnerEmail] = useState('');
    const [date, setDate] : any       = useState('');
    const [symptoms, setSymptoms]     = useState('');
    const [alert, setAlert]           = useState({
                                                    message: '',
                                                    error: false
                                                });

    const handleSubmit = (e : any) => {
        e.preventDefault();

        if([petName, ownerName, ownerEmail, date, symptoms].includes('')) {
            setAlert({
                message: 'All fields are needed',
                error: true
            });
            return;
        }

        savePatient({
            name: petName,
            owner: ownerName,
            email: ownerEmail,
            appointmentDate: date,
            symptom: symptoms
        });

        console.log('Se mandaron datos');
        setAlert({
            message: 'Saved correctly',
            error: false
        });

    };

    const { message } = alert;
    return(
        <>
            <h2 className="font-black text-3xl text-center">Patients Administrato</h2>

            <p
                className="text-xl mt-5 mb-10 text-center">
                Add a ew patient {''}
                <span className="text-orange-600 font-bold">and keep access to information</span>
            </p>

            <form 
                className="bg-white py-10 px-5 mb-10 lg:mb-10 shadow-md rounded-md"
                onSubmit={ (e) => handleSubmit(e) }
            >
                <div>
                    <label 
                        htmlFor="pet" 
                        className="text-gray-700 uppercase font-bold"
                    >
                        Pet Name
                    </label>

                    <input 
                        type="text" 
                        id="pet" 
                        placeholder="Pet Name" 
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded:md"
                        value={petName}
                        onChange={(e) => setPetName(e.target.value)}
                    />
                </div>
                
                <div>
                    <label 
                        htmlFor="owner-name" 
                        className="text-gray-700 uppercase font-bold"
                    >
                        Owner Name
                    </label>

                    <input 
                        type="text" 
                        id="owner-name" 
                        placeholder="Owner Name" 
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded:md"
                        value={ownerName}
                        onChange={(e) => setOwnerName(e.target.value)}
                    />
                </div>
                
                <div>
                    <label 
                        htmlFor="owner-email" 
                        className="text-gray-700 uppercase font-bold"
                    >
                        Owner Email
                    </label>

                    <input 
                        type="text" 
                        id="owner-email" 
                        placeholder="Owner Email" 
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded:md"
                        value={ownerEmail}
                        onChange={(e) => setOwnerEmail(e.target.value)}
                    />
                </div>
                
                
                <div>
                    <label 
                        htmlFor="discharge-date" 
                        className="text-gray-700 uppercase font-bold"
                    >
                        Discharge Date
                    </label>

                    <input 
                        type="date" 
                        id="discharge-date" 
                        placeholder="Discharge Date" 
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded:md"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                
                <div>
                    <label 
                        htmlFor="symptoms" 
                        className="text-gray-700 uppercase font-bold"
                    >
                        Symptoms
                    </label>

                    <textarea 
                        id="symptoms"
                        cols={30}
                        rows={10}
                        placeholder="Describe the symptoms"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={symptoms}
                        onChange={(e) => setSymptoms(e.target.value)}
                    />
                </div>

                <input
                    type="submit"
                    className="bg-orange-600 w-full p-3 mt-5 text-white uppercase font-bold rounded-md hover:bg-orange-700 cursor-pointer transition-all-ease-in-out"
                    value="Add Patient"
                />
            </form>

            {message &&
                <Alert alert={alert} />
            }
        </>
    );
}

export default Form