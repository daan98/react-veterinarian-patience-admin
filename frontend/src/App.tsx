import { useState } from 'react';
import './App.css';
import { Routes, Route, Router, useLocation } from 'react-router-dom';

// Components or files created for the projects
import ConfirmAccount from "./components/ConfirmAccount/ConfirmAccount"
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';
import FoundError from './components/FoundError/FoundError';
import NewPassword from './components/NewPassword/NewPassword';
import ProtectedRoute from './layout/ProtectedRoute';
import PatientsAdmin from './components/PatientsAdmin/PatientsAdmin';
import EditProfile from './components/EditProfile/EditProfile';
import ChangePassword from './components/ChangePassword/ChangePassword';


function App() {

  const currentLocation = useLocation(); 
  return (
    <>
    {// HEADER
    }
      <main className={!currentLocation.pathname.includes('admin')  ? 'container mx-auto grid grid-cols-2' : 'mx-auto' }>
        <Routes>
          <Route path="/confirm-account/:token" element={<ConfirmAccount />}></Route>
          <Route path='/forgot-password' element={<ForgotPassword />}></Route>
          <Route path='/forgot-password/:token' element={<NewPassword />}></Route>
          <Route path="/sing-up" element={<SignUp />}></Route>
          <Route path="/" element={<Login />}></Route>
          <Route path="*" element={<FoundError />}></Route>

          <Route path='/admin' element={<ProtectedRoute />}>
            <Route index element={<PatientsAdmin />}></Route>
            <Route path='edit-profile' element={<EditProfile />} />
            <Route path='change-password' element={<ChangePassword />} />
          </Route>
        </Routes>
      </main>
      {// FOOTER
    }
    </>
  );
}

export default App
