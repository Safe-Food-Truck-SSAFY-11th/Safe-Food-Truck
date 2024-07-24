import React from 'react';
import styles from './MyReview.module.css';

const MyReview = () => {
  const reviews = [
    {
      id: 1,
      food: '버거와 감자튀김',
      rating: 5.0,
      comment: '저희 집 앞에 맨날 오셨으면 좋겠어요....',
      date: '2024-07-18 오후 1:13',
    },
    {
      id: 2,
      food: '버거와 감자튀김',
      rating: 5.0,
      comment: '저희 집 앞에 맨날 오셨으면 좋겠어요....',
      date: '2024-07-18 오후 1:13',
    },
    {
      id: 3,
      food: '버거와 감자튀김',
      rating: 5.0,
      comment: '저희 집 앞에 맨날 오셨으면 좋겠어요....',
      date: '2024-07-18 오후 1:13',
    },
  ];

  return (
    <div className={styles.container}>
      <h3>용훈👏 님이 작성한 리뷰에요!</h3>
      {reviews.map(review => (
        <div key={review.id} className={styles.reviewCard}>
          <div className={styles.reviewContent}>
            <img src="/burger.png" alt="버거" className={styles.foodImage} />
            <span><button className={styles.deleteButton}>✖</button></span>
          </div>
          <div className={styles.reviewText}>
            <h4>용훈 님 ★ {review.rating}</h4>
            <hr className={styles.hrLine}/>
            <p>{review.comment}</p>
            <p>{review.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyReview;
