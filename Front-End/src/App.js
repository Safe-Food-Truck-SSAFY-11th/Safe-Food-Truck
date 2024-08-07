import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Waiting from "./components/common/Waiting";
import LoginUser from "./components/login/LoginUser";
import Regist from "./components/regist/Regist";
import RegistTruck from "./components/regist/RegistTruck";
import MainOwner from "./components/owner/mainPage/MainOwner";
import MainCustomer from "./components/customer/mainPage/MainCustomer";
import PermitAreaCheck from "./components/owner/mainPage/PermitAreaCheck";
import MyPageCustomer from "./components/customer/myPage/MyPageCustomer";
import CustomerUpdate from "./components/customer/myPage/CustomerUpdate";
import CreateReview from "./components/customer/myPage/CreateReveiw";
import FoodTruckDetail from "./components/common/foodTruck/FoodTruckDetail";
import CustomerCart from "./components/customer/myPage/CustomerCart";
import FoodTruckMenuDetail from "./components/common/foodTruck/FoodTruckMenuDetail";
import MyPageOwner from "./components/owner/myPage/MyPageOwner";
import OwnerUpdate from "./components/owner/myPage/OwnerUpdate";
import ManageTruck from "./components/owner/myPage/ManageTruck";
import Chating from "./components/common/Chating";
import OwnerReview from "./components/owner/myPage/OwnerReview";
import ManageMenu from "components/owner/myPage/ManageMenu";
import SocialRedirection from 'components/login/SocialRedirection';
import SocialRegist from 'components/regist/socialRegist/SocialRegist';
import FindId from "components/login/FindId";
import FindPassword from "components/login/FindPassword";
import Survey from "components/survey/Survey";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Waiting />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/regist" element={<Regist />} />
        <Route path="/socialRegist" element={<SocialRegist />} />
        <Route path="/registTruck" element={<RegistTruck />} />
        <Route path="/mainOwner" element={<MainOwner />} />
        <Route path="/mainCustomer" element={<MainCustomer />} />
        <Route path="/permitAreaCheck" element={<PermitAreaCheck />} />
        <Route path="/mypageCustomer" element={<MyPageCustomer />} />
        <Route path="/customerUpdate" element={<CustomerUpdate />} />
        <Route path="/review" element={<CreateReview />} />
        <Route path="/foodTruckDetail/:storeId" element={<FoodTruckDetail />} />
        <Route path="/cart" element={<CustomerCart />} />
        <Route path="/menuDetail/:menuId" element={<FoodTruckMenuDetail />} />
        <Route path="/mypageOwner" element={<MyPageOwner />} />
        <Route path="/ownerUpdate" element={<OwnerUpdate />} />
        <Route path="/manageTruck" element={<ManageTruck />} />
        <Route path="/manageMenu" element={<ManageMenu />} />
        <Route path="/chating" element={<Chating />} />
        <Route path="/ownerReview" element={<OwnerReview />} />
        <Route path="/social-redirection" element={<SocialRedirection />} />
        <Route path="/findId" element={<FindId />} />
        <Route path="/findPassword" element={<FindPassword />} />
        <Route path="/survey" element={<Survey />} />
      </Routes>
    </div>
  );
}

export default App;
