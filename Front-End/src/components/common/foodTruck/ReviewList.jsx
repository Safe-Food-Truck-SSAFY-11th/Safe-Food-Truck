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
    return <p className={styles.reviewList}>아직 트럭에 작성된 리뷰가 없어요! 🤣</p>;
  }
  
  return (
    <div className={styles.reviewList}>
      {reviews.map((review) => (
        <ReviewItem
          key={review.id}
          review={review}
          isReported={reportStatuses[review.id]}
        />
      ))}
    </div>
  );
}

export default ReviewList;
