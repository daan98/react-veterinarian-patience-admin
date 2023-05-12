import { useState } from 'react';
import './App.css';
import { Routes, Route, Router } from 'react-router-dom';

// Components or files created for the projects
import ConfirmPassword from "./components/ConfirmPassword"
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';
import FoundError from './components/FoundError';

function App() {

  return (
    <>
    {// HEADER
    }
      <main className='container mx-auto grid grid-cols-2'>
        <Routes>
          <Route path="/confirm-account/:id" element={<ConfirmPassword />}></Route>
          <Route path='/forgot-password' element={<ForgotPassword />}></Route>
          <Route path="/sing-up" element={<SignUp />}></Route>
          <Route path="/" element={<Login />}></Route>
          <Route path="*" element={<FoundError />}></Route>
        </Routes>
      </main>
      {// FOOTER
    }
    </>
  );
}

export default App
