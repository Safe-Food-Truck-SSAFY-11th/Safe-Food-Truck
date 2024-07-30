import React from 'react';
import styles from './MyReview.module.css';

const MyReviewItem = ({ review, onDelete }) => {
  return (
    <div className={styles.reviewCard}>
      <div className={styles.reviewContent}>
        <img src="/burger.png" alt="버거" className={styles.foodImage} />
        <span><button className={styles.deleteButton} onClick={onDelete}>✖</button></span>
      </div>
      <div className={styles.reviewText}>
        <h4>용훈 님 ★ {review.rating}</h4>
        <hr className={styles.hrLine}/>
        <p>{review.comment}</p>
        <p>{review.date}</p>
      </div>
    </div>
  );
};

export default MyReviewItem;
