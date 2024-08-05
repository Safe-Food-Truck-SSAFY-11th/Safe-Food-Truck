import { useState, useEffect } from 'react';
import ReviewItem from './ReviewItem';
import styles from './ReviewList.module.css';
import useOwnerReviewStore from 'store/users/owner/ownerReviewStore';
import useTruckStore from "store/users/owner/truckStore";

function ReviewList() {
  const { getReviewList } = useOwnerReviewStore();
  const { truckInfo, fetchTruckInfo } = useTruckStore();
  const [reviews, setReviews] = useState([]);
  
  useEffect(() => {
    const fetchTruckAndReviews = async () => {
      await fetchTruckInfo();
    };
    fetchTruckAndReviews();
  }, [fetchTruckInfo]);

  useEffect(() => {
    const fetchReviews = async () => {
      if (truckInfo && truckInfo.storeId) {
        const reviewList = await getReviewList(truckInfo.storeId);
        setReviews(reviewList);
      }
    };

    fetchReviews();
  }, [truckInfo, getReviewList]);

  return (
    <>
      <div className={styles.titleContainer}>
        <h2>내 트럭 리뷰</h2>
      </div>
      <div className={styles.reviewList}>
        {reviews.map(review => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </div>
    </>
  );
}

export default ReviewList;
