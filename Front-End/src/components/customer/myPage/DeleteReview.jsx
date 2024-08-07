import React from 'react';
import styles from './DeleteReview.module.css';
import accessIcon from 'assets/images/accessButton.png';
import deniedIcon from 'assets/images/deniedButton.png';
import  useReviewStore  from 'store/reviews/useReviewStore';

const DeleteReview = ({ onClose , selectedReviewId}) => {

  console.log(selectedReviewId)

  const { deleteReview } = useReviewStore();
  
  const handleConfirm = async () => {
    try {
      await deleteReview(selectedReviewId);
      console.log('리뷰 삭제 성공')
    } catch (error) {
      console.error('리뷰 삭제 실패:', error);

    }
  };


  return (
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
  );
};

export default DeleteReview;
