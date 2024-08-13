import React, { useEffect } from 'react';
import styles from './Notification.module.css';
import customerStore from 'store/users/customer/customerStore';

const Notification = ({ show, onClose }) => {

  const { getNotification, myNotification } = customerStore();
  
  useEffect(() => {
    getNotification();
  }, [getNotification]);

  if (!show) {
    return null;
  }

  // 알림을 역순으로 정렬하고 10개만 선택
  const notificationsToShow = [...myNotification].sort((a, b) => b.id - a.id).slice(0, 10);

  // 타임스탬프를 월, 일, 시, 분 형태로 변환하는 함수
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const month = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더함
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0'); // 두 자리로 표시
    return `${month}월 ${day}일 ${hours}시 ${minutes}분`;
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>알림</h2>
          <button className={styles.closeButton} onClick={onClose}>&times;</button>
        </div>
        <div className={styles.modalBody}>
          {notificationsToShow.map((notification, index) => (
            <div 
              key={index} 
              className={`${styles.notification}`}
            >
              <p className={styles.notificationInfo}>내용 : {notification.info}</p>
              <br/>
              <span className={styles.notificationTimeStamp}>
                시간 : {formatTimestamp(notification.timestamp)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notification;
