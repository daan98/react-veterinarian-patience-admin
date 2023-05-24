import { useState } from "react";
import Form from "../Form/Form";
import PatientList from "../PatientsList/PatientList";

const PatientsAdmin = () => {

    const [showForm, setShowForm] = useState(false);

    return(
        <div className="flex flex-col gap-x-5 flex-gap-2 md:flex-row">
            <button
                type="button"
                className="bg-orange-600 text-white uppercase font-bold mx-10 p-3 rounded-md md:hidden"
                onClick={() => setShowForm(!showForm)}>
                    {!showForm ? 'Show Form' : 'Hide Form'}
            </button>

            <div className={ `${showForm ? 'block' : 'hidden'} md:block md:w-1/2 lg:w-2/5` }>
                <Form />
            </div>

            <div className="md:w-1/2 lg:w-3/5">
                <PatientList />
            </div>
        </div>
    );
};

export default PatientsAdmin;