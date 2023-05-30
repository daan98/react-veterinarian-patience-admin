interface PatientContextInterface {
    patients      : Array<any>,
    savePatient   : any,
    updatePatient : any,
    deletePatient : any,
    patient       : any,
    setPatient    : any
}

export default PatientContextInterface;

/*
** savePatient, updatePatient and deletePatient are functions
** patient and setPatient are useState variables
*/