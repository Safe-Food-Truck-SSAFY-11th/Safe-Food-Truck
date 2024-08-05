import React, { useState, useEffect } from 'react';
import revImg from '../../../assets/images/truck-img.png'; // 임시 리뷰 이미지
import styles from './ReviewItem.module.css';
import onwerReplyAI from '../../../gemini/gemini.js'
import useTruckStore from "store/users/owner/truckStore";

function ReviewItem({ review }) {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [reply, setReply] = useState('');
  const [aiReply, setAiReply] = useState(''); // AI 텍스트 상태 추가
  const { truckInfo, fetchTruckInfo } = useTruckStore();

useEffect(() => {
    const fetchData = () => {
      fetchTruckInfo();
    };

    fetchData();
    console.log(truckInfo);
  }, [fetchTruckInfo]);

  const owName = review.replies;

  function displayStars(rating) {
    let stars = '';
    for (let i = 0; i < 5; i++) {
      if (rating >= 2) {
        stars += '★';
        rating -= 2;
      } else if (rating === 1) {
        stars += '☆';
        rating -= 1;
      } else {
        stars += ' ';
      }
    }
    return stars;
  }

  const reviewItemClass = `${styles.reviewItem} ${review.isVisible === false ? styles.reviewItemSecret : ''}`;

  const handleReplyButtonClick = () => {
    setShowReplyInput(!showReplyInput);
  };

  const handleReplyChange = (e) => {
    setReply(e.target.value);
  };

  const handleReplySubmit = () => {
    // 여기에 입력한 내용 처리하는 로직 추가
    setReply(''); // 입력 필드 비우기
    setShowReplyInput(false); // 입력 필드 숨기기
  };

  const handleAIBtnClick = async () => {
    console.log('AI 초안 작성 버튼 클릭했어여');
    // name, offDay, storeType, description, menuListResponseDto. review.content
    const aiText = await onwerReplyAI(truckInfo.name, truckInfo.offDay, truckInfo.storeType, truckInfo.description, truckInfo.menuListResponseDto, review.content);
    setAiReply(aiText); // AI 텍스트 상태 업데이트
    setReply(aiText); // AI 텍스트를 input 필드에 설정
  }

  return (
    <div className={reviewItemClass}>
      {review.isVisible === false && (
        <div className={styles.secretLabel}>나한테만 보이는 리뷰입니다</div>
      )}
      <img src={revImg} alt="review" className={styles.reviewImage} />
      <hr className={styles.separator} />
      <div className={styles.reviewContent}>
        <div className={styles.reviewHeader}>
          <h4>{review.nickname} 님 {displayStars(review.star)}</h4>
        </div>
        <p>{review.content}</p>
        {review.replies && review.replies.content && (
          <>
            <hr className={styles.separator} />
            <div className={styles.reply}>
              <h4>{owName} 사장님</h4>
              <p>{review.replies.content}</p>
            </div>
          </>
        )}
        {showReplyInput && (
          <div className={styles.replyInputContainer}>
            <input
              type="text"
              value={reply}
              onChange={handleReplyChange}
              className={styles.replyInput}
              placeholder="내용을 입력하세요"
            />
            <button onClick={handleReplySubmit} className={styles.submitButton}>
              등록
            </button>
            <button className={styles.AIBtn} onClick={handleAIBtnClick}>
              AI 초안 작성
            </button>
          </div>
        )}
      </div>
      <button onClick={handleReplyButtonClick} className={styles.replyButton}>
        답글달기
      </button>
    </div>
  );
}

export default ReviewItem;