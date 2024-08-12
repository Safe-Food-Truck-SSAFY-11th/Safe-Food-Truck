import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

const Footer = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [role, setRole] = useState(sessionStorage.getItem("role"));

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  if (role.indexOf("customer") !== -1) {
    return (
      <footer className={styles.footer}>
        <Link to="/mainCustomer" className={styles.menuItem}>
          <i className={`${styles.icon} ${styles.homeIcon}`}></i>
          <span>홈</span>
        </Link>
        <Link to="/mypageCustomer" className={styles.menuItem}>
          <i className={`${styles.icon} ${styles.userIcon}`}></i>
          <span>마이페이지</span>
        </Link>
        <Link to="/cart" className={styles.menuItem}>
          <i className={`${styles.icon} ${styles.cartIcon}`}></i>
          <span>장바구니</span>
        </Link>
        <Link
          to={{ pathname: "/mypageCustomer", state: { fromFooter: true } }}
          className={styles.menuItem}
        >
          <i className={`${styles.icon} ${styles.heartIcon}`}></i>
          <span>찜목록</span>
        </Link>
      </footer>
    );
  } else if (role.indexOf("owner") !== -1) {
    return (
      <footer className={styles.footer}>
        <Link to="/mainOwner" className={styles.menuItem}>
          <i className={`${styles.icon} ${styles.homeIcon}`}></i>
          <span>홈</span>
        </Link>
        <Link to="/mypageOwner" className={styles.menuItem}>
          <i className={`${styles.icon} ${styles.userIcon}`}></i>
          <span>마이페이지</span>
        </Link>
        <Link to="/ownerReview" className={styles.menuItem}>
          <i className={`${styles.icon} ${styles.reviewIcon}`}></i>
          <span>리뷰관리</span>
        </Link>
        <div className={styles.menuItem} onClick={toggleDropdown}>
          <i className={`${styles.icon} ${styles.settingsIcon}`}></i>
          <span>트럭관리</span>
          {isDropdownOpen && (
            <div className={styles.dropdown}>
              <Link to="/manageTruck">점포정보 수정</Link>
              <Link to="/manageSchedule">스케줄 관리</Link>
              <Link to="/manageMenu">메뉴관리</Link>
            </div>
          )}
        </div>
      </footer>
    );
  }
  return null;
};

export default Footer;
