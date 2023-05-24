import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const ProtectedRoute = () => {
    
    const { authentication, loading } = useAuth();
    console.log('Protected route: ', authentication, loading);

    if(loading) {
        return <><p>Loading...</p></>;
    }

    return(
        <>
            <Header />
            
            {
                authentication?.id ? (
                <main className="container mx-auto mt-10">
                    <Outlet/>
                </main>
                ) : <Navigate to={"/"} />
            }

            <Footer />
        </>
    );
};

export default ProtectedRoute;