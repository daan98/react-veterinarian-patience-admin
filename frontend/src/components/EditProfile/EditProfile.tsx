import AdminNavbar from "../AdminNavbar/AdminNavbar";

const EditProfile = () => {

    return(
        <>
            <AdminNavbar />

            <h2 className="fpt++ont-black text-3xl text-center mt-10">Edit Profile</h2>
            <p className="text-xl mt-5 mb-10 text-center">Modify your information {''}
                <span className="text-orange-600 font-bold">here</span>
            </p>
        </>
    );
};

export default EditProfile;