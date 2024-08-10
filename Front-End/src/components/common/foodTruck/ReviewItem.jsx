import React, { useState } from 'react';
import ReportReview from './ReportReview';
import ReportComplete from './ReportComplete';
import styles from './ReviewItem.module.css';
import reportIcon from 'assets/images/reportIcon.png';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

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

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className={styles.reviewItem}>
      {review.reviewImageDtos && review.reviewImageDtos.length > 0 && review.reviewImageDtos[0].savedUrl !== 'empty' ? (
        <Slider {...sliderSettings} className={styles.reviewImageCarousel}>
          {review.reviewImageDtos.map((image, index) => (
            <div key={index}>
              <img src={image.savedUrl} alt={`리뷰 사진 ${index + 1}`} className={styles.reviewImage} />
            </div>
          ))}
        </Slider>
      ) : null}
      <div className={styles.reviewContent}>
        <div className={styles.reviewHeader}>
          <h4>{review.nickname} 님 ★ {review.star / 2}</h4>
          <span>{review.date}</span>
        </div>
        <p>{review.content}</p>
        <hr className={styles.seperator}/>
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
