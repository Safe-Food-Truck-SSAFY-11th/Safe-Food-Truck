import React, { useState, useEffect } from 'react';
import styles from './ReviewItem.module.css';
import onwerReplyAI from '../../../gemini/gemini.js';
import useTruckStore from "store/users/owner/truckStore";
import useOwnerReviewStore from 'store/users/owner/ownerReviewStore';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function ReviewItem({ review }) {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [reply, setReply] = useState('');
  const [aiReply, setAiReply] = useState(''); // AI 텍스트 상태 추가
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
  const [revImg, setRevImg] = useState([]);
  const { truckInfo, fetchTruckInfo } = useTruckStore();
  const { submitReply } = useOwnerReviewStore();

  useEffect(() => {
    const fetchData = () => {
      fetchTruckInfo();
      setRevImg(review.reviewImageDtos);
    };

    fetchData();
  }, [fetchTruckInfo]);

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
    const replyData = {
      reviewId: review.id,
      content: reply
    };
    submitReply(replyData);
    setReply(''); // 입력 필드 비우기
    setShowReplyInput(false); // 입력 필드 숨기기
  };

  const handleAIBtnClick = async () => {
    setIsLoading(true); // 로딩 상태를 true로 설정
    const aiText = await onwerReplyAI(truckInfo.name, truckInfo.offDay, truckInfo.storeType, truckInfo.description, truckInfo.menuListResponseDto, review.content);
    setAiReply(aiText); // AI 텍스트 상태 업데이트
    setReply(aiText); // AI 텍스트를 input 필드에 설정
    setIsLoading(false); // 로딩 상태를 false로 설정
  };

  const settings = {
    slide: 'div',
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className={reviewItemClass}>
      {review.isVisible === false && (
        <div className={styles.secretLabel}>나한테만 보이는 리뷰입니다</div>
      )}
      <div className={styles.reviewImages}>
      {revImg.length > 0 && revImg[0].savedUrl !== 'empty'? (
        revImg.length === 1 ? (
          <div>
            <img src={revImg[0].savedUrl} alt="review-single" className={styles.reviewImage} />
          </div>
        ) : (
          <Slider {...settings}>
            {revImg.map((img, index) => (
              img.savedUrl !== 'empty' && (
                <div key={index}>
                  <img src={img.savedUrl} alt={`review-${index}`} className={styles.reviewImage} />
                </div>
              )
            ))}
          </Slider>
        )
      ) : null}
      </div>
      <hr className={styles.separator} />
      <div className={styles.reviewContent}>
        <div className={styles.reviewHeader}>
          <h4><span className={styles.customerName}>{review.nickname}</span> 님 {displayStars(review.star)}</h4>
        </div>
        <p>{review.content}</p>
        {review.replyResponseDto && review.replyResponseDto.content && (
          <>
            <hr className={styles.separator} />
            <div className={styles.reply}>
              <h4><span className={styles.ownerName}>{truckInfo.name}</span> 사장님</h4>
              <p>{review.replyResponseDto.content}</p>
            </div>
          </>
        )}
        {showReplyInput && (
          <div className={styles.replyInputContainer}>
            <textarea
              type="text"
              value={reply}
              onChange={handleReplyChange}
              className={styles.replyInput}
              placeholder="내용을 입력하세요"
            />
            <button onClick={handleReplySubmit} className={styles.submitButton}>
              등록
            </button>
            <button className={styles.AIBtn} onClick={handleAIBtnClick} disabled={isLoading}>
              {isLoading ? <span className={styles.spinner}></span> : 'AI 초안 작성'}
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
