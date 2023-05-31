import AdminNavbar from "../AdminNavbar/AdminNavbar";

const ChangePassword = () => {

    return(
        <>
            <AdminNavbar />

            <h2 className="font-black text-3xl text-center mt-10">Change Password</h2>
            <p className="text-xl mt-5 mb-10 text-center">Change your password and {''}
                <span className="text-orange-600 font-bold">never lost the control</span>
            </p>
        </>
    );
};

export default ChangePassword;