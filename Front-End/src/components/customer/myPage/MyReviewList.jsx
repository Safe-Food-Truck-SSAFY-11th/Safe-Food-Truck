import React, { useState } from 'react';
import MyReviewItem from './MyReviewItem';
import DeleteReview from './DeleteReview';
import DeleteComplete from './DeleteComplete';
import styles from './MyReview.module.css';

const MyReviewList = () => {
  const [reviews, setReviews] = useState([
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
  ]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleteCompleteModalOpen, setIsDeleteCompleteModalOpen] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState(null);

  const openDeleteModal = (reviewId) => {
    setSelectedReviewId(reviewId);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    setReviews(reviews.filter(review => review.id !== selectedReviewId));
    setIsDeleteModalOpen(false);
    setIsDeleteCompleteModalOpen(true);
  };

  const closeDeleteCompleteModal = () => {
    setIsDeleteCompleteModalOpen(false);
  };

  return (
    <div className={styles.container}>
      {reviews.length === 0 ? (
        <p className={styles.noReview}>작성한 리뷰가 없습니다😥</p>
      ) : (
        <>
          <h3>용훈👏 님이 작성한 리뷰에요!</h3>
          {reviews.map(review => (
            <MyReviewItem key={review.id} review={review} onDelete={() => openDeleteModal(review.id)} />
          ))}
        </>
      )}
      {isDeleteModalOpen && <DeleteReview onClose={closeDeleteModal} onConfirm={handleDeleteConfirm} />}
      {isDeleteCompleteModalOpen && <DeleteComplete onClose={closeDeleteCompleteModal} />}
    </div>
  );
};

export default MyReviewList;
