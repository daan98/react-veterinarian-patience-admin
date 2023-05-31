import { useState, useEffect } from "react";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import Alert from "../Alert/Alert";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import useAuth from "../../hooks/useAuth";

const EditProfile = () => {

    const mySwal                                = withReactContent(Swal);
    const { authentication, updateProfile }     = useAuth()
    const [userName, setUserName]               = useState<string>('');
    const [website, setWebsite]                 = useState<string>('');
    const [phoneNumber, setPhoneNumber]         = useState<string>('');
    const [email, setEmail]                     = useState<string>('');
    const [profile, setProfile]                 = useState<any>({});
    const [initInfo, setInitInfo]               = useState<any>({});
    const emailRegExp      : RegExp             = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const websiteRegExp    : RegExp             = /(https?:\/\/)?(www\.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)|(https?:\/\/)?(www\.)?(?!ww)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    const onlyNumberRegexp : RegExp             = /^\d+$/
    const [alert, setAlert]                     = useState<any>({
                                                                    message: '',
                                                                    error: false
                                                                });
    console.log('authentication: ', authentication);

    useEffect(() => {
        setProfile(authentication.data.profile);
        setInitInfo(authentication.data.profile);
    }, [authentication]);

    const printAlert = (alertMessage : string, alertError : boolean) => {
        setAlert({
            message: alertMessage,
            error: alertError
        });

        setTimeout(() => {
            setAlert({
                message: '',
                error: false
            });
        }, 3000);
    };

    const handleOnSubmit = (e : any) => {
        e.preventDefault();
        const { email, name, web, phone } = profile;

        if (initInfo === profile) {
            printAlert("There are no changes to save", true);
            return;
        }

        if (!name) {
            printAlert("Name field is mandatory", true);
            return;
        }
        
        if (email && !emailRegExp.test(email)) {
            printAlert("Write a valid email", true);
            return;
        }

        if (web && !websiteRegExp.test(website)) {
            printAlert("Write a valid website URL", true);
            return;
        }

        if (phone && !onlyNumberRegexp.test(phone)) {
            printAlert("Only write number for the phone number field", true);
            return;
        }

        if (phone && phone.replace(/ /g,'').length !== 8) {
            printAlert("phone Number must contain 8 digits", true);
            return;
        }

        mySwal.fire({
            title: 'Do you really want to update your informartion?',
            icon: 'question',
            allowOutsideClick: true,
            allowEscapeKey: true,
            allowEnterKey: true,
            keydownListenerCapture: true,
            showDenyButton: true,
            focusConfirm: false,
            confirmButtonText: 'Yes',
            confirmButtonColor: '#EA580C',
            denyButtonColor: '#DC2626',
            customClass: {
                confirmButton: 'mx-5 px-5 py-1',
                denyButton: 'px-5 py-1'
            }
        }).then(async result => {
            if (!result.value) {
                return;
            } else {
                // Update user information
                const result = await updateProfile(profile);
                printAlert(result.message, result.error);
            }
        });
    };

    const { message } = alert;

    return(
        <>
            <AdminNavbar />

            <h2 className="font-black text-3xl text-center mt-10">Edit Profile</h2>
            <p className="text-xl mt-5 mb-10 text-center">Modify your information {''}
                <span className="text-orange-600 font-bold">here</span>
            </p>

            <div className="flex justify-center">
                <div className="bg-white rounded-lg w-full md:w-1/2 shadow p-5">
                    <form onSubmit={(e) => handleOnSubmit(e)} className="mb-5">
                        <div className="my-3">
                            <label htmlFor="name" className="uppercase font-bold">Name: </label>
                            <input
                                name="name"
                                type="text"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                value={profile.name || ''}
                                onChange={(e) => setProfile({
                                    ...profile,
                                    [e.target.name]: e.target.value})}
                            />
                        </div>

                        <div className="my-3">
                            <label htmlFor="web" className="uppercase font-bold">Web site: </label>
                            <input
                                name="web"
                                type="text"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                value={profile.web || ''}
                                onChange={(e) => setProfile({
                                    ...profile,
                                    [e.target.name]: e.target.value})}
                            />
                        </div>

                        <div className="my-3">
                            <label htmlFor="phone" className="uppercase font-bold">Phone Number: </label>
                            <input
                                name="phone"
                                type="text"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                value={profile.phone || ''}
                                onChange={(e) => setProfile({
                                    ...profile,
                                    [e.target.name]: e.target.value})}
                            />
                        </div>

                        <div className="my-3">
                            <label htmlFor="email" className="uppercase font-bold">Email: </label>
                            <input
                                name="email"
                                type="email"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                value={profile.email || ''}
                                onChange={(e) => setProfile({
                                    ...profile,
                                    [e.target.name]: e.target.value})}
                            />
                        </div>

                        <input
                            type="submit"
                            value="Save Changes"
                            className={
                                profile.email  ?
                                "bg-orange-600 transition ease-in-out duration-300 px-1 py-3 mt-5 font-bold text-white rounded-lg uppercase w-full hover:bg-orange-700"
                                :
                                "hidden"
                            }
                        />

                        
                    </form>
                    
                    { message ? 
                        <Alert alert={alert}/> : ''
                    }
                </div>
            </div>
        </>
    );
};

export default EditProfile;