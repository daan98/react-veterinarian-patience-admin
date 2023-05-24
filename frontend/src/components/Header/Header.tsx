import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Header = () => {

    const { logOut } = useAuth();

    return(
        <header className="py-10 px-10 bg-orange-600 w-full">
            <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
                <h1 className="font-bold text-2xl text-center">
                    Administrador de pacientes de {''}
                    <span className="text-white font-bold">Veterinaria</span>
                </h1>

                <nav className="flex flex-col lg:flex-row items-center gap-4 mt-5 lg:mt-0">
                    <Link 
                        to={"/admin"} 
                        className="text-white text-sm uppercase font-bold transition ease-in-out duration-300 hover:transition hover:ease-in-out hover:duration-300 hover:text-black">
                            Patients
                    </Link>
                    <Link 
                        to={"/admin"} 
                        className="text-white text-sm uppercase font-bold transition ease-in-out duration-300 hover:transition hover:ease-in-out hover:duration-300 hover:text-black">
                            Account
                    </Link>

                    <button
                        type="button" 
                        className="text-white text-sm uppercase font-bold transition ease-in-out duration-300 hover:transition hover:ease-in-out hover:duration-300 hover:text-black"
                        onClick={logOut}>Log out</button>
                </nav>
            </div>
        </header>
    );
};

export default Header;