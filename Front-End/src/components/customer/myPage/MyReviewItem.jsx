import React from 'react';
import styles from './MyReview.module.css';

const MyReviewItem = ({ review, onDelete }) => {
  return (
    <div className={styles.reviewCard}>
      <div className={styles.reviewContent}>
        <img src="/burger.png" alt="버거" className={styles.foodImage} />
        <span><button className={styles.deleteButton} reviewId={review.id} onClick={onDelete}>✖</button></span>
      </div>
      <div className={styles.reviewText}>
        <hr className={styles.hrLine}/>
        <h4>{review.nickname} 님 ★ {review.star}</h4>
        <p>{review.content}</p>
      </div>
    </div>
  );
};

export default MyReviewItem;
