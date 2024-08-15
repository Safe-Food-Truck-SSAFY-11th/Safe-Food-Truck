import React, { useState, useEffect } from 'react';
import ReviewItem from './ReviewItem';
import styles from './ReviewList.module.css';
import useReviewStore from 'store/reviews/useReviewStore';

function ReviewList({ reviews }) {
  const [reportStatuses, setReportStatuses] = useState({});
  const { isReportedReview } = useReviewStore();
  
  const checkReports = async () => {
    const statuses = {};

    for (const review of reviews) {
      const isReported = await isReportedReview(review.id);
      statuses[review.id] = isReported;
    }
    setReportStatuses(statuses);
  };

  useEffect(() => {
    checkReports();
  }, [reviews]);

  if (reviews.length === 0) {
    return(
   <div className={styles.container}>
     <p className={styles.noReviewList}>아직 트럭에 작성된 리뷰가 없어요! 🤣</p>
   </div>
    )  
  }
  
  return (
   <div className={styles.container}>
    <div className={styles.reviewList}>
      <h3 className={styles.reviewCount}>최근 리뷰 {reviews.length} 개</h3>
      {reviews.map((review) => (
        <ReviewItem
          key={review.id}
          review={review}
          isReported={reportStatuses[review.id]}
        />
      ))}
    </div>
  </div>
  );
}

export default ReviewList;
