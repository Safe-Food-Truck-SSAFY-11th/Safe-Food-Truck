import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
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
import useUserStore from "store/users/userStore";
import PrivateRoute from "components/common/PrivateRoute";
import CustomerRoute from "components/common/CustomerRoute";
import OwnerRoute from "components/common/OwnerRoute";
import Footer from "components/common/Footer";

import useEventStore from "store/eventStore";

function App() {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const { getLoginedEmail } = useUserStore();
  const { setOwnerOrderNotice, setOwnerOrderNoticeMessage } = useEventStore();
  const [userType, setUserType] = useState(sessionStorage.getItem("role"));

  useEffect(() => {
    const loginedEmail = getLoginedEmail();

    // SSE 연결 설정 함수
    const setupSSEConnection = (userEmail) => {
      if (!userEmail) return;

      const eventSource = new EventSource(
        `https://i11b102.p.ssafy.io/api/global-notification/subscribe/${userEmail}`
      );

      eventSource.onopen = () => {
        console.log("SSE connection opened");
      };

      eventSource.addEventListener("connected", (event) => {
        console.log(event.data);
      });

      // (손님) 주문 수락, 주문 거절, 조리 완료
      eventSource.addEventListener("customerOrder", (event) => {
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

      // (손님) 찜한 가게 오픈
      eventSource.addEventListener("open", (event) => {
        // try catch문을 안넣으면 에러 발생 ㅜㅜ
        try {
          console.log(event);
          const data = JSON.parse(event.data);
          console.log(data);

          setNotificationMessage(data.message);
          setShowNotification(true);

          // 2초 후에 알림 메시지를 숨김
          setTimeout(() => {
            setShowNotification(false);
          }, 3000);
        } catch (error) {
          console.error("Error parsing data:", error);
        }
      });

      // 사장님 주문 생성
      eventSource.addEventListener("createOrder", (event) => {
        console.log(event);
        const data = JSON.parse(event.data);
        console.log(data);

        setNotificationMessage(data.message);
        setShowNotification(true);
        setOwnerOrderNoticeMessage(data.message);
        setOwnerOrderNotice(true);

        // 2초 후에 알림 메시지를 숨김
        setTimeout(() => {
          setShowNotification(false);
          setOwnerOrderNotice(false);
        }, 3000);
      });

      //사장님 리뷰 생성
      eventSource.addEventListener("createReview", (event) => {
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
      <ContentWrapper>
        <Routes>
          <Route path="/" element={<Waiting />} />
          <Route path="/login" element={<LoginUser />} />
          <Route path="/regist" element={<Regist />} />
          <Route path="/socialRegist" element={<SocialRegist />} />
          <Route path="/social-redirection" element={<SocialRedirection />} />
          <Route path="/findId" element={<FindId />} />
          <Route path="/findPassword" element={<FindPassword />} />

          {/* 아래 부터는 회원 또는 손님, 사장님으로 접근 제한 */}
          <Route
            path="/survey"
            element={
              <CustomerRoute>
                <Survey />
              </CustomerRoute>
            }
          />
          <Route
            path="/membership"
            element={
              <PrivateRoute>
                <Membership />
              </PrivateRoute>
            }
          />
          <Route
            path="/registTruck"
            element={
              <OwnerRoute>
                <RegistTruck />
              </OwnerRoute>
            }
          />
          <Route
            path="/mainOwner"
            element={
              <OwnerRoute>
                <MainOwner />
              </OwnerRoute>
            }
          />
          <Route
            path="/mainCustomer"
            element={
              <CustomerRoute>
                <MainCustomer />
              </CustomerRoute>
            }
          />
          <Route
            path="/permitAreaCheck"
            element={
              <OwnerRoute>
                <PermitAreaCheck />
              </OwnerRoute>
            }
          />
          <Route
            path="/mypageCustomer"
            element={
              <CustomerRoute>
                <MyPageCustomer />
              </CustomerRoute>
            }
          />
          <Route
            path="/customerUpdate"
            element={
              <CustomerRoute>
                <CustomerUpdate />
              </CustomerRoute>
            }
          />
          <Route
            path="/createReview/:orderId"
            element={
              <CustomerRoute>
                <CreateReview />
              </CustomerRoute>
            }
          />
          <Route
            path="/foodTruckDetail/:storeId"
            element={
              <CustomerRoute>
                <FoodTruckDetail />
              </CustomerRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <CustomerRoute>
                <CustomerCart />
              </CustomerRoute>
            }
          />
          <Route
            path="/menuDetail/:menuId"
            element={
              <PrivateRoute>
                <FoodTruckMenuDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/mypageOwner"
            element={
              <OwnerRoute>
                <MyPageOwner />
              </OwnerRoute>
            }
          />
          <Route
            path="/ownerUpdate"
            element={
              <OwnerRoute>
                <OwnerUpdate />
              </OwnerRoute>
            }
          />
          <Route
            path="/manageTruck"
            element={
              <OwnerRoute>
                <ManageTruck />
              </OwnerRoute>
            }
          />
          <Route
            path="/manageMenu"
            element={
              <OwnerRoute>
                <ManageMenu />
              </OwnerRoute>
            }
          />
          <Route
            path="/chating"
            element={
              <PrivateRoute>
                <Chating />
              </PrivateRoute>
            }
          />
          <Route
            path="/ownerReview"
            element={
              <OwnerRoute>
                <OwnerReview />
              </OwnerRoute>
            }
          />
          <Route
            path="/live/:storeId"
            element={
              <PrivateRoute>
                <Live />
              </PrivateRoute>
            }
          />
          <Route
            path="/manageSchedule"
            element={
              <OwnerRoute>
                <ManageSchedule />
              </OwnerRoute>
            }
          />
        </Routes>
      </ContentWrapper>

      <FooterWrapper userType={userType} />
    </div>
  );
}

function FooterWrapper(userType) {
  const location = useLocation();
  const hideFooterPaths = [
    "/",
    "/login",
    "/regist",
    "/socialRegist",
    "/social-redirection",
    "/findId",
    "/findPassword",
  ]; // 푸터를 숨기고 싶은 경로

  if (hideFooterPaths.includes(location.pathname)) {
    return null; // 푸터를 렌더링하지 않음
  }

  return <Footer role={userType} />;
}

function ContentWrapper({ children }) {
  const location = useLocation();
  const hideFooterPaths = [
    "/",
    "/login",
    "/regist",
    "/socialRegist",
    "/social-redirection",
    "/findId",
    "/findPassword",
  ]; // 푸터를 숨기고 싶은 경로
  const footerHeight = hideFooterPaths.includes(location.pathname) ? 0 : "69px"; // 푸터 높이 설정

  return <div style={{ paddingBottom: footerHeight }}>{children}</div>;
}

export default App;
