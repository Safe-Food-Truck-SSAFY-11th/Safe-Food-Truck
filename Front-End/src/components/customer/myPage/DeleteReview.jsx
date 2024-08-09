import React, { useState } from 'react';
import styles from './DeleteReview.module.css';
import accessIcon from 'assets/images/accessButton.png';
import deniedIcon from 'assets/images/deniedButton.png';
import useReviewStore from 'store/reviews/useReviewStore';
import DeleteComplete from './DeleteComplete';

const DeleteReview = ({ onClose, selectedReviewId, onReviewDeleted }) => {
  const { deleteReview } = useReviewStore();
  const [isDeleted, setIsDeleted] = useState(false);

  const handleConfirm = async () => {
    try {
      await deleteReview(selectedReviewId);
      console.log('리뷰 삭제 성공');
      setIsDeleted(true);
      onReviewDeleted(); // Notify parent to refresh reviews
    } catch (error) {
      console.error('리뷰 삭제 실패:', error);
    }
  };

  return (
    <>
      {isDeleted ? (
        <DeleteComplete onClose={onClose} />
      ) : (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>리뷰를 삭제하시겠어요?</h2>
            <div className={styles.buttonGroup}>
              <button onClick={handleConfirm} className={styles.iconButton}>
                <img src={accessIcon} alt="confirm" className={styles.iconImage} />
              </button>
              <button onClick={onClose} className={styles.iconButton}>
                <img src={deniedIcon} alt="cancel" className={styles.iconImage} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteReview;
