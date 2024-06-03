import React, { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './Login.jsx';
import Register from './Register.jsx';
import Start from './Start.jsx';
import Dashboard from './dashboard/Dashboard.jsx';
import Presentation from './presentation/Presentation.jsx';
import { submitRegister, clickNewPresentation } from '../helper.js';

function AppRoutes () {
  // local storage check if user is already signed in
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('currentUser')) {
      navigate('/dashboard');
    }
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Start />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register handleSubmit={submitRegister}/>} />
      <Route path='/dashboard' element={<Dashboard handleClick={clickNewPresentation} />} />
      <Route path='/:presentationId' element={<Presentation />} />
    </Routes>
  )
}

export default AppRoutes;
