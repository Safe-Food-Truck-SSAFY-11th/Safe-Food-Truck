import React, { useState } from 'react';
import styles from './DeleteReview.module.css';
import accessIcon from 'assets/images/accessButton.png';
import deniedIcon from 'assets/images/deniedButton.png';
import useReviewStore from 'store/reviews/useReviewStore';
import DeleteComplete from './DeleteComplete';
import AWS from 'aws-sdk';


const DeleteReview = ({ onClose, selectedReviewId, selectedOrderId, memberEmail}) => {
  const { deleteReview } = useReviewStore();
  const [isDeleted, setIsDeleted] = useState(false);

  const handleConfirm = async () => {
    try {
      await removeAWSDirectory();
      await deleteReview(selectedReviewId);
      console.log('리뷰 삭제 성공');
      setIsDeleted(true);
      // onReviewDeleted(); // Notify parent to refresh reviews
      window.location.reload();
    } catch (error) {
      console.error('리뷰 삭제 실패:', error);
    }
  };

  const removeAWSDirectory = async () => {
    // AWS S3 설정
    AWS.config.update({
      accessKeyId: `${process.env.REACT_APP_AWS_S3_KEY_ID}`,
      secretAccessKey: `${process.env.REACT_APP_AWS_S3_ACCESS_KEY}`,
      region: `${process.env.REACT_APP_AWS_REGION}`,
    });
  
    const s3 = new AWS.S3();
  
    // 디렉토리와 그 안의 모든 객체를 삭제할 버킷과 접두사
    const bucketName = `${process.env.REACT_APP_AWS_BUCKET_NAME}`;
    const prefix = `members/${memberEmail}/orders/reviews/${selectedOrderId}/`;
  
    try {
      // 1. 디렉토리 안의 모든 객체 목록 가져오기
      const listParams = {
        Bucket: bucketName,
        Prefix: prefix
      };
  
      const listedObjects = await s3.listObjectsV2(listParams).promise();
  
      if (listedObjects.Contents.length === 0) {
        console.log('No objects found for the given prefix.');
        return;
      }
  
      // 2. 모든 객체 삭제
      const deleteParams = {
        Bucket: bucketName,
        Delete: {
          Objects: listedObjects.Contents.map(obj => ({ Key: obj.Key }))
        }
      };
  
      await s3.deleteObjects(deleteParams).promise();
      console.log('Directory and its contents deleted successfully.');
  
      // 디렉토리 자체 삭제: 접두사만 남은 경우
      if (listedObjects.IsTruncated) {
        console.log('There are more objects to delete.');
        // 추가 삭제 작업 필요 (페이징 처리)
      }
    } catch (err) {
      console.error('Error deleting directory:', err);
    }
  };

  return (
    <>
      {isDeleted ? (
        <DeleteComplete onClose={onClose} />
      ) : (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>리뷰를 삭제하시겠어요?</h2>
            <div className={styles.buttonGroup}>
              <button onClick={handleConfirm} className={styles.iconButton}>
                <img src={accessIcon} alt="confirm" className={styles.iconImage} />
              </button>
              <button onClick={onClose} className={styles.iconButton}>
                <img src={deniedIcon} alt="cancel" className={styles.iconImage} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteReview;
