import React from 'react';
import styles from './CartAlertModal.module.css';

function CartAlertModal({ isOpen, onClose, message }) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <p>{message}</p>
        <button onClick={onClose} className={styles.closeButton}>확인</button>
      </div>
    </div>
  );
}

export default CartAlertModal;
