import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Header.module.css";
import SearchAddress from "./SearchAddress";
import Notification from "../customer/mainPage/Notification";
import { FiLogOut } from "react-icons/fi";
import { IoIosArrowBack } from "react-icons/io";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showNotification, setNotification] = useState(false);

  const role = sessionStorage.getItem("role");

  const notifications = [
    { message: "중요 알림: 서비스 점검 예정입니다.", important: true },
    { message: "일반 알림: 새로운 기능이 추가되었습니다.", important: false },
    { message: "중요 알림: 보안 업데이트가 필요합니다.", important: true },
    { message: "일반 알림: 이벤트에 참여해 주세요.", important: false },
  ];

  const handleNotificationClick = () => {
    setNotification(!showNotification);
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  const handleMyPageClick = () => {
    if (role.indexOf("customer") != -1) {
      navigate("/mypageCustomer");
    } else if (role.indexOf("owner") != -1) {
      navigate("/mypageOwner");
    }
  };

  const handleHomeClick = () => {
    if (role.indexOf("customer") != -1) {
      navigate("/mainCustomer");
    } else if (role.indexOf("owner") != -1) {
      navigate("/mainOwner");
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  // 로그인 유저 role에 따른 렌더링 변경
  const renderHeader = () => {
    if (role.indexOf("customer") !== -1) {
      return (
        <header className={styles.headerCustomer}>
          <div className={styles.topSection}>
            <div className={styles.leftSection}>
              {" "}
              <div className={styles.icon} onClick={handleGoBack}>
                <IoIosArrowBack size="25" color="black" />
              </div>
            </div>
            <div className={styles.centerSection}>세이푸트</div>
            <div className={styles.rightSection}>
              <div className={styles.icon} onClick={handleLogout}>
                <FiLogOut size="25" color="black" />
              </div>
            </div>
          </div>
        </header>
      );
    } else {
      // 사장님 헤더
      return (
        <header className={styles.headerOwner}>
          <div className={styles.topSection}>
            <div className={styles.leftSection}>
              <div className={styles.icon} onClick={handleGoBack}>
                <IoIosArrowBack size="25" color="black" />
              </div>
            </div>

            <div className={styles.centerSection}>세이푸트</div>

            <div className={styles.rightSection}>
              <div className={styles.icon} onClick={handleLogout}>
                <FiLogOut size="25" color="black" />
              </div>
            </div>
          </div>
        </header>
      );
    }
  };

  return <>{renderHeader()}</>;
};

export default Header;
