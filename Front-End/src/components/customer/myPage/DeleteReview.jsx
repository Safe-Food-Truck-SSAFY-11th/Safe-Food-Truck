import React from 'react';
import styles from './DeleteReview.module.css';
import accessIcon from '../../../assets/images/accessButton.png';
import deniedIcon from '../../../assets/images/deniedButton.png';

const DeleteReview = ({ onClose, onConfirm }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>리뷰를 삭제하시겠어요?</h2>
        <div className={styles.buttonGroup}>
          <button onClick={onConfirm} className={styles.iconButton}>
            <img src={accessIcon} alt="confirm" className={styles.iconImage} />
          </button>
          <button onClick={onClose} className={styles.iconButton}>
            <img src={deniedIcon} alt="cancel" className={styles.iconImage} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteReview;
