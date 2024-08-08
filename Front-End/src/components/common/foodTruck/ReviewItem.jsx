import React, { useState } from 'react';
import ReportReview from './ReportReview';
import ReportComplete from './ReportComplete';
import styles from './ReviewItem.module.css';
import reportIcon from 'assets/images/reportIcon.png';

function ReviewItem({ review, isReported }) {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);

  const handleReportClick = () => {
    setIsReportModalOpen(true);
  };

  const handleCloseReportModal = () => {
    setIsReportModalOpen(false);
  };

  const handleConfirmReport = () => {
    setIsReportModalOpen(false);
    setIsCompleteModalOpen(true);
  };

  const handleCloseCompleteModal = () => {
    setIsCompleteModalOpen(false);
  };

  return (
    <div className={styles.reviewItem}>
      <img src={review.image} alt="review" className={styles.reviewImage} />
      <hr className={styles.separator} />
      <div className={styles.reviewContent}>
        <div className={styles.reviewHeader}>
          <h4>{review.nickname} 님 ★ {review.star / 2}</h4>
          <span>{review.date}</span>
        </div>
        <p>{review.content}</p>
        {review.replyResponseDto && (
          <div className={styles.replyContent}>
            <strong>사장님 답글 :</strong>
            <p>{review.replyResponseDto.content}</p>
          </div>
        )}
      </div>
      <button
        className={styles.reportButton}
        onClick={handleReportClick}
        disabled={isReported}
      >
        <img src={reportIcon} alt="report" className={styles.reportIcon} />
      </button>
      {isReportModalOpen && <ReportReview onClose={handleCloseReportModal} onConfirm={handleConfirmReport} />}
      {isCompleteModalOpen && <ReportComplete onClose={handleCloseCompleteModal} />}
    </div>
  );
}

export default ReviewItem;
