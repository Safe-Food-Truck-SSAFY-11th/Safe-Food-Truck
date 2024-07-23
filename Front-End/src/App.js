import React from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';
import Waiting from './components/common/Waiting';
import LoginUser from './components/login/LoginUser';
import Regist from './components/regist/Regist';
import RegistTruck from './components/regist/RegistTruck';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Waiting />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/regist" element={<Regist />} />
        <Route path="/registTruck" element={<RegistTruck />} />
      </Routes>
    </div>
  );
}

export default App;
