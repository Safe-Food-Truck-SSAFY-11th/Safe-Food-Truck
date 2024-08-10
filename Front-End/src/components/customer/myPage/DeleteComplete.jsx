import React from 'react';
import styles from './DeleteComplete.module.css';
import accessIcon from 'assets/images/accessButton.png';

const DeleteComplete = ({ onClose }) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>삭제가 완료되었습니다</h2>
        <button onClick={handleClose} className={styles.closeButton}>
          <img src={accessIcon} alt="confirm" className={styles.iconImage} />
        </button>
      </div>
    </div>
  );
};

export default DeleteComplete;
