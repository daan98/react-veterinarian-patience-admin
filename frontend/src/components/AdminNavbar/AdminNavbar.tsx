import { NavLink, Link } from 'react-router-dom';

const AdminNavbar = () => {
    return(
        <>
            <nav className='flex gap-3 justify-center text-center'>
                <Link
                    to={'/admin/edit-profile'}
                    className="font-bold uppercase text-black">
                        Edit Profile
                </Link>
                
                <Link
                    to={'/admin/change-password'}
                    className="font-bold uppercase text-black">
                        Change Password
                </Link>
            </nav>      
        </>
    );
}

export default AdminNavbar;