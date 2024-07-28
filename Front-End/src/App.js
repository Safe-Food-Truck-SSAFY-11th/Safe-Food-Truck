import React from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';
import Waiting from './components/common/Waiting';
import LoginUser from './components/login/LoginUser';
import Regist from './components/regist/Regist';
import RegistTruck from './components/regist/RegistTruck';
import MainOwner from './components/owner/mainPage/MainOwner';
import MainCustomer from './components/customer/mainPage/MainCustomer';
import PermitAreaCheck from './components/owner/mainPage/PermitAreaCheck';
import MyPageCustomer from './components/customer/myPage/MyPageCustomer';
import CustomerUpdate from './components/customer/myPage/CustomerUpdate';
import MyPageOwner from './components/owner/myPage/MyPageOwner';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Waiting />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/regist" element={<Regist />} />
        <Route path="/registTruck" element={<RegistTruck />} />
        <Route path="/mainOwner" element={<MainOwner />} />
        <Route path="/mainCustomer" element={<MainCustomer />} />
        <Route path="/permitAreaCheck" element={<PermitAreaCheck />} />
        <Route path="/mypage" element={<MyPageCustomer />} />
        <Route path="/customerUpdate" element={<CustomerUpdate />} />
        <Route path="/mypageOwner" element={<MyPageOwner />} />
      </Routes>
    </div>
  );
}

export default App;
