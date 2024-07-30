import React from 'react';
import styles from './Notification.module.css';

const Notification = ({ show, onClose, notifications }) => {
    if (!show) {
        return null;
    }

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h2>알림</h2>
                    <button className={styles.closeButton} onClick={onClose}>&times;</button>
                </div>
                <div className={styles.modalBody}>
                    {notifications.map((notification, index) => (
                        <div 
                            key={index} 
                            className={`${styles.notification} ${notification.important ? styles.important : styles.general}`}
                        >
                            {notification.message}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Notification;
