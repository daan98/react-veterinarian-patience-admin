interface AuthContextInterface {
    authentication : any,
    setAuthentication : any,
    loading : boolean,
    logOut : any
};

export default AuthContextInterface;

/* FILE INFORMATION:

   ** authentication is the real value of a useState initiated as object
   ** setAuthentication is the variable used in the useState to give authentication a value
   ** logOut is a function

*/