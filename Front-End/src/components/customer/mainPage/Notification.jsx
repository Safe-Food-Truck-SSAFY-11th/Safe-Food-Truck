import React, { useEffect } from 'react';
import styles from './Notification.module.css';
import customerStore from 'store/users/customer/customerStore'

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
              className={`${styles.notification} ${notification.important ? styles.important : styles.general}`}
            >
              {notification.info}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notification;
