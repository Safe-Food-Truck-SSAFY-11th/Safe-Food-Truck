import React, { useState, useEffect } from 'react';
import MyReviewItem from './MyReviewItem';
import DeleteReview from './DeleteReview';
import DeleteComplete from './DeleteComplete';
import styles from './MyReviewList.module.css';
import useReviewStore from 'store/reviews/useReviewStore';

const MyReviewList = ({ memberInfo }) => {
  const { myReviews, getAllMyReview, deleteReview } = useReviewStore();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleteCompleteModalOpen, setIsDeleteCompleteModalOpen] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  console.log(myReviews)
  // 삭제 모달 열기
  const openDeleteModal = (reviewId, orderId) => {
    setSelectedReviewId(reviewId);
    setSelectedOrderId(orderId);
    setIsDeleteModalOpen(true);
  };

  // 삭제 모달 닫기
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  // 삭제 확인 처리
  const handleDeleteConfirm = async () => {
    // await deleteReview(selectedReviewId);
    setIsDeleteModalOpen(false);
    setIsDeleteCompleteModalOpen(true);
  };

  // 삭제 완료 모달 닫기
  const closeDeleteCompleteModal = () => {
    setIsDeleteCompleteModalOpen(false);
    getAllMyReview(); // 리뷰 목록 다시 가져오기
  };
  
  // 컴포넌트 마운트 시 리뷰 목록 가져오기
  useEffect(() => {
    getAllMyReview();
  }, []);

  const myReviewList = myReviews.reviewResponseDtos || [];
  
  return (
    <div className={styles.container}>
      {myReviewList.length === 0 ? (
        <div className={styles.noReview}>{memberInfo.nickname} 님이 작성한 리뷰가 없습니다😥</div>
      ) : (
        <>
          <h3 className={styles.myReviewListh3}>{memberInfo.nickname} 👏 님이 작성한 리뷰에요!</h3>
          {myReviewList.map(review => (
            <MyReviewItem key={review.id} review={review} onDelete={() => openDeleteModal(review.id, review.orderId)} />
          ))}
        </>
      )}
      {isDeleteModalOpen && (
        <DeleteReview 
          onClose={closeDeleteModal} 
          selectedReviewId={selectedReviewId} 
          onConfirm={handleDeleteConfirm}
          selectedOrderId={selectedOrderId} 
          memberEmail={memberInfo.email}
        />
      )}
      {isDeleteCompleteModalOpen && (
        <DeleteComplete onClose={closeDeleteCompleteModal} />
      )}
    </div>
  );
};

export default MyReviewList;
