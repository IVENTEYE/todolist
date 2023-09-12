import React from 'react';
import { Route, Routes } from "react-router-dom"
import Home from './pages/Home.tsx';
import Login from './pages/LoginPage.tsx';
import Register from './pages/RegisterPage.tsx';


function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<Register />}/>
    </Routes>
  );
}

export default App;
