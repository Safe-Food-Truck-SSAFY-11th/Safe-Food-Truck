import React, { useState, useEffect } from "react";
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
import SocialRedirection from "components/login/SocialRedirection";
import SocialRegist from "components/regist/socialRegist/SocialRegist";
import FindId from "components/login/FindId";
import FindPassword from "components/login/FindPassword";
import Survey from "components/survey/Survey";
import Membership from "components/common/Membership";
import Live from "components/live/Live";
import ManageSchedule from "components/owner/myPage/ManageSchedule";
import useUserStore from 'store/users/userStore';

function App() {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const {getLoginedEmail} = useUserStore();

  useEffect(() => {
    const loginedEmail = getLoginedEmail();

    // SSE 연결 설정 함수
    const setupSSEConnection = (userEmail) => {
      if (!userEmail) return;

      const eventSource = new EventSource(`https://i11b102.p.ssafy.io/api/global-notification/subscribe/${userEmail}`);

      eventSource.onopen = () => {
        console.log("SSE connection opened");
      };

      eventSource.addEventListener('connected', (event) => {
        console.log(event.data)
      });

      eventSource.addEventListener("customer", (event) => {
        console.log(event);
        const data = JSON.parse(event.data);
        console.log(data);

        setNotificationMessage(data.message);
        setShowNotification(true);

        // 2초 후에 알림 메시지를 숨김
        setTimeout(() => {
          setShowNotification(false);
        }, 3000);
      });

      eventSource.addEventListener("owner", (event) => {
        console.log(event);
        const data = JSON.parse(event.data);
        console.log(data);

        setNotificationMessage(data.message);
        setShowNotification(true);

        // 2초 후에 알림 메시지를 숨김
        setTimeout(() => {
          setShowNotification(false);
        }, 3000);
      });

      //공지사항 변경 알림
      eventSource.addEventListener("notice", (event) => {
        console.log(event);
        const data = JSON.parse(event.data);
        console.log(data);

        setNotificationMessage(data.message);
        setShowNotification(true);

        // 2초 후에 알림 메시지를 숨김
        setTimeout(() => {
          setShowNotification(false);
        }, 3000);
      });

      //방송시작 알림
      eventSource.addEventListener("live", (event) => {
        console.log(event);
        const data = JSON.parse(event.data);
        console.log(data);

        setNotificationMessage(data.message);
        setShowNotification(true);

        // 2초 후에 알림 메시지를 숨김
        setTimeout(() => {
          setShowNotification(false);
        }, 3000);
      });

      eventSource.onerror = (error) => {
        console.error("SSE error:", error);
        eventSource.close(); // 오류가 발생하면 연결을 닫습니다.
      };

      return () => {
        eventSource.close();
        console.log("SSE connection closed");
      };
    };

    // 최초 로드 시 이메일이 있으면 SSE 연결 설정
    const cleanup = setupSSEConnection(loginedEmail);

    return () => {
      if (cleanup) cleanup(); // 컴포넌트가 언마운트될 때 SSE 연결 닫기
    };
  }, [getLoginedEmail()]);

  return (
    <div className="App">
      {showNotification && (
        <div className="notification">{notificationMessage}</div>
      )}
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
        <Route path="/createReview/:orderId" element={<CreateReview />} />
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
        <Route path="/membership" element={<Membership />} />
        <Route path="/live/:storeId" element={<Live />} />
        <Route path="/manageSchedule" element={<ManageSchedule />} />
      </Routes>
    </div>
  );
}

export default App;
