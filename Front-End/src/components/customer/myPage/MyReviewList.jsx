import React, { useState } from 'react';
import MyReviewItem from './MyReviewItem';
import DeleteReview from './DeleteReview';
import DeleteComplete from './DeleteComplete';
import styles from './MyReview.module.css';
import useReviewStore from 'store/reviews/useReviewStore';

const MyReviewList = ({ memberInfo, myReviews }) => {

  const { deleteReview } = useReviewStore();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [isDeleteCompleteModalOpen, setIsDeleteCompleteModalOpen] = useState(false);

  const [selectedReviewId, setSelectedReviewId] = useState(null);

  const myReviewList = myReviews.reviewList || [];

  console.log(myReviewList);

  const openDeleteModal = (reviewId) => {
    setSelectedReviewId(reviewId);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    deleteReview(selectedReviewId);
    setIsDeleteModalOpen(false);
    setIsDeleteCompleteModalOpen(true);
  };

  const closeDeleteCompleteModal = () => {
    setIsDeleteCompleteModalOpen(false);
  };

  return (
    <div className={styles.container}>
      {myReviewList.length === 0 ? (
        <p className={styles.noReview}> {memberInfo.nickname} 님이 작성한 리뷰가 없습니다😥</p>
      ) : (
        <>
          <h3>{memberInfo.nickname} 👏 님이 작성한 리뷰에요!</h3>
          {myReviewList.map(review => (
            <MyReviewItem key={review.id} review={review} onDelete={() => openDeleteModal(review.id)} />
          ))}
        </>
      )}
      {isDeleteModalOpen && <DeleteReview onClose={closeDeleteModal} selectedReviewId={selectedReviewId} onConfirm={handleDeleteConfirm} />}
      {isDeleteCompleteModalOpen && <DeleteComplete onClose={closeDeleteCompleteModal} />}
    </div>
  );
};

export default MyReviewList;
