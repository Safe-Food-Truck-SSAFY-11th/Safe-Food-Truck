import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import SearchAddress from './SearchAddress';
import Notification from '../customer/mainPage/Notification';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [showNotification, setNotification] = useState(false);

    const role = sessionStorage.getItem('role');

    const notifications = [
        { message: '중요 알림: 서비스 점검 예정입니다.', important: true },
        { message: '일반 알림: 새로운 기능이 추가되었습니다.', important: false },
        { message: '중요 알림: 보안 업데이트가 필요합니다.', important: true },
        { message: '일반 알림: 이벤트에 참여해 주세요.', important: false },
    ];

    const handleNotificationClick = () => {
        setNotification(!showNotification);
    };

    const handleCartClick = () => {
        navigate('/cart');
    };

    const handleMyPageClick = () => {
        if (role === 'customer') {
            navigate('/mypageCustomer');
        } else if (role === 'owner') {
            navigate('/mypageOwner');
        }
    };

    const handleHomeClick = () => {
        if (role === 'customer') {
            navigate('/mainCustomer');
        } else if (role === 'owner') {
            navigate('/mainOwner');
        }
    };

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/login');
    };

    const isMyPage = location.pathname.startsWith('/mypage');

    // 로그인 유저 role에 따른 렌더링 변경
    const renderHeader = () => {
        if (role === 'customer') {
            return (
                <header className={styles.headerCustomer}>
                    <div className={styles.topSection}>
                        <div className={styles.leftSection}>
                            <span role="img" aria-label="location" className={styles.icon}>📍</span> 대전광역시 유성구 봉명동 655-3
                        </div>
                        <div className={styles.rightSection}>
                            <span role="img" aria-label="cart" className={styles.icon} onClick={handleCartClick}>🛒</span>
                            {isMyPage ? (
                                <span role="img" aria-label="home" className={styles.icon} onClick={handleHomeClick}>🏠</span>
                            ) : (
                                <span role="img" aria-label="myPage" className={styles.icon} onClick={handleMyPageClick}>👤</span>
                            )}
                            <span role="img" aria-label="notification" className={styles.icon} onClick={handleNotificationClick}>🔔</span>
                            <span role="img" aria-label="logout" className={styles.icon} onClick={handleLogout}>🔲</span>
                        </div>
                    </div>
                    <SearchAddress />
                    <Notification show={showNotification} onClose={() => setNotification(false)} notifications={notifications} />
                </header>
            );
        } else { // 사장님 헤더
            return (
                <header className={styles.headerOwner}>
                    <div className={styles.topSection}>
                        <div className={styles.leftSection}>
                            <span role="img" aria-label="location" className={styles.icon}>📍</span> 대전광역시 유성구 봉명동 655-3
                        </div>
                        <div className={styles.rightSection}>
                            {isMyPage ? (
                                <span role="img" aria-label="home" className={styles.icon} onClick={handleHomeClick}>🏠</span>
                            ) : (
                                <span role="img" aria-label="myPage" className={styles.icon} onClick={handleMyPageClick}>👤</span>
                            )}
                            <span role="img" aria-label="logout" className={styles.icon} onClick={handleLogout}>🔲</span>
                        </div>
                    </div>
                    <SearchAddress />
                    <Notification show={showNotification} onClose={() => setNotification(false)} notifications={notifications} />
                </header>
            )
        }
    }

    return (
        <>
            {renderHeader()}
        </>
    );
};

export default Header;
