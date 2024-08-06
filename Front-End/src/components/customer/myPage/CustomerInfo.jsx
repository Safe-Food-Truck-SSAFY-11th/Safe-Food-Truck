import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CustomerInfo.module.css';
import profile_img from "assets/images/profile_image.png"

const CustomerInfo = ({ onSelect, activeButton, memberInfo }) => {
  const navigate = useNavigate();

  const handleProfileEdit = () => {
    navigate('/customerUpdate', { state: { memberInfo } });
  };

  const imageUrl = memberInfo?.memberImage?.savedUrl === 'empty' ? profile_img : memberInfo?.memberImage?.savedUrl;

  if (!memberInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.profileSection}>
        <img src={imageUrl} alt="Profile" className={styles.profileImage} /> 
        <button className={styles.profileButton} onClick={handleProfileEdit}>
          내 정보 수정
        </button>
      </div>
      <div className={styles.infoSection}>
        <h2>반갑습니다 {memberInfo.name}님! 👏</h2>
        <p>오늘 푸드트럭 어때요?</p>
        {/* 여기 푸드트럭 몇 번 이용했는지 가져오는것도 필요함 ㅠㅠㅜㅠㅜ */}
        <p>지금까지 푸드트럭 {0}번 만났어요!</p>
        <div className={styles.buttons}>
          <button
            className={`${styles.actionButton} ${activeButton === 'liked' ? styles.active : ''}`}
            onClick={() => onSelect('liked', 'liked')}
          >
            찜한 푸드트럭
          </button>
          <button
            className={`${styles.actionButton} ${activeButton === 'review' ? styles.active : ''}`}
            onClick={() => onSelect('review', 'review')}
          >
            작성한 리뷰
          </button>
          <button
            className={`${styles.actionButton} ${activeButton === 'order' ? styles.active : ''}`}
            onClick={() => onSelect('order', 'order')}
          >
            구매 내역
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerInfo;
