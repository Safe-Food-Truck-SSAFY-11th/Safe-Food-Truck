import React from 'react';
import ReviewItem from './ReviewItem';
import styles from './ReviewList.module.css';

const reviews = [
  {
    id: 1,
    author: '조용훈',
    store_id: 10,
    is_visible: 0, // 전체공개
    star: 7, // 1: 0.5개 ~ 10: 5개
    content: '자주 와주세요',
    image: '',
    replies: {
    }
  },
  {
    id: 2,
    author: '장준석',
    store_id: 10,
    is_visible: 0,
    star: 8,
    content: '맛있어요',
    image: '',
    replies: {
      id: 1, 
      content: '감사합니다~',
    }
  },
  {
    id: 3,
    author: '김준혁',
    store_id: 10,
    is_visible: 1, // 사장님만 공개
    star: 9,
    content: '트럭 저한테 파실 생각 없으신가요',
    image: '',
    replies: {
      id: 2, 
      content: '싫어요~~',
    }
  },
];

function ReviewList() {
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
