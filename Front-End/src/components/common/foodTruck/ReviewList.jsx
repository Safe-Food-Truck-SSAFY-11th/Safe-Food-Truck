import React from 'react';
import ReviewItem from './ReviewItem';
import styles from './ReviewList.module.css';

const reviews = [
  {
    id: 1,
    author: '조용훈',
    rating: 5.0,
    content: '저희 집 앞에 자주 오셨으면 좋겠어요....',
    date: '2024-07-18 오후 1:13',
    image: 'burger-and-fries.png'
  },
  {
    id: 2,
    author: '조용훈',
    rating: 5.0,
    content: '저희 집 앞에 자주 오셨으면 좋겠어요....',
    date: '2024-07-18 오후 1:13',
    image: 'burger-and-fries.png'
  },
  {
    id: 3,
    author: '조용훈',
    rating: 5.0,
    content: '저희 집 앞에 자주 오셨으면 좋겠어요....',
    date: '2024-07-18 오후 1:13',
    image: 'burger-and-fries.png'
  }
];

function ReviewList() {
  return (
    <div className={styles.reviewList}>
      {reviews.map(review => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </div>
  );
}

export default ReviewList;
