interface AuthContextInterface {
    authentication    : any,
    setAuthentication : any,
    loading           : boolean,
    logOut            : any,
    updateProfile     : any,
    savePassword      : any
};

export default AuthContextInterface;

/* FILE INFORMATION:

   ** authentication is the real value of a useState initiated as object
   ** setAuthentication is the variable used in the useState to give authentication a value
   ** logOut is a function
   ** updateProfile is a function
   ** savePassword is a function

*/