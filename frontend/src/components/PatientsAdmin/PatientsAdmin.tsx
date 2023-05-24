import Form from "../Form/Form";
import PatientList from "../PatientsList/PatientList";

const PatientsAdmin = () => {
    return(
        <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 lg:w-2/5">
                <Form />
            </div>

            <div className="md:w-1/2 lg:w-3/5">
                <PatientList />
            </div>
        </div>
    );
};

export default PatientsAdmin;